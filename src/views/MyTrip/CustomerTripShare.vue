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
    }" content-type="none" />

    <!-- 详情卡片 -->
    <div class="content-card">

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="乘客" :content="record.userName" />
      <order-info-field icon-type="seat" label="人数" :content="record.orderNum" text-color="yellow" />
      <order-info-field icon-type="time" label="出发时间" :content="startTime" />
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

    <template v-if="showQuick">
      <!-- 快捷路线 -->
      <quick-line
        :dataSource="quickList"
        :query="query"
        @retry="handleRetryQuick"
      />
      <div style="height:.3rem"></div>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import { isEmpty } from 'lodash'
import { getPassengerPublishDetail, getCommonRoute, getShortLinkUrl } from '@/api'
import { Header, Field } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import QuickLine from '@/components/QuickLine'
import { shareip } from '@/configs/sharePort'
import copyToClip from '@/utils/copyToClip'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'map-view': MapView,
    'main-button': MainButton,
    'quick-line': QuickLine
  },
  data: () => ({
    showQuick: false,
    record: {},
    query: {},
    quickList: []
  }),
  computed: {
    startTime () {
      return this.record.passengerStartTime
        ? moment(this.record.passengerStartTime).format('MM月DD日 HH:mm')
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
    }
  },
  methods: {
    // 查询发布信息
    async handleReq () {
      const res = await getPassengerPublishDetail(this.orderId)
      this.record = res.data.data
      const { publishType } = res.data.data
      this.query = { publishType, workType: 'carpool', orderType: 1 }
    },
    // 查询相似快捷路线
    async handleReqQuick () {
      const { publishType } = this.record
      const start = this.record.passPointList.find(i => i.type === 1)
      let addrName = null
      switch (publishType) {
        case 1: addrName = start.township; break
        case 2: addrName = start.cityname; break
        case 3: addrName = start.township; break
        default: addrName = start.cityname
      }
      const res = await getCommonRoute({
        startPage: 1,
        pageSize: 2,
        orderType: 1,
        publishType,
        addrName
      })
      this.quickList = res.data.data.list
    },
    // 刷新快捷路线
    async handleRetryQuick () {
      this.$toast.loading({ message: '加载中', duration: 10000 })
      await this.handleReqQuick()
      this.$toast.clear()
    },
    async copyToClip (type) {
      const content = await this.getCopyContent(type)
      copyToClip(content)
    },
    // 复制内容
    async getCopyContent (type) {
      const { startTime, remark } = this.record
      // 时间
      const formatTime = moment(startTime).format('MM月DD日 HH:mm')
      // 预约
      const link = shareip + '/common/triplink/customer?id=' + this.orderId
      const url = await getShortLinkUrl(link)
      return '【拼车】人找车\n' +
        '【路线】' + this.addrName.startAddr + '-' + this.addrName.endAddr + '\n' +
        '【时间】' + formatTime + '\n' +
        '【预约】' + url + '\n' +
        '【备注】' + (remark || '无')
    }
  },
  created: async function () {
    this.orderId = this.$route.query.id
    await this.handleReq()
    if (this.$route.query.quick === '1') {
      this.showQuick = true
      await this.handleReqQuick()
    }
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
