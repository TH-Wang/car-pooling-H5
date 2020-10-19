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
    >
      <!-- 我是乘客 -->
      <van-tab class="van-tab-wrapper" title="我是乘客">
        <van-empty description="暂无行程" v-if="customer.list.length === 0" />
        <trip-item
          v-for="item in customer.list"
          :key="item.id"
          :record="item"
          :show-remove="manage"
          @click="handleLinkDetail($event, 'customer', item)"
          @remove="handleRemove('customer', item.id)"
        />
      </van-tab>

      <!-- 我是车主 -->
      <van-tab class="van-tab-wrapper" title="我是车主">
        <van-empty description="暂无行程" v-if="driver.list.length === 0" />
        <trip-item
          v-for="item in driver.list"
          :key="item.id"
          :record="item"
          :show-remove="manage"
          @click="handleLinkDetail($event, 'driver', item)"
          @remove="handleRemove('driver', item.id)"
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
  methods: {
    handleLinkDetail (e, type, { id, state }) {
      this.$router.push({
        path: `/common/tripinfo/${type}`,
        query: { id, state }
      })
    },
    handleRemove (type, id) {
      const index = this[type].list.findIndex(i => i.id === id)
      console.log(index)
      if (typeof index !== 'undefined') {
        this[type].list.splice(index, 1)
      }
    }
  },
  mounted () {
    const data = new Array(5).fill({}).map((item, index) => {
      return {
        id: index,
        state: index > 0
          ? index > 1 ? 'finish' : 'cancel'
          : 'doing',
        start: '重庆北站',
        end: '重庆西站',
        time: '2020-03-23  08:00',
        seat: 3
      }
    })
    this.customer.list = data
    this.driver.list = data.slice(0, 3)
  }
}
</script>

<style lang="scss" scoped>
.van-tab-wrapper{
  border-top: solid 1px $light-color;
}
</style>
