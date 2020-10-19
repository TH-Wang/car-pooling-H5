<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="行程详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
    />

    <!-- 顶部 -->
    <order-info-header :record="{
      start: '重庆西站',
      end: '重庆北站',
      state: $route.query.state
    }" content-type="state" />

    <!-- 详情卡片 -->
    <div class="content-card">
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

    <main-button v-if="stateMark === 'doing'" type="hollow" center bold>退订座位</main-button>

    <!-- 温馨提示 -->
    <order-info-tips v-if="stateMark === 'doing'" :tips="tips" />
  </div>
</template>

<script>
import { Header, Field, Phone, Tips } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'order-info-phone': Phone,
    'order-info-tips': Tips,
    'map-view': MapView,
    'main-button': MainButton
  },
  data: () => ({
    tips: [
      '温馨提示',
      '1.如您行程改变，请尽可能提前退订，<span style="color:#FFCD00">07月09日 08:00</span style="color:#FFCD00">前可<span style="color:#FFCD00">无责退订</span>。',
      '2.请在上车后，将分摊费用直接支付车主。'
    ],
    stateMark: ''
  }),
  mounted () {
    const { state } = this.$route.query
    this.stateMark = state
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
