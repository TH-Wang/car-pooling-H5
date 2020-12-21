<template>
  <div class="header">
    <!-- 提示信息、路线、订单状态 -->
    <div class="tip-box">
      <span class="tip-text">出发地点 - 到达地点</span>

      <!-- 价格 -->
      <div v-if="contentType === 'price'" class="price">
        <span>{{record.cost}}</span>元/座
      </div>
      <!-- 订单状态 -->
      <img
        v-else-if="contentType === 'state'"
        class="state"
        :src="stateImage()" alt=""
      />
      <!-- 余座 -->
      <div v-else-if="contentType === 'seat'" class="seat">
        <img src="@/assets/icons/order/seat.png" alt="">
        余座 <span>{{seatNum}}</span>
      </div>
    </div>
    <!-- 起止路线 -->
    <start-end :start="record.startAddr" :end="record.endAddr" narrow />
    <!-- 时间余座 -->
    <div v-if="showTimeSeat" class="time-seat">
      <time-seat :time="record.startTime" :seat="seatNum" :type="record.type" />
      <div v-if="showShare" class="share-button" @click="$emit('share')">出行详情</div>
    </div>
  </div>
</template>

<script>
import { StartEnd, TimeSeat } from '@/components/Common'

export default {
  components: {
    'start-end': StartEnd,
    'time-seat': TimeSeat
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    // 右上方的显示内容: ['price', 'state', 'seat']
    contentType: {
      type: String,
      default: 'price'
    },
    // 是否展示时间余座
    showTimeSeat: {
      type: Boolean,
      default: false
    },
    // 是否展示跳转分享页面的按钮
    showShare: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    seatNum () {
      const num = this.record.seatNum
      if (!num) return ''
      else return num >= 0 ? num : 0
    }
  },
  methods: {
    stateImage () {
      let imageName = 'doing'
      if (this.record.state > 1) {
        imageName = 'finish'
      }
      return require(`@/assets/icons/order-state/${imageName}.png`)
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  padding: .20rem .15rem;
  box-sizing: border-box;

  // 提示信息、价格、订单状态
  .tip-box{
    width: 100%;
    position: relative;
    margin-bottom: .15rem;
    text-align: left;

    .tip-text{
      letter-spacing: 0.8px;
      @include font (.14rem, $sub-text)
    }

    // 定位
    .absolute{
      position: absolute;
      right: 0;
      top: 0;
    }

    // 车价
    .price{
      @extend .absolute;
      @include font (.12rem, $tip-text);
      // letter-spacing: 0.8px;

      span{
        @include font (.24rem, $main-color);
        margin-right: 3px
      }

      span:before{
        content: '￥';
        @include font(.20rem, $main-color);
        font-family: '等线';
        display: inline-block;
        transform: translateX(5px);
      }
    }

    // 订单状态
    .state{
      @extend .absolute;
      width: .6rem;
      height: .6rem;
      z-index: 5;
    }

    // 余座
    .seat{
      @extend .absolute;
      @include flex ($align: center);
      @include font (.12rem, $tip-text);

      img{
        width: 0.11rem;
        height: 0.11rem;
        margin-right: .03rem;
      }

      span{
        margin-left: .02rem;
        @include font (.13rem, $main-color, bold);
      }
    }
  }

  // 时间余座
  .time-seat{
    padding: .18rem 0 .16rem 0;
    border-bottom: solid 1px $normal-text;
    @include flex (space-between, center);
  }

  // 出行详情按钮
  .share-button {
    width: .8rem;
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    @include font (.14rem, $main-color, bold);
    border: solid 1px $main-color;
    border-radius: 4px;
  }
}
</style>
