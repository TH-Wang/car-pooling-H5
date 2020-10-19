<template>
  <div class="container">

    <!-- 导航栏 -->
    <van-nav-bar
      title="出行详情"
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
      @click-right="handleBackHome"
    >
      <template #left><van-icon name="arrow-left" /></template>
      <template #right><van-icon name="wap-home" /></template>
    </van-nav-bar>

    <!-- 顶部基本信息 -->
    <order-info-header :record="{
      start: '重庆西站',
      end: '重庆北站',
      state: $route.query.state,
      price: 100
    }" content-type="price" />

    <!-- 详情卡片 -->
    <div class="content-card">

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" content="陈女士" />
      <order-info-field icon-type="car" label="车型" content="奔驰E300l" />
      <order-info-field icon-type="seat" label="余座" content="3" text-color="yellow" />
      <order-info-field icon-type="time" label="出发时间" content="07月09日 08:00" />
      <order-info-field icon-type="address" label="途径点" content="重庆北站 - 紫金山地铁站 - 人民路红十字会 - 二七地铁站 - 重庆一中 - 医学院地铁站 - 京广路 - 崇山路 - 新城区路口 - 体育路 - 中兴路 - 体育村 - 重庆西站" />

      <!-- 地图 -->
      <map-view />
    </div>

    <!-- 底部按钮组 -->
    <div class="footer-button-group">
      <main-button width="1.58rem" color="gray" type="hollow">转发分享</main-button>
      <main-button
        width="1.58rem"
        color="yellow"
        type="gradient"
        @click="handleLinkReserve"
      >立即预订</main-button>
    </div>
  </div>
</template>

<script>
import { Header, Field } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'map-view': MapView,
    'main-button': MainButton
  },
  methods: {
    handleBackHome () {
      this.$router.replace('/home')
      location.reload()
    },
    handleLinkReserve () {
      this.$router.push('/common/reserve')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss';

.footer-button-group{
  margin: .20rem .20rem .30rem .20rem;
  @include flex (space-between, center);
}
</style>
