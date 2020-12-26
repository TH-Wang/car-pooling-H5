<template>
  <div class="container" @click="$emit('click')">

    <!-- 顶部主要信息 -->
    <div class="header">
      <!-- 主要信息 -->
      <div class="header-main">
        <!-- 时间段 -->
        <div class="time-num">
          <span>{{getHourMinute(startTime)}}</span>
          <span v-if="returnTime">
            - {{getHourMinute(returnTime)}}
          </span>
            / {{returnTime ? '出发·返程' : '出发时间'}}
        </div>
        <!-- 价格 -->
        <div :class="`price-${color}`">
          <span>￥</span>{{cost}}
        </div>
      </div>
      <div class="car-info">
        <div v-if="showCar" class="car-info-item">
          <img src="@/assets/icons/order/car.png" alt="">
          <span>{{record.carDetail ? record.carDetail.carModel : ''}}</span>
        </div>
        <div class="car-info-item">
          <img src="@/assets/icons/order/location.png" alt="">
          <span>{{record.distance || record.publish.distance}}km</span>
        </div>
        <div class="car-info-item">
          <img src="@/assets/icons/order/line.png" alt="">
          <span>{{record.similarity || 0}}%</span>
        </div>
      </div>
    </div>

    <!-- 详细信息 -->
    <div class="content">
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
      <div class="detail" v-if="showLineDetail">
        <span>途径点</span> | {{passPointList}}
      </div>
      <!-- 备注 -->
      <div class="detail">
        <span>备注</span> | {{remark}}
      </div>
    </div>

    <!-- 用户信息及操作按钮 -->
    <div class="user">
      <!-- 用户信息及点赞 -->
      <social-bar
        :show-like="color === 'yellow'"
        :record="userInfo"
        @like="(type)=>{$emit('like', type)}"
      />
      <!-- 拼单操作 -->
      <div class="book-order">
        <div class="seat">
          {{showCar ? '余座' : '人数'}}
          <span :class="`num-${color}`">{{seatNum}}</span>
        </div>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SocialBar from './SocialBar'
import { getPointText } from '@/utils/getLineText'

export default {
  components: {
    'social-bar': SocialBar
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    // 订单类型：['yellow', 'green']
    color: {
      type: String,
      default: 'yellow'
    },
    showCar: {
      type: Boolean,
      default: false
    },
    showLineDetail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 途径点拼接字符串
    passPointList () {
      return getPointText(this.record.passPointList)
    },
    // 起止点名称
    addrName () {
      if (this.record.publish) {
        const { startAddr, endAddr } = this.record.publish
        return { startAddr, endAddr }
      } else {
        const { startAddr, endAddr } = this.record.passengerOrder
        return { startAddr, endAddr }
      }
    },
    // 费用
    cost () {
      if (this.record.publish) return this.record.publish.cost
      else return this.record.passengerOrder.cost
    },
    // 备注
    remark () {
      if (this.record.publish) return this.record.publish.remark || '无'
      else return this.record.passengerOrder.remark || '无'
    },
    // 出发时间
    startTime () {
      if (this.record.publish) return this.record.publish.startTime
      else return this.record.passengerOrder.passengerStartTime
    },
    // 返程时间
    returnTime () {
      if (this.record.publish) return this.record.publish.returnTime
      else return this.record.passengerOrder.returnTime
    },
    // 余座/人数
    seatNum () {
      if (this.record.publish) return this.record.publish.num || this.record.publish.remainingSeat
      else return this.record.passengerOrder.orderNum
    },
    // 用户信息
    userInfo () {
      if (this.record.publish) return { ...this.record.suser, ...this.record.publish }
      else return {}
    }
  },
  methods: {
    getHourMinute (time) {
      if (!time) return '-- --'
      return moment(time).format('HH:mm')
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
    padding: .20rem 0 .10rem 0;
    @include font (.12rem, $tip-text);

    // 订单信息
    .header-main{
      flex: 1;
      @include flex (space-between, baseline);

      .time-num{
        @include font (.12rem, $tip-text);

        span{
          @include font (.24rem, $main-text, bold);
          margin-right: .05rem;
        }
      }

      // 车价
      .price{
        flex-shrink: 0;
        @include font (.24rem, $main-color, bold);

        &-yellow{
          @extend .price;
          color: $main-color;
        }

        &-green{
          @extend .price;
          color: $aid-green-color;
        }

        span{
          font-size: .2rem;
          font-family: '等线';
          margin-right: -0.02rem;
        }
      }
    }

    .car-info{
      margin-top: 0.05rem;
      @include flex (flex-start, baseline);

      &-item{
        display: flex;
        align-items: center;
        margin-right: .3rem;

        img{
          width: .12rem;
        }

        span{
          margin-left: .03rem;
        }
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
