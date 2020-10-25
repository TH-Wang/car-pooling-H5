<template>
  <div style="padding-bottom: .50rem">
    <!-- 导航栏 -->
    <van-nav-bar
      title="确认订单"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 顶部信息 -->
    <div class="header">
      <van-image width="1.15rem" height=".90rem" />
      <div class="header-info">
        <div class="header-title">故宫博物馆感受文化之旅</div>
        <!-- 旅游信息 -->
        <div v-if="mode === 'tour'" class="header-detail">
          <p>出行时间：</p>
          <p>2020-07-23 至 2020-07-30</p>
        </div>
        <!-- 包车信息 -->
        <div v-else class="header-detail">
          <p>载重：600kg</p>
          <p>长宽高：1.7*1.2*1m</p>
          <p>容积：2.5m³</p>
        </div>
      </div>
    </div>

    <custom-form>
    <div class="main-title">{{mode === 'tour' ? '预定人信息' : '包车人信息'}}</div>
    <custom-field
      name="name"
      label="联系人"
      placeholder="请输入订单联系人姓名"
    />
    <custom-field
      name="phone"
      label="联系电话"
      placeholder="请输入订单联系人电话"
      type="tel"
      :max-length="11"
    />
    <custom-field
      v-if="mode === 'tour'"
      name="people"
      label="出行人数"
      placeholder="请输入此次出行人数"
      type="tel"
    />
    <custom-timer
      v-else
      name="time"
      label="使用时间"
      placeholder="请选择使用时间"
      :default-time="new Date()"
    />
    </custom-form>

    <!-- 支付方式列表 -->
    <div class="main-title">支付方式</div>
    <van-radio-group class="radio-container" v-model="payType">
      <div
        class="radio-item"
        v-for="opt in payOptions"
        :key="opt.id"
        @click="payType = opt.id"
      >
        <img :src="opt.icon" alt="" />
        <span class="radio-item-label">{{opt.text}}</span>
        <van-radio :name="opt.id" checked-color="#0AD593" icon-size=".20rem" />
      </div>
    </van-radio-group>

    <!-- 下方总计 -->
    <div class="total">
      <div>
        <p class="total-tip">总价</p>
        <div class="total-price">1000</div>
      </div>
      <div class="pay-button">立即购买</div>
    </div>
  </div>
</template>

<script>
import { Image, RadioGroup, Radio } from 'vant'
import { Form, Field, Timer } from '@/components/Form'

export default {
  components: {
    'van-image': Image,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'custom-form': Form,
    'custom-field': Field,
    'custom-timer': Timer
  },
  data: () => ({
    // 订单类型
    mode: '',
    payType: 0,
    // 支付方式
    payOptions: [
      { id: 0, icon: require('@/assets/icons/pay/alipay.png'), text: '支付宝钱包' },
      { id: 1, icon: require('@/assets/icons/pay/wechat.png'), text: '微信钱包' }
    ]
  }),
  created () {
    this.mode = this.$route.query.type
  }
}
</script>

<style lang="scss" scoped>
.header{
  margin: .22rem .15rem 0 .15rem;
  @include flex();

  &-info{
    margin-left: .11rem;
    height: .90rem;
    @include flex (space-between, flex-start, column);
  }
  &-title{
    @include font (.16rem, $main-text, bold);
  }
  &-detail{
    @include font (.12rem, $tip-text);
  }
}

.main-title{
  margin: .20rem .15rem .10rem .15rem;
  @include font (.18rem, $main-text, bold);
}

.radio-container{
  margin-bottom: .3rem;

  // 选项
  .radio-item{
    height: .60rem;
    margin: 0 .15rem;
    border-bottom: solid 1px $normal-text;
    @include flex (space-between, center);

    img{
      width: 0.22rem;
      height: 0.22rem;
      margin-right: .10rem;
    }

    &-label{
      flex: 1;
      @include font (.16rem, $main-text);
    }
  }
}

.total{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  padding: .10rem .11rem .20rem .15rem;
  box-sizing: border-box;
  box-shadow: 0px -5px 10px 0px rgba(38, 38, 38, 0.06);
  @include flex (space-between, center);

  &-tip{
    @include font (.12rem, $tip-text);
  }
  &-price{
    @include font (.18rem, $sub-color);

    &::before{
      content: '￥';
      font-size: .12rem;
      margin-right: -2px;
    }
  }
  .pay-button{
    width: 1.18rem;
    height: .44rem;
    line-height: .44rem;
    text-align: center;
    border-radius: .22rem;
    background: linear-gradient(135deg, #FFCD00 0%, #FFAE20 100%);
    box-shadow: 0px 6px 10px -4px rgba(255, 174, 32, 0.5);
    @include font (.16rem, #fff);
  }
}
</style>
