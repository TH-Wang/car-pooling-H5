<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="出行详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
      @click-right="$router.replace('/home')"
    >
      <template #right><van-icon name="wap-home" /></template>
    </van-nav-bar>

    <!-- 顶部 -->
    <order-info-header :record="{
      startAddr: record.startAddr,
      endAddr: record.endAddr,
      cost: record.cost
    }" content-type="price" />

    <!-- 详情卡片 -->
    <div class="content-card">

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" :content="record.userName" />
      <order-info-field icon-type="car" label="车型" :content="record.vehicleType" />
      <order-info-field icon-type="seat" label="余座" :content="record.seatNum" text-color="yellow" />
      <order-info-field icon-type="time" label="出发时间" :content="startTime" />
      <order-info-field icon-type="address" label="途径点" :content="passPointList" />
      <order-info-field icon-type="remark" label="备注" :content="record.remark || '无'" />

      <!-- 地图 -->
      <map-view :info="lnglat" />
    </div>

    <div class="tip">可复制粘贴到任意QQ、微信等拼车群</div>

    <!-- 底部按钮组 -->
    <div class="footer-button-group">
      <!-- <main-button width="1.2rem" @click="handleCopy">复制到微信</main-button> -->
      <main-button
        width="3.45rem"
        type="gradient"
        @click="copyToClip"
      >复制内容</main-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
// import Clipboard from 'clipboard'
import { getPublishDetail } from '@/api'
import { Header, Field } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import { getLineText } from '@/utils/getLineText'
import getLngLat from '@/utils/getLngLat'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'map-view': MapView,
    'main-button': MainButton
  },
  data: () => ({
    orderId: null,
    record: null,
    // copyContent: '',
    copyTarget: null,
    lnglat: null
  }),
  computed: {
    startTime () {
      return this.record.startTime
        ? moment(this.record.startTime).format('MM月DD日 HH:mm')
        : ''
    },
    // 途径点拼接字符串
    passPointList () {
      return getLineText(this.record.passPointList)
    },
    copyContent () {
      if (!this.record) return ''
      const { startAddr, endAddr, startTime, vehicleType, seatNum, cost, userName, remark } = this.record
      const formatTime = moment(startTime).format('MM月DD日 HH:mm')
      return `【起止地】${startAddr} - ${endAddr}\n【时间】${formatTime}\n【路线】${this.passPointList}\n【车型】${vehicleType || ''}\n【余座】${seatNum}\n【A费】${cost}元/人\n【车主】${userName}\n【备注】${remark}`
    }
  },
  methods: {
    async handleReq () {
      const res = await getPublishDetail(this.orderId)
      this.record = res.data.data
    },
    copyToClip () {
      const aux = document.createElement('textarea')
      aux.value = this.copyContent
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$toast.success('复制成功')
    }
  },
  created: async function () {
    this.orderId = this.$route.query.id
    await this.handleReq()
    this.lnglat = getLngLat(this.record.passPointList)
  },
  mounted () {
    // this.copyTarget = new Clipboard('COPY_TARGET')
    // this.copyTarget.on('success', () => {
    //   this.$toast('复制成功')
    // })
  },
  beforeDestroy () {
    // this.copyTarget.destroy()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss';
.tip{
  margin: .30rem 0 .10rem 0;
  text-align: center;
  @include font (.12rem, $tip-text);
}

.footer-button-group{
  margin: 0rem .15rem .30rem .15rem;
  @include flex (space-between, center);
}
</style>
