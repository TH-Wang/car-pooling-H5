<template>
  <div class="phone-box">
    <div class="phone-tip">请点击号码立刻与{{text}}电话确认行程</div>
    <div class="phone" @click="handleCall">
      <van-icon class="phone-icon" color="#FFAE20" name="phone"/>{{phone}}
    </div>
  </div>
</template>

<script>
import callPhone from '@/utils/callPhone'

export default {
  props: {
    // 提示的文本类型: ['customer', 'driver']
    tipType: {
      type: String,
      default: 'driver'
    },
    phone: [String, Number]
  },
  computed: {
    text () {
      return this.tipType === 'customer' ? '乘客' : '车主'
    }
  },
  methods: {
    async handleCall () {
      const phone = '<span style="color: #FFAE20">' + this.phone + '</span>'
      await this.$dialog.confirm({
        title: '拨打电话',
        message: `是否立即向手机号码 ${phone} 拨打电话`,
        confirmButtonText: '立即拨打',
        allowHtml: true
      })
      callPhone(this.phone)
    }
  }
}
</script>

<style lang="scss" scoped>
.phone-box{
  padding: .15rem 0 .20rem 0;
  margin: 0 .20rem;
  border-top: solid 1px $normal-text;

  .phone-tip{
    @include font (.12rem, $main-text);
    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;
    margin-bottom: .15rem;
  }

  .phone{
    @include flex (center, center);
    @include font (.24rem, $sub-color);

    &-icon{
      font-size: .23rem;
      margin-right: .05rem;
    }
  }
}
</style>
