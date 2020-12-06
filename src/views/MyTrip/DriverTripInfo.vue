<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="行程详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
    />

    <!-- 顶部 -->
    <order-info-header
      :record="{
        startAddr: startAddrName,
        endAddr: endAddrName,
        state: record.orderState,
        startTime: startTime,
        seatNum: record.remainSeat}"
      content-type="state"
      show-time-seat
    />

    <!-- 乘客信息 -->
    <div class="page-title">
      <p>乘客信息</p>

      <div
        class="info"
        v-for="(item, index) in record.myPassengerDetailVoList"
        :key="item.pprId"
        @click="$router.push({path: '/common/my/custinfo', query: {state: $route.query.state}})"
      >
        <div class="info-index">{{index+1}}</div>
        <div v-if="stateMark" class="info-phone">
          <van-icon name="phone" size=".14rem" color="#FFAE20" />
          {{item.mobilePhone}}
        </div>
        <div class="info-field" :style="`${stateMark ? 'width:2.25rem' : ''}`">
          <span class="info-field-label">乘客</span>
          <span class="info-field-text">{{item.userName}}</span>
        </div>
        <div class="info-field">
          <span class="info-field-label">出发地点</span>
          <span class="info-field-text">{{item.startAddr}}</span>
        </div>
        <div class="info-field">
          <span class="info-field-label">到达地点</span>
          <span class="info-field-text">{{item.endAddr}}</span>
        </div>
        <div class="info-field">
          <span class="info-field-label">出发时间</span>
          <span class="info-field-text">{{item.startTime}}</span>
        </div>
      </div>
    </div>

    <!-- 地图路线 -->
    <div class="page-title" style="margin-top:.20rem">
      <p>地图路线</p>
      <map-view style="margin-top:.15rem" />
    </div>

    <!-- 温馨提示 -->
    <order-info-tips :tips="tips" />
  </div>
</template>

<script>
import moment from 'moment'
import { selectByPassengerDriverDetail } from '@/api'
import { Header, Tips } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import { getLineText } from '@/utils/getLineText'

export default {
  components: {
    'order-info-header': Header,
    'order-info-tips': Tips,
    'map-view': MapView
  },
  data: () => ({
    orderId: null,
    record: {},
    tips: [
      '温馨提示',
      '请在到达目的地后，向乘客<span style="color:#FFCD00">收取分摊费用</span>，平台不代收费用。'
    ]
  }),
  computed: {
    stateMark () {
      return this.dataSource.state === 'doing'
    },
    startAddrName () {
      if (this.record.pstartAddr) return this.record.pstartAddr
      if (this.record.passPointList) return this.record.passPointList[0].pointName
      return ''
    },
    endAddrName () {
      if (this.record.pendAddr) return this.record.pendAddr
      if (this.record.passPointList) return this.record.passPointList.find(i => i.type === 3).pointName
      return ''
    },
    startTime () {
      if (!this.record.startTime) return ''
      return moment(this.record.startTime).format('YYYY-MM-DD HH:mm')
    },
    // 途径点拼接字符串
    passPointList () {
      return getLineText(this.record.passPointList)
    }
  },
  methods: {
    async handleReq () {
      const res = await selectByPassengerDriverDetail(this.orderId)
      this.record = res.data.data[0]
    }
  },
  mounted: async function () {
    this.orderId = this.$route.query.id
    await this.handleReq()
    console.log(this.startAddrName)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss';

.page-title{
  margin: 0 .15rem;
  @include font (.18rem, $main-text, bold);

  // p{margin-bottom: .10rem;}
}

// 乘客信息
.info{
  padding: .10rem 0 .15rem 0;
  border-bottom: solid 1px $normal-text;
  position: relative;

  &-field{
    width: 100%;
    box-sizing: border-box;
    padding-left: .40rem;
    margin: .10rem 0;
    @include font (.14rem, $main-text);
    @include flex ();

    &-label{
      flex-shrink: 0;
      width: .50rem;
      margin-right: .20rem;
      @include textJustify;
      @include font (.12rem, $tip-text);
      transform: translateY(1px);
    }

    &-text{
      flex: 1;
    }
  }

  &-index{
    width: .30rem;
    height: 0.3rem;
    border-radius: 50%;
    background-color: $linecard-color;
    @include font (.14rem, $tip-text);
    @include flex (center, center);
    position: absolute;
    top: .16rem;
    left: 0;
  }

  &-phone{
    @include font (.16rem, $sub-color);
    position: absolute;
    right: 0;
    top: .20rem;
  }
}
</style>
