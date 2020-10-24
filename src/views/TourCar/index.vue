<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="旅游包车"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- tabs -->
    <van-tabs
      :active="$store.state.tabsId.tourcar"
      @change="(index) => {$store.commit('changeTabsId', {type: 'tourcar', index})}"
      color="#262626"
      title-inactive-color="#BFBFBF"
      title-active-color="#262626"
      background="#ffffff"
      line-width="52px"
      line-height="2px"
    >
      <!-- 旅游路线 -->
      <van-tab class="van-tab-wrapper" title="旅游路线">
        <tour-body class="border-top" />
      </van-tab>

      <!-- 包车信息 -->
      <van-tab class="van-tab-wrapper" title="包车信息">
        <car-body class="border-top" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import TourBody from './Tour'
import CarBody from './Car'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'tour-body': TourBody,
    'car-body': CarBody
  }
}
</script>

<style lang="scss" scoped>
.border-top{
  border-top: solid 1px $normal-text;
  box-sizing: border-box;
}
</style>
