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
      <div class="select-button-active">请选择省市</div>
      <van-icon class="arrow" name="arrow" color="#E8E8E8" size=".12rem" />
      <div class="select-button">请选择区县</div>
    </div>

    <!-- 热门城市 -->
    <div class="hot-cities">
      <div class="hot-cities-title">热门城市</div>
      <div class="hot-cities-grid">
        <div
          v-for="city in hotCities"
          :key="city.id"
          :class="`grid-item${city.id === activeHotCity ? '-active' : ''}`"
          @click="activeHotCity = city.id"
        >{{city.name}}</div>
      </div>
    </div>

    <!-- 城市索引列表 -->
    <van-index-bar class="index">
      <div v-for="item in []" :key="item.idx">
        <van-index-anchor class="index-anchor" :index="item.idx" />
        <div
          v-for="(city, index) in item.cities"
          :key="`${index}-${city.city_pinyin}`"
          class="index-cell"
        >{{city.city_name}}</div>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { Icon, IndexBar, IndexAnchor } from 'vant'
import NavBarSearch from '@/components/NavBarSearch'
// import cityData from '@/assets/acity'

export default {
  components: {
    'van-icon': Icon,
    'van-index-bar': IndexBar,
    'van-index-anchor': IndexAnchor,
    'nav-bar-search': NavBarSearch
  },
  data: () => ({
    // cityData: cityData.city_nav,
    activeHotCity: null,
    hotCities: [
      { id: 0, name: '北京' },
      { id: 1, name: '重庆' },
      { id: 2, name: '上海' },
      { id: 3, name: '深圳' },
      { id: 4, name: '成都' },
      { id: 5, name: '广州' },
      { id: 6, name: '哈尔滨' },
      { id: 7, name: '杭州' },
      { id: 8, name: '西安' }
    ]
  }),
  methods: {
    // 监听搜索事件
    handleSearch ({ value }) {
      // console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  box-sizing: border-box;

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

    &-anchor{
      background-color: $light-color;
    }

    &-cell{
      padding: .15rem;
      @include font (.16rem, $sub-text)
    }
  }
}
</style>
