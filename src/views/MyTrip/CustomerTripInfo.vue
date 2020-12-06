<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="行程详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
    />

    <!-- 顶部 -->
    <order-info-header :record="{
      start: startAddrName,
      end: endAddrName,
      state: record.orderState
    }" content-type="state" />

    <!-- 详情卡片 -->
    <div class="content-card">
      <!-- 地图 -->
      <map-view />

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" :content="record.userName" />
      <order-info-field icon-type="car" label="车型" :content="record.vehicleType" />
      <order-info-field icon-type="time" label="出发时间" :content="startTime" />
      <order-info-field icon-type="address" label="途径点" :content="passPointList" />

      <!-- 联系电话 -->
      <order-info-phone :phone="record.mobilePhone"/>
    </div>

    <main-button v-if="record.orderState === 1" color="gray" type="hollow" center>退订座位</main-button>

    <!-- 温馨提示 -->
    <order-info-tips v-if="record.orderState === 1" :tips="tips" />
  </div>
</template>

<script>
import moment from 'moment'
import { queryPublishById } from '@/api'
import { Header, Field, Phone, Tips } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import { getLineText } from '@/utils/getLineText'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'order-info-phone': Phone,
    'order-info-tips': Tips,
    'map-view': MapView,
    'main-button': MainButton
  },
  data: () => ({
    orderId: '',
    record: {},
    stateMark: ''
  }),
  computed: {
    startAddrName () {
      if (this.record.startAddr) return this.record.startAddr
      if (this.record.passPointList) return this.record.passPointList[0].pointName
      return ''
    },
    endAddrName () {
      if (this.record.endAddr) return this.record.endAddr
      if (this.record.passPointList) return this.record.passPointList.find(i => i.type === 3).pointName
      return ''
    },
    startTime () {
      if (!this.record.startTime) return ''
      return moment(this.record.startTime).format('MM-DD HH:mm')
    },
    // 途径点拼接字符串
    passPointList () {
      return getLineText(this.record.passPointList)
    },
    tips () {
      const refundTime = this.refundTime
      return [
        '温馨提示',
        `1.如您行程改变，请尽可能提前退订，
          <span style="color:#FFCD00">${refundTime}</span>前可
          <span style="color:#FFCD00" id="NO_LIABILITY">无责退订</span>。`,
        '2.请在上车后，将分摊费用直接支付车主。'
      ]
    }
  },
  methods: {
    // 请求详情信息
    async reqInfo () {
      const res = await queryPublishById(this.orderId)
      this.record = res.data.data[0]
    }
  },
  mounted () {
    const { id } = this.$route.query
    this.orderId = id
    this.reqInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
