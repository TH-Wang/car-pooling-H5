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
    <order-info-header :record="{
      startAddr: addrName.startAddr,
      endAddr: addrName.endAddr,
      cost: record.cost
    }" content-type="price" />

    <!-- 详情卡片 -->
    <div class="content-card">

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" :content="record.userName" />
      <order-info-field icon-type="car" label="车型" :content="record.vehicleTypeName" />
      <order-info-field icon-type="seat" label="余座" :content="record.remainingSeat || record.seatNum" text-color="yellow" />
      <order-info-field icon-type="time" label="出发时间" :content="startTime" />
      <order-info-field icon-type="address" label="途径点" :content="passPointList" />
      <order-info-field icon-type="remark" label="备注" :content="record.remark" />

      <!-- 地图 -->
      <map-view :info="record.passPointList" />
    </div>

    <!-- 底部按钮组 -->
    <div class="footer-button-group">
      <main-button
        width="1.58rem"
        color="gray"
        type="hollow"
        @click="copyToClip"
      >转发分享</main-button>
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
import { isEmpty } from 'lodash'
import { Header, Field } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import { getPointText } from '@/utils/getLineText'
import getLngLat from '@/utils/getLngLat'
import { shareip } from '@/configs/sharePort'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'map-view': MapView,
    'main-button': MainButton
  },
  data: () => ({
    orderId: null,
    record: {},
    headerRecord: {},
    lnglat: null
  }),
  computed: {
    // 起止点名称
    addrName () {
      if (isEmpty(this.record)) return ''
      const passPointList = this.record.passPointList
      return {
        startAddr: passPointList.find(i => i.type === 1).pointName,
        endAddr: passPointList.find(i => i.type === 3).pointName
      }
    },
    startTime () {
      return moment(this.record.startTime).format('MM月DD日 HH:mm')
    },
    // 途径点拼接字符串
    passPointList () {
      return getPointText(this.record.passPointList)
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
      this.$router.push({ path: '/common/reserve', query: { id: this.record.pprId } })
    },
    // 复制到剪贴板
    copyToClip (type) {
      const aux = document.createElement('textarea')
      aux.value = this.getCopyContent(type)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$dialog.alert({
        title: '复制成功',
        message: '快到QQ、微信等群里分享该信息吧~'
      })
    },
    // 复制内容
    getCopyContent (type) {
      const { startTime, passPointList, remark } = this.record
      // 时间
      const formatTime = moment(startTime).format('MM月DD日 HH:mm')
      // 途径
      const passList = passPointList.filter(i => i.type === 2).map(i => i.pointName).join('-')
      // 预约
      const link = shareip + '/common/triplink/driver?id=' + this.orderId
      // const reserve = type === 'wechat' ? '<a href="' + link + '">查看手机号</a>' : link
      return '【拼车】车找人\n' +
        '【路线】' + this.addrName.startAddr + '-' + this.addrName.endAddr + '\n' +
        '【途径】' + (passList || '无') + '\n' +
        '【时间】' + formatTime + '\n' +
        '【预约】' + link + '\n' +
        '【备注】' + (remark || '无')
    }
  },
  created: async function () {
    this.orderId = this.$route.query.id
    await this.handleRequest()
    this.lnglat = getLngLat(this.record.passPointList)
  },
  activated: async function () {
    this.orderId = this.$route.query.id
    await this.handleRequest()
    this.lnglat = getLngLat(this.record.passPointList)
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
