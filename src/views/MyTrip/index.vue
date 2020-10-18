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
      <van-tab class="van-tab-wrapper" title="我是乘客">
        <van-empty description="暂无行程" v-if="customer.list.length === 0" />
        <trip-item
          v-for="item in customer.list"
          :key="item.id"
          :record="item"
          :show-remove="manage"
        />
      </van-tab>

      <!-- 乘客发布 -->
      <van-tab class="van-tab-wrapper" title="我是车主">
        <van-empty description="暂无行程" v-if="driver.list.length === 0" />
        <trip-item
          v-for="item in driver.list"
          :key="item.id"
          :record="item"
          :show-remove="manage"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import TripItem from './TripItem'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'trip-item': TripItem
  },
  data: () => ({
    manage: false,
    tabId: 0,
    customer: {
      page: 1,
      limit: 20,
      list: []
    },
    driver: {
      page: 1,
      limit: 20,
      list: []
    }
  }),
  mounted () {
    const data = new Array(5).fill({}).map((item, index) => {
      return {
        id: index,
        type: index > 0
          ? index > 1 ? 'finish' : 'cancel'
          : 'doing',
        start: '重庆北站',
        end: '重庆西站',
        time: '2020-03-23  08:00',
        seat: 3
      }
    })
    this.customer.list = data
    this.driver.list = data
  }
}
</script>

<style lang="scss" scoped>
.van-tab-wrapper{
  border-top: solid 1px $light-color;
}
</style>
