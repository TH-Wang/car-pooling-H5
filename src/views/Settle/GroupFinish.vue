<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="入驻群"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- tip -->
    <div class="header-tip">我有拼车群，我要入驻平台！</div>

    <!-- step -->
    <step :current="1" />

    <!-- 二维码信息 -->
    <div class="qrcode-card">
      <qrcode-card :tips="tips" center />
    </div>

    <!-- 确认按钮 -->
    <main-button
      center
      style="margin-bottom:.30rem"
      @click="$router.go(-2)"
    >确认</main-button>
  </div>
</template>

<script>
import Step from '@/components/Step'
import QRcodeCard from '@/components/QRcodeCard'
import MainButton from '@/components/MainButton'

export default {
  components: {
    step: Step,
    'qrcode-card': QRcodeCard,
    'main-button': MainButton
  },
  data: () => ({
    tips: [
      '长按二维码扫描加客服微信',
      '发送申请编号客服急速审核',
      '申请编号 <span style="color:#FFCD00">CDSLVN</span>'
    ]
  })
}
</script>

<style lang="scss" scoped>
.header-tip{
  margin: .14rem .15rem .10rem .15rem;
  @include font (.12rem, $tip-text);
}
.qrcode-card{
  margin: .30rem .15rem .46rem .15rem;
  box-shadow: 0px 0px 20px 0px rgba(38, 38, 38, 0.06);
  border-radius: 10px;
}
</style>
