<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的钱包"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- tabs -->
    <van-tabs
      :active="$store.state.tabsId.myOrder"
      @change="(index) => {$store.commit('changeTabsId', {type: 'myOrder', index})}"
      color="#262626"
      title-inactive-color="#BFBFBF"
      title-active-color="#262626"
      background="#ffffff"
      line-width="52px"
      line-height="2px"
    >
      <!-- 钱包余额 -->
      <van-tab class="van-tab-wrapper" title="钱包余额">
        <balance-detail />
      </van-tab>

      <!-- 乘客发布 -->
      <van-tab class="van-tab-wrapper" title="包车信息">
        <integral-detail />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import Balance from './Balance'
import Integral from './Integral'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'balance-detail': Balance,
    'integral-detail': Integral
  }
}
</script>

<style lang="scss" scoped>
.van-tab-wrapper{
  border-top: solid 1px $light-color;
}
</style>
