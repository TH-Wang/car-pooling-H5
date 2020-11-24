<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="订单详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
    />

    <!-- 详情卡片 -->
    <div class="content-card" style="margin-top: .20rem">
      <!-- 地图 -->
      <map-view />

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" :content="record.userName" />
      <order-info-field icon-type="car" label="车型" :content="record.vehicleType" />
      <order-info-field icon-type="time" label="出发时间" :content="startTime" />
      <order-info-field icon-type="address" label="途径点" :content="passPointLis" />

      <!-- 联系电话 -->
      <order-info-phone :phone="record.mobilePhone"/>
    </div>

    <main-button @click="handleRefund" type="hollow" color="gray" center bold>退订座位</main-button>

    <!-- 温馨提示 -->
    <order-info-tips :tips="tips" />
  </div>
</template>

<script>
import moment from 'moment'
import { queryByOrderId, confirmOrder } from '@/api'
import { Field, Phone, Tips } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import { mapGetters } from 'vuex'

export default {
  components: {
    'order-info-field': Field,
    'order-info-phone': Phone,
    'order-info-tips': Tips,
    'map-view': MapView,
    'main-button': MainButton
  },
  data: () => ({
    record: {
      passPointLis: []
    },
    tips: [
      '温馨提示',
      '1.如您行程改变，请尽可能提前退订，<span style="color:#FFCD00">07月09日 08:00</span style="color:#FFCD00">前可<span style="color:#FFCD00">无责退订</span>。',
      '2.请在上车后，将分摊费用直接支付车主。'
    ]
  }),
  computed: {
    ...mapGetters(['identity']),
    startTime () {
      return this.record.startTime
        ? moment(this.record.startTime).format('MM月DD日 HH:mm')
        : ''
    },
    passPointLis () {
      return this.record.passPointLis.map(i => i.pointName).join('-')
    }
  },
  methods: {
    // 退订
    async handleRefund () {
      // 判断是乘客取消还是司机取消
      const status = this.identity === 0 ? 4 : 3
      const orderId = this.record.orderId
      const res = await confirmOrder({ status, orderId })
      if (res.data.msg === '成功') {
        this.$toast.success('退订成功！')
        this.$router.go(-1)
      }
    }
  },
  created: async function () {
    const orderId = this.$route.query.orderId
    const res = await queryByOrderId(orderId)
    this.record = res.data.data
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
