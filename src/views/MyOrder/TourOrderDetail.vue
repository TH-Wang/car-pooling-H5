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
      <van-image class="image" width="1.15rem" height=".90rem" />
      <div class="header-detail">
        <div class="header-detail-title">故宫博物馆感受文化之旅</div>
        <div class="header-detail-aid">
          <p>出行时间：</p>
          <p>2020-07-23 至 2020-07-30</p>
        </div>
      </div>
    </div>

    <!-- 预定人信息 -->
    <div class="page-title">
      <p>预定人信息</p>
      <div class="info-field"><div>联系人</div><span>圆脸橙子</span></div>
      <div class="info-field"><div>联系电话</div><span>15720201114</span></div>
      <div class="info-field"><div>出行人数</div><span>3</span></div>
    </div>

    <!-- 订单信息 -->
    <div class="page-title" style="margin-bottom:.30rem">
      <p>订单信息</p>
      <div class="info-field"><div>订单编号</div><span>11909402408045</span></div>
      <div class="info-field"><div>出行时间</div><span>2020-04-07 至 2020-04-23</span></div>
      <div class="info-field"><div>支付方式</div><span>在线支付/微信支付</span></div>
      <div class="info-field"><div>实付金额</div><span>¥2000.00</span></div>
      <div class="info-field"><div>付款时间</div><span>2019-04-07 16:05</span></div>
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
    state: '',
    tips: [
      '温馨提示',
      '1.如您行程改变，请尽可能提前退票，<span style="color:#FFCD00">04月06日 08:00</span>前可<span style="color:#FFCD00">无责退订</span>'
    ]
  }),
  computed: {
    stateMark () {
      return this.state === 'doing'
    }
  },
  mounted () {
    this.state = this.$route.query.state
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
