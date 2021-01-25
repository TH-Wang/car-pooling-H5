<template>
  <div class="container">

    <!-- 顶部主要信息 -->
    <div class="header">
      <!-- 主要信息 -->
      <div class="header-main">
        <div class="time-num">{{startTime.slice(-5)}}</div>
        <div class="time-text">/ {{fromNow}}</div>
        <div class="car-info-item">
          <img src="@/assets/icons/order/location.png" alt="">
          <span>{{distance}}km</span>
        </div>
        <div class="car-info-item">
          <img src="@/assets/icons/order/line.png" alt="">
          <span>{{record.similarity || 0}}%</span>
        </div>
      </div>
      <!-- 价格 -->
      <div class="price"><span>￥</span>{{info.cost}}</div>
    </div>

    <!-- 详细信息 -->
    <div class="content">
      <div :style="{width: contentWidth}">
        <!-- 路线信息 -->
        <div class="line-info">
          <span class="start">起</span>
          <span>{{addrName.startAddr}}</span>
        </div>
        <div class="line-info gap">
          <span class="end">终</span>
          <span>{{addrName.endAddr}}</span>
        </div>
        <!-- 途径点 -->
        <div v-if="hasWay" class="detail">
          <span>途径点</span> | {{passPointLis}}
        </div>
        <!-- 备注 -->
        <div class="detail">
          <span>备注</span> | {{info.remark || '无'}}
        </div>
      </div>
      <!-- 拨打电话按钮 -->
      <div class="call-button" v-if="showCallButton" @click="handleCallPhone">
        <van-icon name="phone" color="#fff" size=".20rem" />
      </div>
    </div>

    <!-- 用户信息及操作按钮 -->
    <div class="user">
      <!-- 用户信息及点赞 -->
      <social-bar :show-like="false" :record="record.suser || record" />
      <!-- 拼单操作 -->
      <div class="book-order">
        <div class="seat"><span>人数</span>
        <span :class="`num-${color}`">
          {{info.remainingSeat || info.orderNum}}
        </span></div>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SocialBar from './SocialBar'
import { getPointText } from '@/utils/getLineText'
import callPhone from '@/utils/callPhone'

export default {
  components: {
    'social-bar': SocialBar
  },
  props: {
    record: {
      type: Object,
      default: () => ({
        passPointList: []
      })
    },
    hasWay: {
      type: Boolean,
      drfault: false
    },
    color: {
      type: String,
      default: 'green'
    },
    showCall: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 地址名称
    addrName () {
      if (this.record.passPointList) {
        const startAddr = this.record.passPointList.find(i => i.type === 1)
        const endAddr = this.record.passPointList.find(i => i.type === 3)
        return { startAddr, endAddr }
      } else {
        if (this.record.publish) {
          const { startAddr, endAddr } = this.record.publish
          return { startAddr, endAddr }
        } else if (this.record.passengerOrder) {
          const { startAddr, endAddr } = this.record.passengerOrder
          return { startAddr, endAddr }
        } else {
          const { startAddr, endAddr } = this.record
          return { startAddr, endAddr }
        }
      }
    },
    // 出发时间
    startTime () {
      if (this.record.publish) return this.record.publish.startTime
      else if (this.record.passengerOrder) return this.record.passengerOrder.passengerStartTime
      else return this.record.startTime || this.record.passengerStartTime
    },
    // 距离现在多久
    fromNow () {
      return moment(this.startTime).fromNow()
    },
    // 途径点拼接字符串
    passPointList () {
      return getPointText(this.record.passPointList)
    },
    info () {
      let info = null
      if (this.record.publish) info = this.record.publish
      else if (this.record.passengerOrder) info = this.record.passengerOrder
      else info = this.record
      return info
    },
    // 距离
    distance () {
      return this.record.distance ? this.record.distance.toFixed(2) : ''
    },
    // 是否显示拨号按钮
    showCallButton () {
      const status = this.record.status
      // return this.showCall && (status === 1 || status === 2)
      return this.showCall && ([1, 2, 5, 6].indexOf(status) !== -1)
    },
    // 信息容器宽度
    contentWidth () {
      return this.showCallButton ? 'calc(100% - .5rem)' : '100%'
    }
  },
  methods: {
    handleCallPhone () {
      callPhone(this.record.telPhone)
    }
  }
}
</script>

<style lang="scss" scoped>
// 使用订单底部用户栏样式
@import '@/assets/scss/user.scss';

.container{
  padding: 0 .15rem;
  margin-bottom: .10rem;
  background-color: #fff;

  // 顶部主要信息
  .header{
    padding: .20rem 0 .05rem 0;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: .12rem;
    color: $tip-text;

    // 订单信息
    .header-main{
      flex: 1;
      display: flex;
      align-items: baseline;
      justify-content: flex-start;

      .time-num{
        font-size: .24rem;
        color: $main-text;
        font-weight: bold;
        margin-right: .05rem;
      }

      .car-info-item{
        display: flex;
        align-items: baseline;
        margin-left: .15rem;

        img{
          width: .12rem;
        }

        span{
          margin-left: .03rem;
        }
      }
    }

    // 车价
    .price{
      flex-shrink: 0;
      font-size: .24rem;
      font-weight: bold;
      color: $aid-green-color;

      span{
        font-size: .2rem;
        font-family: '等线';
        margin-right: -0.02rem;
      }
    }
  }

  // 详细信息
  .content{
    padding: .10rem 0;
    border-top: dashed 1px $normal-text;
    border-bottom: dashed 1px $normal-text;
    position: relative;

    // 路线信息
    .line-info{
      font-size: .16rem;
      color: $main-text;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      // 起止点文字图标
      .text-icon{
        margin-right: .05rem;
        width: .17rem;
        height: .17rem;
        font-size: .10rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: '等线';
        font-weight: 100;
        border-radius: 50%;
      }

      .start{
        @extend .text-icon;
        background-color: $main-color;
      }

      .end{
        @extend .text-icon;
        background-color: $aid-blue-color;
      }
    }

    // 间隔
    .gap{
      margin-top: .03rem;
    }

    // 途径点和备注
    .detail{
      font-size: .12rem;
      line-height: .22rem;
      color: $sub-text;
      margin-top: .12rem;
      text-align: left;
      letter-spacing: 0.8px;

      span{
        color: $main-text;
        font-weight: bold;
      }
    }

    // 拨号按钮
    .call-button{
      width: .4rem;
      height: .4rem;
      border-radius: 50%;
      @include flex (center, center);
      // background-color: $main-color;
      // box-shadow: 0px 4px 10px -2px rgba(255, 174, 32, 0.5);
      background: linear-gradient(135deg, #36E5AD 0%, #0AD593 100%);
      box-shadow: 0px 6px 10px -4px #05DD98;
      position: absolute;
      bottom: .08rem;
      right: 0;
    }
  }
}
</style>
