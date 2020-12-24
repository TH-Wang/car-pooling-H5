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
      startAddr: addrName.startAddr,
      endAddr: addrName.endAddr,
      cost: cost
    }" content-type="price" />

    <!-- 详情卡片 -->
    <div class="content-card">

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" :content="record.userName" />
      <order-info-field icon-type="car" label="车型" :content="record.vehicleTypeName" />
      <order-info-field icon-type="seat" label="余座" :content="record.seatNum" text-color="yellow" />
      <order-info-field icon-type="time" label="出发时间" :content="startTime" />
      <order-info-field icon-type="address" label="途径点" :content="passPointList" />
      <order-info-field icon-type="remark" label="备注" :content="record.remark || '无'" />

      <!-- 地图 -->
      <map-view :info="record.passPointList" />
    </div>

    <div class="tip">可复制粘贴到任意QQ、微信等拼车群</div>

    <!-- 底部按钮组 -->
    <div class="footer-button-group">
      <main-button width="1.2rem" @click="copyToClip('wechat')">复制到微信</main-button>
      <main-button
        width="2.1rem"
        type="gradient"
        @click="copyToClip('other')"
      >复制到其他</main-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
// import Clipboard from 'clipboard'
import { getPublishDetail } from '@/api'
import { isEmpty } from 'lodash'
import { Header, Field } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import { getPointText } from '@/utils/getLineText'
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
    // copyContent: '',
    copyTarget: null
  }),
  computed: {
    startTime () {
      return this.record.startTime
        ? moment(this.record.startTime).format('MM月DD日 HH:mm')
        : ''
    },
    // 起止点名称
    addrName () {
      if (isEmpty(this.record)) return ''
      const passPointList = this.record.passPointList
      return {
        startAddr: passPointList.find(i => i.type === 1).pointName,
        endAddr: passPointList.find(i => i.type === 3).pointName
      }
    },
    // A费
    cost () {
      if (!this.record) return ''
      return this.record.cost
    },
    // 途径点拼接字符串
    passPointList () {
      return getPointText(this.record.passPointList)
    }
  },
  methods: {
    async handleReq () {
      const res = await getPublishDetail(this.orderId)
      this.record = res.data.data
    },
    copyToClip (type) {
      const aux = document.createElement('textarea')
      aux.value = this.getCopyContent(type)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$toast.success('复制成功')
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
    await this.handleReq()
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
