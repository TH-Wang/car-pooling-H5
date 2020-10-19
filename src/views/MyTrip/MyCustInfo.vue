<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="乘客详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
    />

    <!-- 顶部 -->
    <order-info-header
      :record="{
        start: '重庆西站',
        end: '重庆北站',
        state: $route.query.state,
        time: '2020-03-23  08:00',
        seat: 3}"
      content-type="state"
      show-time-seat
    />

    <!-- 详情卡片 -->
    <div class="content-card">
      <!-- 地图 -->
      <map-view />

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" content="陈女士" />
      <order-info-field icon-type="car" label="出发地点" content="重庆北站" />
      <order-info-field icon-type="car" label="到达地点" content="重庆西站" />
      <order-info-field icon-type="time" label="出发时间" content="07月09日 08:00" />
      <order-info-field icon-type="address" label="途径点" content="重庆北站 - 紫金山地铁站 - 人民路红十字会 - 二七地铁站 - 重庆一中 - 医学院地铁站 - 京广路 - 崇山路 - 新城区路口 - 体育路 - 中兴路 - 体育村 - 重庆西站" />

      <!-- 联系电话 -->
      <order-info-phone tipType="customer" phone="15704602398"/>
    </div>
  </div>
</template>

<script>
import { Header, Field, Phone } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'order-info-phone': Phone,
    'map-view': MapView
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
