<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="充值余额"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />
    <div class="container">
      <span class="rmb">￥</span>
      <!-- 金额框 -->
      <input
        ref="input"
        class="input"
        type="text"
        v-model="value"
        readonly
        placeholder="请输入支付金额"
        @focus="show = true"
        @blur="show = false"
      >
      <!-- 充值按钮 -->
      <div class="button" @click="handleRecharge">充值</div>
    </div>
    <!-- 支付方式 -->
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

    <!-- 数字键盘 -->
    <van-number-keyboard
      show
      v-model="value"
      extra-key="."
      safe-area-inset-bottom
    />
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import { NumberKeyboard, RadioGroup, Radio } from 'vant'
import { insertAccount } from '@/api'
import { aliPay, wexinPay } from '@/utils/pay'
import { isWeixin, getUserCode } from '@/utils/wx'

export default {
  components: {
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-number-keyboard': NumberKeyboard
  },
  data: () => ({
    count: null,
    show: false,
    value: '',
    payType: 2,
    // 支付方式
    payOptions: [
      { id: 1, icon: require('@/assets/icons/pay/alipay.png'), text: '支付宝钱包' },
      { id: 2, icon: require('@/assets/icons/pay/wechat.png'), text: '微信钱包' }
    ]
  }),
  methods: {
    // 充值
    async handleRecharge () {
      // 如果未输入则返回
      if (isEmpty(this.value)) return
      // 如果格式不正确
      if (parseFloat(this.value).toString() === 'NaN') {
        this.$toast({ message: '请输入合理的数字' })
        return
      }
      // 处理请求
      const pay = this.payType
      const code = this.$store.state.ticket.code
      const money = this.value
      const res = await insertAccount({ code, pay, money })
      const payType = res.data.data.data.pay
      if (payType === 1) {
        aliPay(res)
      } else {
        await wexinPay(res)
        setTimeout(() => { this.$router.go(-1) }, 500)
      }
    }
  },
  created () {
    this.count = this.$route.query.count
    if (this.count) this.value = this.count
  },
  mounted () {
    this.$refs.input.focus()
    if (!this.$store.state.ticket.code && isWeixin()) {
      getUserCode('/common/recharge')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: .2rem .15rem 0 .15rem;
  @include flex (space-between, center);

  .rmb{
    font-size: .24rem;
  }

  .input{
    width: 2.3rem;
    margin-right: .1rem;
    padding-left: .05rem;
    box-sizing: border-box;
    height: .5rem;
    font-size: .20rem;
    outline: none;
    border: none;
    border-bottom: solid 1px #999;
  }

  .button{
    width: .8rem;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    color: #FFFFFF;
    background-color: #07C160;
    border-radius: .05rem;
  }
}

.radio-container{
  margin-top: .3rem;

  // 选项
  .radio-item{
    height: .60rem;
    border-bottom: solid 1px $normal-text;
    margin: 0 .15rem;
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
</style>
