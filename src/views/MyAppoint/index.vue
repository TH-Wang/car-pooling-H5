<template>
  <div class="list-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的预约"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- tabs -->
    <van-tabs
      v-model="tabId"
      color="#262626"
      title-inactive-color="#BFBFBF"
      title-active-color="#262626"
      background="#ffffff"
      line-width="52px"
      line-height="2px"
    >
      <!-- 我是乘客 -->
      <van-tab class="van-tab-wrapper" title="我是乘客">

        <customer-body />

      </van-tab>

      <!-- 我是车主 -->
      <van-tab class="van-tab-wrapper" title="我是车主">

        <driver-body />

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import CustomerBody from './customer'
import DriverBody from './driver'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'customer-body': CustomerBody,
    'driver-body': DriverBody
  },
  data: () => ({
    tabId: 0
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';
.van-tab-wrapper{
  border-top: solid 1px $light-color;
  height: calc(100vh - 90px);
  overflow-y: scroll;
}
.list-container{
  background-color: $light-color;
}
</style>
