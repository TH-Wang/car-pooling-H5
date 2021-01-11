<template>
  <div class="container" :style="{overflow: `${focus ? 'hidden' : 'auto'}`}">
    <!-- 搜索框 / 导航栏 -->
    <nav-bar-search
      mode="dark"
      ref="search"
      v-model="searchValue"
      @change="handleSearch"
      @focus="handleFocus"
    />
    <!-- 占位符 -->
    <div style="height: 50px"></div>

    <!-- 当前定位城市 -->
    <div class="current-city" @click="handleRetry" v-html="locationText"/>

    <!-- 通过名称搜索城市列表 -->
    <div class="search-list" v-show="showSearchList">
      <van-empty v-show="searchEmpty" image="search" description="抱歉，未找到相关城市" />
      <div
        v-for="item in searchList"
        :key="item.code"
        class="index-cell"
        v-html="item.replaceName"
        @click="selectCityBySearch($event, item)"
      />
    </div>

    <!-- 选择省市区县 -->
    <div class="select">
      <div
        :class="{
          'select-button-active': activeClass.prov,
          'select-button-bold': selectedClass.prov}"
        @click="handleReset('prov')">
        {{selectText.prov}}
      </div>
      <van-icon class="arrow" name="arrow" color="#E8E8E8" size=".12rem" />
      <div
        :class="{
          'select-button-active': activeClass.city,
          'select-button-bold': selectedClass.city}"
        @click="handleReset('city')">
        {{selectText.city}}
      </div>
      <van-icon class="arrow" name="arrow" color="#E8E8E8" size=".12rem" />
      <div
        :class="{
          'select-button-active': activeClass.county,
          'select-button-bold': selectedClass.county}"
        @click="handleReset('county')">
        {{selectText.county}}
      </div>
    </div>

    <!-- 热门城市 -->
    <div v-show="!showCountyList" class="hot-cities">
      <div class="hot-cities-title">热门城市</div>
      <div class="hot-cities-grid">
        <div
          v-for="city in hotCities"
          :key="city.code"
          :class="`grid-item${city.code === activeHotCity ? '-active' : ''}`"
          @click="handleSelectHotCity($event, city)"
        >{{city.shortName}}</div>
      </div>
    </div>

    <!-- 省索引列表 -->
    <van-index-bar
      :sticky-offset-top="50"
      v-show="!showCountyList"
      class="index"
      :index-list="position.list.word"
    >
      <div v-for="item in position.list.prov" :key="item.word">
        <van-index-anchor class="index-anchor" :index="item.word" />
        <div
          v-for="prov in item.list"
          :key="prov.code"
          class="index-cell"
          @click="handleSelect('prov', prov)"
        >{{prov.shortName}}</div>
      </div>
    </van-index-bar>

    <!-- 城市、区县列表 -->
    <div
      v-show="showCountyList"
      v-for="item in position.list[position.current]"
      :key="item.code"
      class="index-cell"
      @click="handleSelect(position.current, item)"
    >{{item.name}}</div>
  </div>
</template>

<script>
import AMapLoader from '@/utils/mapLoader'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { Icon, IndexBar, IndexAnchor } from 'vant'
import { spell } from 'cnchar'
import { isEmpty, isEqual, debounce } from 'lodash'
import {
  queryProvinceList,
  // queryPositionForCity,
  queryPositionForCounty,
  savePosition,
  queryPositionByCityName,
  queryPositionByCountyName
} from '@/api'
import {
  getLngLatByMap,
  getPosition,
  transform
} from '@/utils/districtSearch'
import EventBus from '@/utils/eventBus'
import NavBarSearch from '@/components/NavBarSearch'

export default {
  name: 'SelectCity',
  components: {
    'van-icon': Icon,
    'van-index-bar': IndexBar,
    'van-index-anchor': IndexAnchor,
    'nav-bar-search': NavBarSearch
  },
  data: () => ({
    // 搜索框是否获取焦点
    focus: false,
    // 是否显示搜索列表面板
    showSearchList: false,
    // 是否显示搜索空状态
    searchEmpty: false,
    // 搜索框输入值
    searchValue: '',
    // 当前被选择的热门城市code
    activeHotCity: null,
    // 热门城市列表
    hotCities: [
      { code: 2, name: '北京市', shortName: '北京' },
      { code: 2324, name: '重庆市', shortName: '重庆' },
      { code: 802, name: '上海市', shortName: '上海' },
      { code: 1988, name: '深圳市', shortName: '深圳' },
      { code: 2368, name: '成都市', shortName: '成都' },
      { code: 1965, name: '广州市', shortName: '广州' },
      { code: 656, name: '哈尔滨市', shortName: '哈尔滨' },
      { code: 934, name: '杭州市', shortName: '杭州' },
      { code: 2899, name: '西安市', shortName: '西安' }
    ],
    // 搜索结果列表
    searchList: [],
    // 定位状态，doing：定位中，success：定位成功，fail：定位失败
    status: 'doing'
  }),
  computed: {
    // 全局存储城市区县数据
    ...mapState(['position', 'user']),
    ...mapGetters(['location', 'unGeoLocation']),
    // 顶部显示当前位置的信息
    locationText () {
      const textType = {
        doing: '正在定位中...',
        success: `当前定位城市·区域 <strong style="color:#262626">${this.location}</strong>`,
        fail: '<span style="color:#FFCD00">定位失败，请点击重试</span>'
      }
      return textType[this.status]
    },
    // 选择城市指示标题的样式
    // selectCityStyle () {
    //   return this.position.current === 'city' ? 'select-button-active' : 'select-button-bold'
    // },
    // // 选择区县指示标题的样式
    // selectCountyStyle () {
    //   return this.position.current === 'county' ? 'select-button-active' : 'select-button'
    // },
    // 显示区县列表
    showCountyList () {
      return this.position.current !== 'prov'
    },
    activeClass () {
      const { current } = this.position
      return {
        prov: current === 'prov',
        city: current === 'city',
        county: current === 'county'
      }
    },
    selectedClass () {
      const { selected, defaultData } = this.position
      return {
        prov: !isEqual(selected.prov, defaultData),
        city: !isEqual(selected.city, defaultData),
        county: !isEqual(selected.county, defaultData)
      }
    },
    selectText () {
      const { selected, defaultData } = this.position
      const { prov, city, county } = selected
      return {
        prov: !isEqual(prov, defaultData) ? prov.shortName : '请选择省',
        city: !isEqual(city, defaultData) ? city.shortName : '请选择市',
        county: !isEqual(county, defaultData) ? county.shortName : '区县'
      }
    }
  },
  methods: {
    // 改变全局定位城市数据的commit
    ...mapMutations([
      'setCurPosition', 'setPositionList', 'setPositionSelect', 'resetPositionSelect'
    ]),
    ...mapActions(['resetCounty']),
    // 定位当前位置
    async getCurrentPosition () {
      try {
        const AMap = await AMapLoader()

        // 使用高德定位
        const lnglatInfoMap = await getLngLatByMap(AMap)
        const { lng, lat } = lnglatInfoMap
        const lnglat = [lng, lat]

        const res = await transform(AMap, lnglat)
        console.log('[定位调用结果]')
        console.log(res)

        // 定位成功
        if (res.info === 'ok') {
          // 通过经纬度获取位置信息
          const position = await getPosition(AMap, lnglat)
          console.log('[坐标转换]')
          console.log(position)
          this.handleCacheCityCounty(position)
        } else {
          // 定位失败
          this.status = 'fail'
        }
      } catch (error) {
        console.log(error)
        this.status = 'fail'
      }
    },
    // 点击重新定位
    handleRetry () {
      if (this.status === 'fail') {
        this.status = 'doing'
        this.getCurrentPosition()
      }
    },
    // 存储定位成功的城市地区
    async handleCacheCityCounty (position) {
      // 获取省市区信息
      const { province, city, district } = position.addressComponent
      // 通过城市名称请求城市code
      const res1 = await queryPositionByCityName(city || province)
      // **如果未查询到城市信息
      if (res1.data.data.length === 0) {
        this.status = 'fail'
        this.$toast({ message: '未找到当前位置信息，请手动选择', duration: 1000 })
        return
      }
      // 获取城市信息
      const cityInfo = res1.data.data[0]
      // 通过城市code和区县名称获取区县信息
      const res2 = await queryPositionByCountyName(cityInfo.code, district)
      // **如果未查询到该城市的区县信息
      if (res2.data.data.length === 0) {
        this.status = 'fail'
        this.$toast({ message: '未找到当前位置信息，请手动选择', duration: 2500 })
        return
      }
      // 获取区县列表
      const countyInfo = res2.data.data[0]
      // 设置城市和区域信息
      this.setPositionSelect({ type: 'city', value: cityInfo })
      this.setPositionSelect({ type: 'county', value: countyInfo })
      // 修改定位状态为成功
      this.status = 'success'
      // 将定位发送给后端存储
      await savePosition(countyInfo.code)
      this.$toast.success('定位成功')
    },
    // 监听搜索事件
    handleSearch: debounce(async function (value) {
      this.toggleSearchList()
      if (isEmpty(value)) {
        this.searchList = []
        return
      }
      const res = await queryPositionByCityName(value)
      const color = '#FFCD00'
      const reg = new RegExp(value, 'g')
      const list = res.data.data
      this.searchEmpty = list.length === 0
      this.searchList = list.map(item => {
        item.replaceName = item.shortName.replace(
          reg,
          `<span style="color:${color}">${value}</span>`
        )
        return item
      })
    }, 300),
    // 监听搜索框获取焦点事件
    handleFocus (value) {
      this.focus = value
      this.toggleSearchList()
    },
    // 判断是否显示搜索列表面板
    toggleSearchList () {
      if (this.focus && !isEmpty(this.searchValue)) {
        this.showSearchList = true
      } else {
        setTimeout(() => {
          this.showSearchList = false
        }, 150)
      }
    },
    // 选择搜索到的城市
    selectCityBySearch (e, item) {
      this.resetPositionSelect('prov')
      this.handleSelect('city', item)
    },
    // 选择热门城市
    handleSelectHotCity (e, city) {
      if (this.activeHotCity === city.code) {
        this.activeHotCity = null
      } else {
        this.activeHotCity = city.code
        this.resetPositionSelect('prov')
        this.handleSelect('city', city)
      }
    },
    // 请求省列表
    async queryProvList () {
      if (this.position.list.prov.length > 0) return

      const res = await queryProvinceList()
      const list = res.data.data

      // 首字母字典对象
      const wordsIndex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const wordsDist = {}
      for (let i = 0; i < wordsIndex.length; i++) {
        wordsDist[wordsIndex[i]] = []
      }

      // 将城市列表匹配到对应字母的子列表中
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (/重庆/.test(item.name)) {
          item.word = 'C'
          wordsDist.C.push(item)
          continue
        }
        const word = spell(item.name, 'first', 'up')[0]
        item.word = word
        wordsDist[word].push(item)
      }

      // 将字母对象转换为数组
      const cityList = []
      const wordsList = []
      for (const key in wordsDist) {
        if (wordsDist[key].length === 0) continue
        cityList.push({ word: key, list: wordsDist[key] })
        wordsList.push(key)
      }
      this.setPositionList({ type: 'prov', list: cityList })
      this.setPositionList({ type: 'word', list: wordsList })
    },
    // 根据省code查询市
    async handleQueryCity () {
      const { prov } = this.position.selected
      const res = await queryPositionForCounty(prov.code)
      setTimeout(() => {
        this.setPositionList({ type: 'city', list: res.data.data })
        window.scrollTo(0, 0)
      }, 150)
    },
    // 根据城市code查询区县
    async handleQueryCounty () {
      const { city } = this.position.selected
      const res = await queryPositionForCounty(city.code)
      setTimeout(() => {
        this.setPositionList({ type: 'county', list: res.data.data })
        window.scrollTo(0, 0)
      }, 150)
    },
    // 选择省市区县
    handleSelect (type, value) {
      const _this_ = this
      this.setPositionSelect({ type, value })
      let status = null
      switch (type) {
        case 'prov': status = 'city'; _this_.handleQueryCity(); break
        case 'city': status = 'county'; _this_.handleQueryCounty(); break
        case 'county': status = 'county'; _this_.handleFinish(); break
      }
      this.setCurPosition(status)
    },
    // 完成选择 返回首页
    handleFinish () {
      this.$router.go(-1)
      EventBus.$emit('home-refresh')
    },
    // 重置选择项
    handleReset (type) {
      this.setCurPosition(type)
      switch (type) {
        case 'prov':
          this.resetPositionSelect('city')
          this.resetPositionSelect('county')
          break
        case 'city':
          this.resetPositionSelect('county')
      }
    }
  },
  mounted: async function () {
    // 选择列表重置为选择省
    // this.setCurPosition('prov')

    // 如果没有城市列表就发起请求
    this.queryProvList()

    // 如果需要直接搜索，则弹出键盘
    if (this.$route.query.guide === 'search') {
      this.$refs.search.inputFocus()
      this.status = this.unGeoLocation ? 'fail' : 'success'
      return
    }

    // 如果没有城市信息就定位
    if (this.unGeoLocation) {
      this.status = 'doing'
      this.getCurrentPosition()
    } else this.status = 'success'
  },
  beforeRouteLeave (to, from, next) {
    if (this.unGeoLocation) {
      next(false)
      setTimeout(() => {
        this.$dialog.alert({
          message: '请选择您当前<strong style="color:#FFCD00">所在的区域</strong>，我们将根据您的位置来推荐内容'
        })
      }, 100)
    } else next()
  }
}
</script>

<style lang="scss" scoped>
.container{
  box-sizing: border-box;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }

  // 当前定位城市
  .current-city{
    text-align: left;
    padding: .20rem .15rem;
    @include font (.14rem, $sub-text);

    span{
      color: $main-text;
      font-weight: bold;
    }
  }

  // 搜索结果列表容器
  .search-list{
    width: 100%;
    height: calc(100vh - 50px);
    position: fixed;
    top: 50px;
    left: 0;
    background-color: #ffffff;
    // box-shadow: 0 6px 11px -6px rgba(0, 0, 0, 0.1);
    z-index: 100;

    .index-cell{
      border-color: $normal-text;
    }
  }

  // 选择按钮
  .select{
    padding: .10rem .15rem;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;

    &-button{
      @include font (.18rem, $tip-text, bold);
      padding-bottom: .10rem;
    }

    &-button-bold{
      @extend .select-button;
      color: #333333;
    }

    &-button-active{
      @extend .select-button;
      color: #333333;
      border-bottom: solid 2px $main-text;
    }

    .arrow{
      margin: 0 .20rem;
    }
  }

  // 热门城市
  .hot-cities{
    padding: .05rem .15rem .15rem .15rem;

    &-title{
      text-align: left;
      margin-bottom: .10rem;
      @include font (.18rem, #333333, bold);
    }

    &-grid{
      display: grid;
      grid-template-columns: repeat(3, .94rem);
      grid-template-rows: repeat(3, .34rem);
      grid-gap: .13rem;

      .grid-item{
        display: flex;
        justify-content: center;
        align-items: center;
        color: $sub-text;
        border-radius: 0.02rem;
        background-color: $linecard-color;
      }

      .grid-item-active{
        @extend .grid-item;
        color: #ffffff;
        background-color: $main-color;
      }
    }
  }

  // 索引列表
  .index{
    text-align: left;

    &::-webkit-scrollbar{
      display: none;
    }

    &-anchor{
      background-color: $light-color;
    }

    &-cell{
      margin: 0 .15rem;
      height: .5rem;
      line-height: .5rem;
      border-bottom: solid 1px $light-color;
      @include font (.16rem, $sub-text);

      &:active{
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
