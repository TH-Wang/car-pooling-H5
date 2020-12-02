<template>
  <div class="container" @click="handleClick">

    <!-- 顶部主要信息 -->
    <div class="header">
      <!-- 时间 -->
      <div class="time">
        <div class="time-num">{{hourMinute}}</div>
        <div class="time-text">{{fromNow}}</div>
      </div>
      <!-- 主要信息 -->
      <div class="header-main">
        <div class="line-text">
          <div class="start">{{record.startAddr}}</div>
          <img class="arrow" src="@/assets/icons/line-arrow.png" alt="">
          <div class="end">{{record.endAddr}}</div>
        </div>
        <div class="car-info">
          <div class="car-info-item">
            <img src="@/assets/icons/order/car.png" alt="">
            <span>{{record.vehicleType}}</span>
          </div>
          <div class="car-info-item">
            <img src="@/assets/icons/order/location.png" alt="">
            <span>2.5km</span>
          </div>
          <div class="car-info-item">
            <img src="@/assets/icons/order/line.png" alt="">
            <span>95%</span>
          </div>
        </div>
      </div>
      <!-- 价格 -->
      <div class="price"><span>￥</span>{{record.cost}}</div>
    </div>

    <!-- 详细内容 -->
    <div class="content">
      <div class="content-item">
        <span>途径点</span>{{passPointLis}}
      </div>
      <div v-if="confirmShow('remark')" class="content-item">
        <span>备注</span>{{record.remark}}
      </div>
    </div>

    <!-- 用户信息及操作按钮 -->
    <div class="user">
      <!-- 用户信息 -->
      <div class="user-info">
        <!-- 头像 -->
        <div class="avatar">
          <van-image :src="record.headimg" width="100%" height="100%" fit="cover" round />
        </div>
        <div class="name ellipsis">{{record.userName}}</div>
        <div class="social">
          <img src="@/assets/icons/order/like.png" alt="">
          <span>1920</span>
        </div>
        <div class="social">
          <img src="@/assets/icons/order/dislike.png" alt="">
          <span>10</span>
        </div>
      </div>
      <!-- 拼单操作 -->
      <div class="book-order">
        <div class="seat"><span>余座</span><span class="num-yellow">{{record.seatNum}}</span></div>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import moment from 'moment'
import { Image } from 'vant'

export default {
  components: {
    'van-image': Image
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 途径点拼接字符串
    passPointLis () {
      return this.record.passPointLis.map(i => i.pointName).join('-')
    },
    // 时间分钟
    hourMinute () {
      return this.record.startTime.slice(-5)
    },
    // 从发布到现在的时间
    fromNow () {
      return moment(this.record.startTime).fromNow()
    }
  },
  methods: {
    // 判断是否显示
    confirmShow (key) {
      return !isEmpty(this.record[key])
    },
    // 处理点击
    handleClick (e) {
      e.preventDefault()
      this.$emit('click', this.record)
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

  &:active{
    background-color: #f9f9f9;
  }

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
        font-size: .16rem;
        font-weight: bold;
        text-align: left;

        .arrow{
          width: .18rem;
          margin: 0 .10rem;
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
      font-size: .24rem;
      color: $sub-color;
      font-weight: bold;
      // font-family: PingFangSC-Light, sans-serif;
      margin-left: .20rem;

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
