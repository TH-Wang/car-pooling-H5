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
      <qrcode-card :tips="tips" :qr="info.url" center type="person" :record="{
        groupName: '拼车之家官方客服'
      }" />
    </div>

    <!-- 确认按钮 -->
    <main-button
      center
      style="margin-bottom:.30rem"
      @click="$router.go(-3)"
    >确认</main-button>
  </div>
</template>

<script>
import { getServiceInfo } from '@/api'
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
    tips: ['长按二维码扫描加客服微信'],
    info: {}
  }),
  methods: {
    async getInfo () {
      const res = await getServiceInfo()
      this.info = res.data.data[0]
    }
  },
  created () {
    this.getInfo()
  }
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
