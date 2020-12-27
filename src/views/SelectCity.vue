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
      <div :class="selectCityStyle" @click="handleResetCity">{{selectCity}}</div>
      <van-icon class="arrow" name="arrow" color="#E8E8E8" size=".12rem" />
      <div :class="selectCountyStyle" @click="handleResetCounty">{{selectCounty}}</div>
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

    <!-- 城市索引列表 -->
    <van-index-bar
      :sticky-offset-top="50"
      v-show="!showCountyList"
      class="index"
      :index-list="position.wordsList"
    >
      <div v-for="item in position.cityList" :key="item.word">
        <van-index-anchor class="index-anchor" :index="item.word" />
        <div
          v-for="city in item.list"
          :key="city.code"
          class="index-cell"
          @click="handleQueryCounty($event, city)"
        >{{city.shortName}}</div>
      </div>
    </van-index-bar>

    <!-- 区县列表 -->
    <div
      v-show="showCountyList"
      v-for="county in position.countyList"
      :key="county.code"
      class="index-cell"
      @click="handleSelectCounty($event, county)"
    >{{county.name}}</div>
  </div>
</template>

<script>
import AMapLoader from '@/utils/mapLoader'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { Icon, IndexBar, IndexAnchor } from 'vant'
import { spell } from 'cnchar'
import { isEmpty, debounce } from 'lodash'
import {
  queryPositionForCity,
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
    // 被选择城市名称
    selectCity () {
      const city = this.position.city
      return city.name === '' && city.shortName === ''
        ? '请选择省市'
        : this.position.city.shortName
    },
    // 被选择区县名称
    selectCounty () {
      const county = this.position.county
      return county.name === '' && county.shortName === ''
        ? '请选择区县'
        : this.position.county.name
    },
    // 选择城市指示标题的样式
    selectCityStyle () {
      return this.position.current === 'city' ? 'select-button-active' : 'select-button-bold'
    },
    // 选择区县指示标题的样式
    selectCountyStyle () {
      return this.position.current === 'county' ? 'select-button-active' : 'select-button'
    },
    // 显示区县列表
    showCountyList () {
      return this.position.current === 'county'
    }
  },
  methods: {
    // 改变全局定位城市数据的commit
    ...mapMutations([
      'setCurPosition', 'setCity', 'setCounty', 'setCityList', 'setCountyList', 'setWordsList'
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
      this.setCity(cityInfo)
      this.setCounty(countyInfo)
      // 修改定位状态为成功
      this.status = 'success'
      // 将定位发送给后端存储
      await savePosition(countyInfo.code)
      this.$toast.success('定位成功')
    },
    // 请求所有城市列表
    async queryCityList () {
      if (this.position.cityList.length > 0) return

      const res = await queryPositionForCity()
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
      this.setCityList(cityList)
      this.setWordsList(wordsList)
    },
    // 选择搜索到的城市
    selectCityBySearch (e, item) {
      // this.handleResetCity()
      this.handleQueryCounty(null, item)
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
    // 通过城市名称查询城市在数据库中的信息
    async handleQueryCity (cityName) {
      const res = await queryPositionByCityName(cityName)
      this.handleQueryCounty(null, res.data.data[0])
    },
    // 选择热门城市
    handleSelectHotCity (e, city) {
      if (this.activeHotCity === city.code) {
        this.activeHotCity = null
      } else {
        this.activeHotCity = city.code
        this.handleQueryCounty(null, city)
      }
    },
    // 根据城市code查询区县（选择城市）
    async handleQueryCounty (e, city) {
      this.setCity(city)
      const res = await queryPositionForCounty(city.code)
      setTimeout(() => {
        this.setCurPosition('county')
        this.setCountyList(res.data.data)
        window.scrollTo(0, 0)
      }, 150)
    },
    // 重新选择城市
    handleResetCity () {
      this.setCurPosition('city')
      this.resetCounty()
      // this.setCountyList([])
    },
    // 选择区县
    async handleSelectCounty (e, county) {
      this.setCounty(county)
      if (this.user.token) {
        await savePosition(county.code)
      }
      setTimeout(() => {
        this.$router.go(-1)
        EventBus.$emit('home-refresh')
      }, 150)
    },
    // 重新选择区县
    handleResetCounty () {
      this.resetCounty()
    }
  },
  mounted: async function () {
    // 如果没有城市列表就发起请求
    if (this.position.cityList.length === 0) {
      this.queryCityList()
    }

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
