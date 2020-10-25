<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="快捷路线"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 当前定位城市 -->
    <div class="current-city">
      当前定位城市·区域 <span>重庆 · 渝北区</span>
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

    <!-- 快捷路线 -->
    <quick-line :show-link="false" />
  </div>
</template>

<script>
import QuickLine from '@/components/QuickLine'

export default {
  components: {
    'quick-line': QuickLine
  },
  data: () => ({
    activeHotCity: 1,
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
  })
}
</script>

<style lang="scss" scoped>
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
</style>
