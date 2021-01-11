<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="预定"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.replace('/home')"
      @click-right="$router.replace('/home')"
    >
      <template #right><van-icon name="wap-home" /></template>
    </van-nav-bar>

    <!-- 反馈图标 -->
    <feedback type="success" title="预定成功" tip="请注意出发时间，不要错过啦" />

    <!-- 订单信息 -->
    <div class="content-card" style="margin-top: .20rem">
      <!-- 地图 -->
      <map-view :info="record.passPointLis" />

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" :content="record.userName" />
      <order-info-field icon-type="car" label="车型" :content="record.vehicleType" />
      <order-info-field icon-type="time" label="出发时间" :content="record.startTime" />
      <order-info-field icon-type="address" label="途径点" :content="passPointLis" />

      <!-- 联系电话 -->
      <order-info-phone :phone="record.mobilePhone"/>
    </div>

    <main-button
      @click="showRefund = true"
      type="hollow" color="gray"
      center bold
    >退订座位</main-button>

    <!-- 温馨提示 -->
    <order-info-tips :tips="tips" @click="handleLink" />

    <!-- 退订弹窗 -->
    <refund-order-layer v-model="showRefund" @submit="handleRefund" />
  </div>
</template>

<script>
import moment from 'moment'
import { queryByOrderId, confirmOrder } from '@/api'
import { Field, Phone, Tips } from '@/components/OrderInfo/index'
import Feedback from '@/components/Feedback'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import RefundOrderLayer from '@/components/Layer/RefundOrder'
import callPhone from '@/utils/callPhone'

export default {
  components: {
    'order-info-field': Field,
    'order-info-phone': Phone,
    'order-info-tips': Tips,
    'map-view': MapView,
    'main-button': MainButton,
    feedback: Feedback,
    'refund-order-layer': RefundOrderLayer
  },
  data: () => ({
    orderId: null,
    record: { passPointLis: [] },
    refundTime: '',
    showRefund: false
  }),
  computed: {
    passPointLis () {
      return this.record.passPointLis.map(i => i.pointName).join('-')
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
    async handleRequest () {
      const res = await queryByOrderId(this.orderId)
      this.record = res.data.data
    },
    handleLink (type) {
      if (type === 'NO_LIABILITY') {
        this.$router.push('/common/description?type=liability')
      }
    },
    // 退订
    async handleRefund (data) {
      // 判断是乘客取消还是司机取消
      const status = 7
      const orderId = this.orderId
      console.log({ status, orderId, ...data })
      this.showRefund = false
      const res = await confirmOrder({ status, orderId, ...data })
      if (res.data.msg === '成功') {
        this.$toast.success('退订成功！')
        this.$router.go(-1)
      }
      this.startPage = 1
      this.handleListLoad(true)
    }
  },
  created () {
    this.orderId = this.$route.query.id
  },
  mounted: async function () {
    await this.handleRequest()
    this.refundTime = moment().add(10, 'minutes').format('MM月DD日 HH:mm')
    this.$dialog.confirm({
      message: '恭喜您，预约成功！您可前往个人中心页面进行确认',
      confirmButtonText: '联系车主',
      cancelButtonText: '确认'
    }).then(() => {
      callPhone(this.record.mobilePhone)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
