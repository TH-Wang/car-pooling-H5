<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="行程详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
    ><template #right>
      <strong @click="handleShare" style="color:#FFCD00">分享行程</strong>
    </template>
    </van-nav-bar>

    <!-- 顶部 -->
    <order-info-header :record="{
      startAddr: record.startAddr,
      endAddr: record.endAddr,
      state: record.orderState
    }" content-type="state" />

    <!-- 详情卡片 -->
    <div class="content-card">

      <!-- <div> -->
        <!-- 地图 -->
        <map-view :info="record.passPointList || record.passPointLis" />

        <!-- 详细信息：预约其他车主的订单信息 -->
        <div v-if="record.isPublish === 0">
          <order-info-field icon-type="user" label="车主" :content="record.userName" />
          <order-info-field icon-type="car" label="车型" :content="record.vehicleType" />
          <order-info-field icon-type="time" label="出发时间" :content="startTime" />
          <order-info-field icon-type="address" label="途径点" :content="passPointList" />
        </div>
        <div v-else>
          <order-info-field icon-type="time" label="出发时间" :content="startTime" />
          <order-info-field icon-type="user" label="预约状态" :content="statusText" />
          <order-info-field icon-type="seat" label="人数" :content="record.orderNum" />
          <order-info-field icon-type="remark" label="备注" :content="remark" />
        </div>

        <!-- 联系电话 -->
        <order-info-phone
          v-if="record.isPublish === 0"
          :phone="getPhone(record.mobilePhone)"
          @click="handleCall"
        />
      <!-- </div> -->

      <!-- 如果没有司机确认 -->
      <!-- <van-empty  v-if="record.isPublish === 0 && !hasReversed" description="暂无车主预约"/> -->
    </div>

    <main-button
      v-if="record.orderState === 1 && record.isPublish === 0"
      color="gray" type="hollow" center
      @click="showRefund = true"
    >退订座位</main-button>

    <!-- 温馨提示 -->
    <order-info-tips v-if="record.orderState === 1 && record.isPublish === 0" :tips="tips" />

    <!-- 退订弹窗 -->
    <refund-order-layer
      v-model="showRefund"
      @close="showRefund = false"
      @submit="handleRefund"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { selectByPassengerDetail, getPassengerPublishDetail, confirmOrder } from '@/api'
import { Header, Field, Phone, Tips } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import RefundOrderLayer from '@/components/Layer/RefundOrder'
import { getPointText } from '@/utils/getLineText'
import callPhone from '@/utils/callPhone'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'order-info-phone': Phone,
    'order-info-tips': Tips,
    'map-view': MapView,
    'refund-order-layer': RefundOrderLayer,
    'main-button': MainButton
  },
  data: () => ({
    orderId: '',
    pprId: null,
    record: {},
    stateMark: '',
    showRefund: false,
    status: null
  }),
  computed: {
    // 判断是否有车主预约
    hasReversed () {
      if (!this.record.status) return false
      const status = this.record.status
      return status !== 0
    },
    // 预约状态信息
    statusText () {
      switch (this.status) {
        case 0: return '暂无车主预约'
        case 1: return '预约成功'
        case 2: return '已确认'
        case 3: return '车主已取消'
        case 4: return '已取消'
        case 5: return '等待车主确认'
        case 6: return '等待您的确认'
        default: return ''
      }
    },
    // 出发时间
    startTime () {
      let startTime = null
      if (this.record.startTime) startTime = this.record.startTime
      else startTime = this.record.passengerStartTime
      return moment(startTime).format('MM月DD日 HH:mm')
    },
    // 途径点拼接字符串
    passPointList () {
      return getPointText(this.record.passPointLis)
    },
    // 备注
    remark () {
      return this.record.remark >= 0 ? this.record.remark : '无'
    },
    tips () {
      const insertTime = moment(this.record.insertTime).add(10, 'minutes').format('MM月DD日 HH:mm')
      return [
        '温馨提示',
        `1.如您行程改变，请尽可能提前退订，
          <span style="color:#FFCD00">${insertTime}</span>前可
          <span style="color:#FFCD00" id="NO_LIABILITY" onclick="handleLinkDesc()">无责退订</span>。`,
        '2.请在上车后，将分摊费用直接支付车主。'
      ]
    }
  },
  methods: {
    // 请求详情信息
    async reqInfo () {
      const res = await selectByPassengerDetail(this.orderId)
      const data = res.data.data[0]
      // 如果不是乘客自己发布的，则直接展示
      this.status = data.status
      if (data.isPublish === 0) {
        this.record = res.data.data[0]
        return
      }
      // 如果是自己发布的，则请求发布详情接口
      const detailRes = await getPassengerPublishDetail(this.orderId)
      this.record = detailRes.data.data
    },
    // 退订
    async handleRefund (data) {
      // 判断是乘客取消还是司机取消
      const status = 7
      const orderId = this.record.orderId
      const res = await confirmOrder({ status, orderId, ...data })
      if (res.data.msg === '成功') {
        this.$toast.success('退订成功！')
        this.$router.go(-1)
      }
    },
    // 跳转分享页面
    handleShare () {
      if (this.record.isPublish === 0) {
        this.$router.push('/common/tripshare/driver?id=' + this.pprId)
      } else {
        this.$router.push('/common/tripshare/customer?id=' + this.orderId)
      }
    },
    // 跳转到无责退订页面
    handleLinkDesc () {
      this.$router.push('/common/description?type=liability')
    },
    // 判断电话号码显示文本
    getPhone (phone) {
      return this.record.orderState === 0
        ? phone
        : phone.slice(0, 3) + '****' + phone.slice(7)
    },
    // 拨打电话
    handleCall () {
      if (this.record.orderState !== 0) return
      callPhone(this.record.mobilePhone)
    }
  },
  created () {
    if (!window.handleLinkDesc) {
      window.handleLinkDesc = this.handleLinkDesc
    }
  },
  mounted: async function () {
    const { id, pprId } = this.$route.query
    this.orderId = id
    this.pprId = pprId
    await this.reqInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
