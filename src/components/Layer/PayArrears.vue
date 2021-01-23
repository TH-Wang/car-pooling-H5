<template>
  <div>
    <van-popup
      v-model="visible"
      position="bottom"
      round
      closeable
      safe-area-inset-bottom
    >
      <div class="content">
        <!-- 标题 -->
        <div class="title">支付方式</div>
        <!-- 支付方式列表 -->
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

        <!-- 提交按钮 -->
        <main-button width="100%" color="green" @click="handleSubmit">立即支付</main-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, RadioGroup, Radio } from 'vant'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-popup': Popup,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'main-button': MainButton
  },
  data: () => ({
    visible: false,
    // 选择的支付方式
    payType: 1,
    // 支付方式
    payOptions: [
      { id: 1, icon: require('@/assets/icons/pay/alipay.png'), text: '支付宝钱包' },
      { id: 2, icon: require('@/assets/icons/pay/wechat.png'), text: '微信钱包' }
    ]
  }),
  methods: {
    // 弹出
    show () {
      this.visible = true
    },
    // 收回
    hidden () {
      this.visible = false
    },
    // 提交事件
    handleSubmit () {
      this.$emit('submit', this.payType)
      this.visible = false
    }
  },
  watch: {
    visible: function (newValue) {
      if (!newValue) this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  padding: .20rem .15rem;
  box-sizing: border-box;

  // 标题
  .title{
    text-align: center;
    @include font (.17rem, $main-text, bold);
  }

  // 描述
  .description{
    max-width: 2.27rem;
    text-align: center;
    margin: .10rem auto .20rem auto;
    @include font (.16rem, $tip-text);
  }

  .radio-container{
    margin-bottom: .3rem;

    // 选项
    .radio-item{
      width: 100%;
      height: .60rem;
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

  .list-title{
    @include font (.18rem, $main-text, bold);
  }
}
</style>
