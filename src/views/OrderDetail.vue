<template>
  <div class="container">

    <!-- 导航栏 -->
    <van-nav-bar
      title="出行详情"
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
      @click-right="handleBackHome"
    >
      <template #left><van-icon name="arrow-left" /></template>
      <template #right><van-icon name="wap-home" /></template>
    </van-nav-bar>

    <!-- 顶部基本信息 -->
    <order-info-header :record="record" content-type="price" />

    <!-- 详情卡片 -->
    <div class="content-card">

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" :content="record.userName" />
      <order-info-field icon-type="car" label="车型" :content="record.vehicleType" />
      <order-info-field icon-type="seat" label="余座" :content="record.seatNum" text-color="yellow" />
      <order-info-field icon-type="time" label="出发时间" :content="startTime" />
      <order-info-field icon-type="address" label="途径点" :content="passPointLis" />

      <!-- 地图 -->
      <map-view />
    </div>

    <!-- 底部按钮组 -->
    <div class="footer-button-group">
      <main-button width="1.58rem" color="gray" type="hollow">转发分享</main-button>
      <main-button
        width="1.58rem"
        color="yellow"
        type="gradient"
        @click="handleLinkReserve"
      >立即预订</main-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getPublishDetail } from '@/api'
// import { isEmpty } from 'lodash'
import { Header, Field } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'map-view': MapView,
    'main-button': MainButton
  },
  data: () => ({
    orderId: null,
    record: {
      userName: '',
      vehicleType: '',
      seatNum: 0,
      passPointLis: []
    },
    headerRecord: {}
  }),
  computed: {
    startTime () {
      return moment(this.record.startTime).format('MM月DD日 HH:mm')
    },
    passPointLis () {
      return this.record.passPointLis.map(i => i.pointName).join('-')
    }
  },
  methods: {
    async handleRequest () {
      const id = this.orderId
      const res = await getPublishDetail(id)
      this.record = res.data.data
    },
    handleBackHome () {
      this.$router.replace('/home')
      location.reload()
    },
    handleLinkReserve () {
      const pprId = this.record.pprId
      this.$router.push({ path: '/common/reserve', query: { pprId } })
    }
  },
  created () {
    this.orderId = this.$route.query.id
    this.handleRequest()
  },
  activated () {
    this.orderId = this.$route.query.id
    this.handleRequest()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss';

.footer-button-group{
  margin: .20rem .20rem .30rem .20rem;
  @include flex (space-between, center);
}
</style>
