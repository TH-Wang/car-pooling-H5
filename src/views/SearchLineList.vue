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
          <div class="start ellipsis">{{addrName.start}}</div>
          <img class="arrow" src="@/assets/icons/line-arrow.png" alt="">
          <div class="end ellipsis">{{addrName.end}}</div>
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
      @load="handleListLoad"
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
import { getCar, queryPassengerOrders, getFastLineCar, getFastLinePassengerCar } from '@/api'
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
    positionInfo: null
    // notReqOnMounted: true
  }),
  computed: {
    ...mapState(['position', 'search']),
    addrName () {
      const { startAddrAll, endAddrAll } = this.dataSource
      return { start: startAddrAll, end: endAddrAll }
    }
  },
  methods: {
    reqApi (data) {
      const driverReq = ['pending', 'hitCus', 'carryCus']
      // 如果是乘客查询车主信息
      if (driverReq.indexOf(this.dataSource.workType) === -1) {
        return this.dataSource.mode === 'fast'
          ? getFastLineCar(data)
          : getCar(data)
      } else {
        return this.dataSource.mode === 'fast'
          ? getFastLinePassengerCar(data)
          : queryPassengerOrders(data)
      }
    },
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      // 快捷路线的查询
      if (this.dataSource.mode === 'fast') {
        const id = parseInt(this.dataSource.id)
        return { id }
      }

      // 搜索路线的查询
      const dataSource = cloneDeep(this.dataSource)
      // 整理数据
      if (dataSource.workType) delete dataSource.workType
      if (dataSource.orderType) parseInt(dataSource.orderType)
      // 获取起止点详细信息
      const addrInfo = this.getAddrInfo()
      // 封装参数
      const data = {
        ...dataSource,
        ...addrInfo
      }
      console.log(data)

      return data
    },
    getAddrInfo () {
      const { startAddr, endAddr } = this.search
      return {
        // 出发点
        startAddr: startAddr.name,
        startPname: startAddr.pname,
        startCityname: startAddr.cityname,
        startAdname: startAddr.adname,
        startTownship: startAddr.township,
        startAddrLon: startAddr.location.lng,
        startAddrLat: startAddr.location.lat,
        // 目的地
        endAddr: endAddr.name,
        endPname: endAddr.pname,
        endCityname: endAddr.cityname,
        endAdname: endAddr.adname,
        endTownship: endAddr.township,
        endAddrLon: endAddr.location.lng,
        endAddrLat: endAddr.location.lat
      }
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
    // if (!this.dataSource.mode) {
    //   this.handleListLoad()
    // } else this.handleQueryFastLine()
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
