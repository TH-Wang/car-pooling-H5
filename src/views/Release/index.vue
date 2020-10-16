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
      animated
    >
      <!-- 车主发布 -->
      <van-tab title="车主发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card :hasButton="false" />
        </div>

        <customer-form></customer-form>

      </van-tab>

      <!-- 乘客发布 -->
      <van-tab title="乘客发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card :hasButton="false" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import SearchCard from '@/components/SearchCard'
import CustomerForm from './customer'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'search-card': SearchCard,
    'customer-form': CustomerForm
  },
  data: () => ({
    tabId: 0
  })
}
</script>

<style lang="scss" scoped>
.search-card-wrap{
  padding: .20rem 0;
  border-top: solid 1px $normal-text;
}
</style>
