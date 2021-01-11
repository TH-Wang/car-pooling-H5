<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="订单详情"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 顶部信息 -->
    <div class="header">
      <van-image :src="car.img" class="image" width="1.15rem" height=".90rem" />
      <div class="header-detail">
        <div class="header-detail-title">{{car.carName}}</div>
        <div class="header-detail-aid">
          <p>载重：{{car.load}}kg</p>
          <p>长宽高：{{car.widthHeight}}m</p>
          <p>容积：{{car.volume}}m³</p>
        </div>
      </div>
    </div>

    <!-- 预定人信息 -->
    <div class="page-title">
      <p>预定人信息</p>
      <div class="info-field"><div>联系人</div><span>{{order.userName}}</span></div>
      <div class="info-field"><div>联系电话</div><span>{{order.phone}}</span></div>
      <div class="info-field">
        <div>出行人数</div>
        <span>{{order.startTime}} 至 {{order.endTime}}</span>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="page-title" style="margin-bottom:.30rem">
      <p>订单信息</p>
      <div class="info-field"><div>订单编号</div><span>{{order.orderNo}}</span></div>
      <div class="info-field">
        <div>支付方式</div>
        <span>在线支付/{{payType[order.payType]}}</span>
      </div>
      <div class="info-field"><div>实付金额</div><span>¥{{order.price}}</span></div>
      <div class="info-field"><div>付款时间</div><span>{{order.payTime}}</span></div>
    </div>

    <!-- 按钮 -->
    <main-button
      v-if="stateMark"
      center
      color="gray"
      type="hollow"
      style="margin-top:.36rem"
    >退票</main-button>

    <!-- 温馨提示 -->
    <order-info-tips v-if="stateMark" :tips="tips" />
  </div>
</template>

<script>
import { getTourCarOrderDetail } from '@/api'
import { Image } from 'vant'
import { Tips } from '@/components/OrderInfo'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-image': Image,
    'order-info-tips': Tips,
    'main-button': MainButton
  },
  data: () => ({
    id: null,
    record: {},
    car: {},
    order: {},
    tips: [
      '温馨提示',
      '1.如您行程改变，请尽可能提前退票，<span style="color:#FFCD00">04月06日 08:00</span>前可<span style="color:#FFCD00">无责退订</span>'
    ],
    payType: { 1: '支付宝', 2: '微信' }
  }),
  computed: {
    stateMark () {
      return this.order.orderStatus === 1
    }
  },
  methods: {
    async handleReq () {
      const res = await getTourCarOrderDetail(this.id)
      const { charterCar, carOrder } = res.data.data
      this.car = charterCar
      this.order = carOrder
    }
  },
  created () {
    this.id = this.$route.query.id
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: .90rem;
  margin: .28rem .15rem 0 .15rem;
  @include flex ($align: center);

  .image{
    flex-shrink: 0;
  }

  &-detail{
    flex: 1;
    height: .90rem;
    margin-left: .11rem;
    @include flex (space-between, flex-start, column);

    &-title{
      @include font (.16rem, $main-text, bold);
    }

    &-aid{
      line-height: 17px;
      @include font (.12rem, $tip-text)
    }
  }
}

.page-title{
  margin: .24rem .15rem .20rem .15rem;

  p{
    @include font (.18rem, $main-text, bold);
  }

  .info-field{
    margin: .18rem 0;
    @include flex ($align: center);

    div{
      flex-shrink: 0;
      width: .50rem;
      margin-right: .20rem;
      @include textJustify;
      @include font (.12rem, $tip-text);
    }

    span{
      flex: 1;
      @include font (.14rem, $main-text);
    }
  }
}
</style>
