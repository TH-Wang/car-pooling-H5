<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的行程"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
      @click-right="manage = !manage"
    >
      <template #right>
        <span>{{manage ? '取消' : '管理'}}</span>
      </template>
    </van-nav-bar>

    <!-- tabs -->
    <van-tabs
      :active="$store.state.tabsId.myTrip"
      @change="(index) => {$store.commit('changeTabsId', {type: 'myTrip', index})}"
      color="#262626"
      title-inactive-color="#BFBFBF"
      title-active-color="#262626"
      background="#ffffff"
      line-width="52px"
      line-height="2px"
      animated
    >
      <!-- 我是乘客 -->
      <van-tab class="van-tab-wrapper" title="我的发布">
        <customer-trip-list :manage=manage />
      </van-tab>

      <!-- 我是车主 -->
      <van-tab class="van-tab-wrapper" title="我的行程">
        <driver-trip-list :manage=manage />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import CustomerTripList from './CustomerTripList'
import DriverTripList from './DriverTripList'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'customer-trip-list': CustomerTripList,
    'driver-trip-list': DriverTripList
  },
  data: () => ({
    manage: false,
    tabId: 0
  })
}
</script>

<style lang="scss" scoped>
.van-tab-wrapper{
  border-top: solid 1px $light-color;
}
</style>
