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
      <map-view :info="record.passPointLis" />

      <!-- 预约的车主信息 -->
      <!-- <div v-if="identity === 0"> -->
        <order-info-field icon-type="user" label="车主" :content="record.userName" />
        <order-info-field icon-type="car" label="车型" :content="record.vehicleType" />
        <order-info-field icon-type="time" label="出发时间" :content="startTime" />
        <order-info-field icon-type="address" label="途径点" :content="passPointLis" />
      <!-- </div> -->

      <!-- 预约的乘客信息 -->
      <!-- <div v-else>
        <order-info-field
          v-for="(item, index) in custInfoConfig"
          :key="index"
          :icon-type="item[0]"
          :label="item[1]"
          :content="record[item[2]]"
        />
      </div> -->

      <!-- 联系电话 -->
      <order-info-phone :phone="record.mobilePhone"/>
    </div>

    <div v-if="identity === 0">
      <!-- 退订按钮 -->
      <main-button @click="showRefund = true" type="hollow" color="gray" center>退订座位</main-button>

      <!-- 温馨提示 -->
      <order-info-tips :tips="tips" />

      <!-- 退订弹窗 -->
      <refund-order-layer
        :visible="showRefund"
        @close="showRefund = false"
        @submit="handleRefund"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { queryByOrderId, confirmOrder } from '@/api'
import { Field, Phone, Tips } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import RefundOrderLayer from '@/components/Layer/RefundOrder'

export default {
  components: {
    'order-info-field': Field,
    'order-info-phone': Phone,
    'order-info-tips': Tips,
    'refund-order-layer': RefundOrderLayer,
    'map-view': MapView,
    'main-button': MainButton
  },
  data: () => ({
    record: {
      passPointLis: []
    },
    showRefund: false,
    custInfoConfig: [
      ['user', '乘客', 'userName'],
      ['user', '预约人数', 'orderNum'],
      ['car', '出发地点', 'startAddr'],
      ['car', '到达地点', 'endAddr'],
      ['remark', '备注', 'remark']
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
    },
    tips () {
      // const insertTime = moment(this.record.insertTime).add(10, 'minutes').format('MM月DD日 HH:mm')
      return [
        '温馨提示',
        `1.如您行程改变，请尽可能提前退订，
            <span style="color:#FFCD00">07月09日 08:00</span>前可
            <span style="color:#FFCD00" onclick="handleLinkDesc()">无责退订</span>。`,
        '2.请在上车后，将分摊费用直接支付车主。'
      ]
    }
  },
  methods: {
    // 退订
    async handleRefund (data) {
      // 判断是乘客取消还是司机取消
      const status = this.identity === 0 ? 7 : 3
      const orderId = this.record.orderId
      const res = await confirmOrder({ status, orderId, ...data })
      if (res.data.msg === '成功') {
        this.$toast.success('退订成功！')
        this.$router.go(-1)
      }
    },
    // 跳转到无责退订页面
    handleLinkDesc () {
      this.$router.push('/common/description?type=liability')
    }
  },
  created: async function () {
    const orderId = this.$route.query.orderId
    const res = await queryByOrderId(orderId)
    this.record = res.data.data

    // 跳转无责退订页面
    if (!window.handleLinkDesc) {
      window.handleLinkDesc = this.handleLinkDesc
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
