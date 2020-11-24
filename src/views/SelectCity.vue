<template>
  <div class="container">
    <!-- 搜索框 / 导航栏 -->
    <nav-bar-search mode="dark" @search="handleSearch" />
    <!-- 占位符 -->
    <div style="height: 50px"></div>

    <!-- 当前定位城市 -->
    <div class="current-city">
      当前定位城市·区域 <span>重庆 · 渝北区</span>
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
    <van-index-bar v-show="!showCountyList" class="index">
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
import { mapState, mapMutations } from 'vuex'
import { Icon, IndexBar, IndexAnchor } from 'vant'
import { spell } from 'cnchar'
import { queryPositionForCity, queryPositionForCounty } from '@/api'
import NavBarSearch from '@/components/NavBarSearch'

export default {
  components: {
    'van-icon': Icon,
    'van-index-bar': IndexBar,
    'van-index-anchor': IndexAnchor,
    'nav-bar-search': NavBarSearch
  },
  data: () => ({
    // 当前被选择的热门城市code
    activeHotCity: null,
    // 热门城市列表
    hotCities: [
      { code: 2, shortName: '北京' },
      { code: 2324, shortName: '重庆' },
      { code: 802, shortName: '上海' },
      { code: 1988, shortName: '深圳' },
      { code: 2368, shortName: '成都' },
      { code: 1965, shortName: '广州' },
      { code: 656, shortName: '哈尔滨' },
      { code: 934, shortName: '杭州' },
      { code: 2899, shortName: '西安' }
    ],
    // 城市列表
    cityList: [],
    // 区县列表
    countyList: []
  }),
  computed: {
    // 全局存储城市区县数据
    ...mapState(['position']),
    // 被选择城市名称
    selectCity () {
      return this.position.city ? this.position.city.shortName : '请选择省市'
    },
    // 被选择区县名称
    selectCounty () {
      return this.position.county ? this.position.county.shortName : '请选择区县'
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
      return this.position.countyList.length > 0
    }
  },
  methods: {
    // 改变全局定位城市数据的commit
    ...mapMutations(['setCurPosition', 'setCity', 'setCounty', 'setCityList', 'setCountyList']),
    // 监听搜索事件
    handleSearch ({ value }) {
      // console.log(value)
    },
    // 选择热门城市
    handleSelectHotCity (e, city) {
      let cityData = city
      if (this.activeHotCity === city.code) {
        this.activeHotCity = null
        cityData = null
      } else {
        this.activeHotCity = city.code
      }
      this.handleQueryCounty(null, cityData)
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
      this.setCounty(null)
      this.setCountyList([])
    },
    // 选择区县
    handleSelectCounty (e, county) {
      this.setCounty(county)
      setTimeout(() => {
        this.$router.go(-1)
      }, 150)
    },
    // 重新选择区县
    handleResetCounty () {
      this.setCounty(null)
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
      for (const key in wordsDist) {
        cityList.push({ word: key, list: wordsDist[key] })
      }

      this.setCityList(cityList)
    }
  },
  created () {
    this.queryCityList()
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
