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
      <map-view />
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
import { queryByOrderId } from '@/api'
import { Header, Field } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import { getLineText } from '@/utils/getLineText'

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
    // 途径点拼接字符串
    passPointList () {
      return getLineText(this.record.passPointList)
    },
    copyContent () {
      return '【起止地】重庆 - 忠县\n【时间】12月4日 15:00\n【路线】重庆 - 汽车站 - 忠县\n【车型】奥迪Q7\n【余座】1'
    }
  },
  methods: {
    async handleReq () {
      const res = await queryByOrderId()
      this.record = res.data.data
    },
    // 复制内容
    handleCopy () {

    },
    copyToClip () {
      const aux = document.createElement('textarea')
      // aux.setAttribute('value', this.copyContent)
      aux.value = this.copyContent
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$toast.success('复制成功')
    }
  },
  created () {
    this.orderId = this.$route.query.id
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
