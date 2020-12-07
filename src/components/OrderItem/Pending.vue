<template>
  <div class="container">

    <!-- 顶部主要信息 -->
    <div class="header">
      <!-- 主要信息 -->
      <div class="header-main">
        <div class="time-num">{{time}}</div>
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
      <div class="price"><span>￥</span>{{record.cost}}</div>
    </div>

    <!-- 详细信息 -->
    <div class="content">
      <!-- 路线信息 -->
      <div class="line-info">
        <span class="start">起</span>
        <span>{{startAddr || record.startAddr}}</span>
      </div>
      <div class="line-info gap">
        <span class="end">终</span>
        <span>{{endAddr || record.endAddr}}</span>
      </div>
      <!-- 途径点 -->
      <div v-if="hasWay" class="detail">
        <span>途径点</span> | {{passPointLis}}
      </div>
      <!-- 备注 -->
      <div class="detail">
        <span>备注</span> | {{record.remark || '无'}}
      </div>
    </div>

    <!-- 用户信息及操作按钮 -->
    <div class="user">
      <!-- 用户信息及点赞 -->
      <social-bar :record="record" />
      <!-- 拼单操作 -->
      <div class="book-order">
        <div class="seat"><span>人数</span>
        <span :class="`num-${color}`">{{record.seatNum}}</span></div>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SocialBar from './SocialBar'
import { getLineText } from '@/utils/getLineText'

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
    }
  },
  computed: {
    // 起止点
    startAddr () {
      const ppl = this.record.passPointList
      const startPoint = ppl ? ppl.find(i => i.type === 1) : null
      return startPoint ? startPoint.pointName : ''
    },
    // 目的地
    endAddr () {
      const ppl = this.record.passPointList
      const endPoint = ppl ? ppl.find(i => i.type === 3) : null
      return endPoint ? endPoint.pointName : ''
    },
    // 时间（小时分钟）
    time () {
      return moment(this.record.startTime).format('HH:mm')
    },
    // 距离现在多久
    fromNow () {
      return moment(this.record.startTime).fromNow()
    },
    // 途径点拼接字符串
    passPointList () {
      return getLineText(this.record.passPointList)
    },
    // 距离
    distance () {
      return this.record.distance ? this.record.distance.toFixed(2) : ''
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
  }
}
</style>
