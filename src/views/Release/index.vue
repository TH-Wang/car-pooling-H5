<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="发布" fixed placeholder :border="false" />

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
      <!-- 车主发布 -->
      <van-tab title="车主发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card :hasButton="false" />
        </div>

        <driver-form-body />

      </van-tab>

      <!-- 乘客发布 -->
      <van-tab title="乘客发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card :hasButton="false" />
        </div>

        <customer-form-body></customer-form-body>
      </van-tab>
    </van-tabs>

    <!-- 联系号码 -->
    <div class="confirm-phone">
      请确认你的联系手机号
      <span class="phone">157 2020 0126</span>
      <span class="link">修改手机号</span>
    </div>

    <!-- 温馨提示 -->
    <div class="tip">
      <p>温馨提示</p>
      <p>请务必保证信息的真实，如被拼友投诉，将被平台限制发信息哦</p>
    </div>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import SearchCard from '@/components/SearchCard'
import CustomerFormBody from './customer'
import DriverFormBody from './driver'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'search-card': SearchCard,
    'customer-form-body': CustomerFormBody,
    'driver-form-body': DriverFormBody
  },
  data: () => ({
    tabId: 0
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';

.search-card-wrap{
  padding-top: .20rem;
  border-top: solid 1px $normal-text;
}
</style>
