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
    />

    <!-- 反馈图标 -->
    <feedback type="success" title="预定成功" tip="请注意出发时间，不要错过啦" />

    <!-- 订单信息 -->
    <div class="content-card" style="margin-top: .20rem">
      <!-- 地图 -->
      <map-view />

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" :content="record.userName" />
      <order-info-field icon-type="car" label="车型" :content="record.vehicleType" />
      <order-info-field icon-type="time" label="出发时间" :content="record.startTime" />
      <order-info-field icon-type="address" label="途径点" :content="passPointLis" />

      <!-- 联系电话 -->
      <order-info-phone :phone="record.mobilePhone"/>
    </div>

    <main-button type="hollow" color="gray" center bold>退订座位</main-button>

    <!-- 温馨提示 -->
    <order-info-tips :tips="tips" @click="handleLink" />
  </div>
</template>

<script>
import moment from 'moment'
import { queryByOrderId } from '@/api'
import { Field, Phone, Tips } from '@/components/OrderInfo/index'
import Feedback from '@/components/Feedback'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'order-info-field': Field,
    'order-info-phone': Phone,
    'order-info-tips': Tips,
    'map-view': MapView,
    'main-button': MainButton,
    feedback: Feedback
  },
  data: () => ({
    orderId: null,
    record: { passPointLis: [] },
    refundTime: ''
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
    }
  },
  created () {
    this.orderId = this.$route.query.id
    this.handleRequest()
    this.refundTime = moment().add(10, 'minutes').format('MM月DD日 HH:mm')
  },
  mounted () {
    this.$dialog.alert({
      message: '恭喜您，预约成功！您可前往个人中心页面进行确认'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
