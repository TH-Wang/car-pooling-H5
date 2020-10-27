<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="预定"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 反馈图标 -->
    <feedback type="success" title="预定成功" tip="请注意出发时间，不要错过啦" />

    <!-- 订单信息 -->
    <div class="content-card" style="margin-top: .20rem">
      <!-- 地图 -->
      <map-view />

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" content="陈女士" />
      <order-info-field icon-type="car" label="车型" content="奔驰E300l" />
      <order-info-field icon-type="time" label="出发时间" content="07月09日 08:00" />
      <order-info-field icon-type="address" label="途径点" content="重庆北站 - 紫金山地铁站 - 人民路红十字会 - 二七地铁站 - 重庆一中 - 医学院地铁站 - 京广路 - 崇山路 - 新城区路口 - 体育路 - 中兴路 - 体育村 - 重庆西站" />

      <!-- 联系电话 -->
      <order-info-phone phone="15704602398"/>
    </div>

    <main-button type="hollow" color="gray" center bold>退订座位</main-button>

    <!-- 温馨提示 -->
    <order-info-tips :tips="tips" />
  </div>
</template>

<script>
import { Field, Phone, Tips } from '@/components/OrderInfo/index'
import Feedback from '@/components/Feedback'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'order-info-field': Field,
    'order-info-phone': Phone,
    'order-info-tips': Tips,
    'map-view': MapView,
    'main-button': MainButton,
    feedback: Feedback
  },
  data: () => ({
    tips: [
      '温馨提示',
      '1.如您行程改变，请尽可能提前退订，<span style="color:#FFCD00">07月09日 08:00</span style="color:#FFCD00">前可<span style="color:#FFCD00">无责退订</span>。',
      '2.请在上车后，将分摊费用直接支付车主。'
    ]
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
