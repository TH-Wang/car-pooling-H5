<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的订单"
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
      <!-- 车主发布 -->
      <van-tab class="van-tab-wrapper" title="旅游路线">
        <van-empty description="暂无订单信息" v-if="tour.list.length === 0" />
        <goods-item
          v-for="item in tour.list"
          :key="item.id"
          :record="item"
          :button-text="getButtonStyle('text', item.state)"
          :button-type="getButtonStyle('type', item.state)"
          @click="handleLinkDetail('tour', item.id, item.state)"
        />
      </van-tab>

      <!-- 乘客发布 -->
      <van-tab class="van-tab-wrapper" title="包车信息">
        <van-empty description="暂无订单信息" v-if="car.list.length === 0" />
        <goods-item
          v-for="item in car.list"
          :key="item.id"
          :record="item"
          :button-text="getButtonStyle('text', item.state)"
          :button-type="getButtonStyle('type', item.state)"
          show-tip
          price-suffix="起"
          @click="handleLinkDetail('car', item.id, item.state)"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import GoodsItem from '@/components/GoodsItem'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'goods-item': GoodsItem
  },
  data: () => ({
    tabId: 0,
    tour: {
      page: 1,
      limit: 20,
      list: []
    },
    car: {
      page: 1,
      limit: 20,
      list: []
    }
  }),
  methods: {
    // 判断按钮的状态
    getButtonStyle (type, state) {
      switch (type) {
        case 'text': return state === 'doing' ? '进行中' : '已完成'
        case 'type': return state === 'doing' ? 'primary' : 'normal'
      }
    },
    // 跳转详情页面
    handleLinkDetail (type, id, state) {
      this.$router.push({
        path: `/common/my/order/${type}`,
        query: { id, state }
      })
    }
  },
  mounted () {
    // 旅游
    const tourData = new Array(5).fill({}).map((item, index) => {
      return {
        id: index,
        state: index % 2 === 0 ? 'doing' : 'finish',
        title: '故宫博物馆感受文化之旅',
        price: 1000
      }
    })
    this.tour.list = tourData
    // 包车
    const carsData = new Array(3).fill({}).map((item, index) => {
      return {
        id: index,
        state: index % 2 === 0 ? 'doing' : 'finish',
        title: '小面包车',
        price: 30,
        tip: '搬运'
      }
    })
    this.car.list = carsData
  }
}
</script>

<style lang="scss" scoped>
.van-tab-wrapper{
  border-top: solid 1px $light-color;
}
</style>
