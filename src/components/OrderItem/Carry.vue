<template>
  <div class="container" @click="handleClick">

    <!-- 顶部主要信息 -->
    <div class="header">
      <!-- 时间 -->
      <div class="time">
        <div class="time-num">{{startTime.slice(-5)}}</div>
        <div class="time-text">{{fromNow}}</div>
      </div>
      <!-- 主要信息 -->
      <div class="header-main">
        <div class="line-text">
          <div class="start">{{addrName.startAddr}}</div>
          <img class="arrow" src="@/assets/icons/line-arrow.png" alt="">
          <div class="end">{{addrName.endAddr}}</div>
        </div>
        <div class="car-info">
          <div class="car-info-item" v-if="record.carDetail">
            <img src="@/assets/icons/order/car.png" alt="">
            <span>{{record.carDetail.carModel}}</span>
          </div>
          <div class="car-info-item">
            <img src="@/assets/icons/order/location.png" alt="">
            <span>{{distance}}km</span>
          </div>
          <div class="car-info-item">
            <img src="@/assets/icons/order/line.png" alt="">
            <span>{{record.similarity || 0}}%</span>
          </div>
        </div>
      </div>
      <!-- 价格 -->
      <div :class="`price-${type}`"><span>￥</span>{{info.cost}}</div>
    </div>

    <!-- 详细内容 -->
    <div class="content">
      <div class="content-item">
        <span>重量</span>{{info.weight}}</div>
      <div class="content-item">
        <span>体积</span>{{info.volume}}
      </div>
      <div class="content-item">
        <span>备注</span>{{info.remark || '无'}}
      </div>
    </div>

    <!-- 用户信息及操作按钮 -->
    <div class="user">
      <!-- 用户信息及点赞 -->
      <social-bar
        :show-like="type === 'customer'"
        :record="{...record.suser, ...record.publish}"
        @like="(type)=>{$emit('like', type)}"
      />
      <!-- 拼单操作 -->
      <div class="book-order">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SocialBar from './SocialBar'

export default {
  components: {
    'social-bar': SocialBar
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    // 订单类型：['customer', 'driver']
    type: {
      type: String,
      default: 'customer'
    }
  },
  computed: {
    // 起止点信息
    addrName () {
      if (this.record.publish) {
        const { startAddr, endAddr } = this.record.publish
        return { startAddr, endAddr }
      } else {
        const { startAddr, endAddr } = this.record.passengerOrder
        return { startAddr, endAddr }
      }
    },
    // 出发时间
    startTime () {
      let startTime
      if (this.record.publish) {
        startTime = this.record.publish.startTime
      } else startTime = this.record.passengerOrder.passengerStartTime
      return startTime
    },
    // 从发布到现在的时间
    fromNow () {
      return moment(this.startTime).fromNow()
    },
    // 距离
    distance () {
      if (this.record.publish) return this.record.publish.distance
      return this.record.distance
    },
    // 信息
    info () {
      const info = this.record.publish ? this.record.publish : this.record.passengerOrder
      const { cost, weight, volume, remark } = info
      return { cost, weight, volume, remark }
    }
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      const _this_ = this
      this.$emit('click', { id: _this_.record.id })
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
    padding: .24rem 0 .20rem 0;
    display: flex;
    align-items: flex-start;

    // 时间
    .time{
      flex-shrink: 0;
      padding: 0 .10rem;
      margin-right: .10rem;
      text-align: right;
      border-right: dashed 1px $normal-text;

      &-num{
        font-size: .24rem;
        color: $main-text;
        font-weight: bold;
      }

      &-text{
        margin-top: .03rem;
        font-size: .12rem;
        color: $tip-text;
      }
    }

    // 主要信息
    &-main{
      flex: 1;

      // 路线
      .line-text{
        display: flex;
        align-items: center;
        color: $main-text;
        font-size: .15rem;
        font-weight: bold;
        text-align: left;

        .arrow{
          width: .18rem;
          margin: 0 .05rem;
        }
      }

      // 辅助信息
      .car-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: .08rem;

        &-item{
          display: flex;
          align-items: center;

          img{
            width: .13rem;
            margin-right: .05rem;
          }

          span{
            font-size: .12rem;
            color: $tip-text;
            text-align: left;
          }
        }
      }
    }

    // 价格
    .price{
      flex-shrink: 0;
      margin-left: .08rem;
      @include font (.24rem, $sub-color, bold);

      &-customer{
        @extend .price;
        color: $main-color;
      }

      &-driver{
        @extend .price;
        color: $aid-green-color;
      }

      // 人民币符号
      span{
        font-size: .2rem;
        font-family: '等线';
        margin-right: -0.02rem;
      }
    }
  }

  // 详细信息
  .content{
    padding-left: .93rem;
    font-size: .12rem;
    color: $sub-text;
    text-align: left;
    border-bottom: dashed 1px $normal-text;

    &-item{
      padding-bottom: .15rem;
    }

    span{
      padding-right: .08rem;
      margin-right: .05rem;
      color: $main-text;
      font-weight: bold;
      position: relative;

      &:after{
        content: '';
        height: .12rem;
        width: 1px;
        background-color: $tip-text;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
