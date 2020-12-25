<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="line-text">
          <div class="start ellipsis">{{startAddrName}}</div>
          <img class="arrow" src="@/assets/icons/line-arrow.png" alt="">
          <div class="end ellipsis">{{endAddrName}}</div>
        </div>
      </template>
    </van-nav-bar>

    <!-- 过滤下拉菜单 -->
    <order-filter v-model="filters" @change="handleFilterChange"/>

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="未搜索到结果~" />
    </div>
    <!-- 拼单列表 -->
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="handleLoad"
      class="list-container"
    ><work-order :list="list" :type="dataSource.workType" />
      <!-- <carpool-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
        @click="handleLinkDetail"
      >
        <template #button>
          <mini-button
            color="yellow"
            :orderId="item.id"
            @click="handleConfirm"
          >立即预订</mini-button>
        </template>
      </carpool-order> -->
    </van-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { List } from 'vant'
import { cloneDeep } from 'lodash'
import { getCar, queryPassengerOrders, getFastLineCar } from '@/api'
import { OrderFilter } from '@/components/Filter/index.js'
import WorkOrder from '@/components/WorkOrder'
// import CarpoolOrder from '@/components/OrderItem/Carpool'
// import MiniButton from '@/components/MiniButton'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'order-filter': OrderFilter,
    'work-order': WorkOrder,
    WorkOrder
    // 'carpool-order': CarpoolOrder,
    // 'mini-button': MiniButton
  },
  data: () => ({
    dataSource: {},
    positionInfo: null,
    notReqOnMounted: true
  }),
  computed: {
    ...mapState(['position', 'search']),
    startAddrName () {
      if (this.dataSource.startAddrAll) return this.dataSource.startAddrAll
      else return this.dataSource.startAddr
    },
    endAddrName () {
      if (this.dataSource.endAddrAll) return this.dataSource.endAddrAll
      else return this.dataSource.endAddr
    }
  },
  methods: {
    // 普通模式下，监听列表加载
    handleLoad () {
      if (!this.dataSource.mode) this.handleListLoad()
    },
    // 搜索快捷路线
    async handleQueryFastLine () {
      const res = await getFastLineCar(this.dataSource.id)
      this.list = res.data.data
    },
    reqApi (data) {
      const driverReq = ['pending', 'hitCus', 'carryCus']
      // 如果是乘客查询车主信息
      if (driverReq.indexOf(this.dataSource.workType) === -1) {
        return getCar(data)
      } else return queryPassengerOrders(data)
    },
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      // 订单信息
      const dataSource = cloneDeep(this.dataSource)
      if (dataSource.workType) delete dataSource.workType
      if (dataSource.startAddrAll) delete dataSource.startAddr
      if (dataSource.endAddrAll) delete dataSource.endAddr
      const data = {
        ...dataSource,
        // queryAllPosition: 1,
        orderType: parseInt(dataSource.orderType) // 1-车主发布 2-乘客发布
      }
      const parseList = ['startAddrLon', 'startAddrLat', 'endAddrLon', 'endAddrLat']
      parseList.forEach(item => {
        if (dataSource[item]) data[item] = parseFloat(dataSource[item])
      })
      // if (this.dataSource.publishType) {
      //   data.publishType = parseInt(this.dataSource.publishType)
      // }
      // 返回主要参数
      return data
    },
    // 进入详情页面
    handleLinkDetail (record) {
      this.$router.push({ name: 'OrderDetail', query: { record: JSON.stringify(record) } })
    },
    // 点击订单按钮
    handleConfirm (e) {
      console.log('[点击mini按钮]', e)
    }
  },
  created () {
    this.dataSource = this.$route.query
    if (!this.dataSource.mode) {
      this.handleListLoad()
    } else this.handleQueryFastLine()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
// 路线
.line-text{
  display: flex;
  align-items: center;
  color: $main-text;
  font-size: .16rem;
  font-weight: bold;
  text-align: left;

  .arrow{
    width: .18rem;
    margin: 0 .06rem;
  }
  .start{text-align: right;}
  .end{text-align: left;}
}
</style>
