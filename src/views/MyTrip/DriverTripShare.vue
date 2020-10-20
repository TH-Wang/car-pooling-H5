<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="出行详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
      @click-right="$router.replace('/home')"
    >
      <template #right><van-icon name="wap-home" /></template>
    </van-nav-bar>

    <!-- 顶部 -->
    <order-info-header :record="{
      start: '重庆西站',
      end: '重庆北站',
      price: 120
    }" content-type="price" />

    <!-- 详情卡片 -->
    <div class="content-card">

      <!-- 详细信息 -->
      <order-info-field icon-type="user" label="车主" content="陈女士" />
      <order-info-field icon-type="car" label="车型" content="奔驰E300l" />
      <order-info-field icon-type="seat" label="余座" content="3" text-color="yellow" />
      <order-info-field icon-type="time" label="出发时间" content="07月09日 08:00" />
      <order-info-field icon-type="address" label="途径点" content="重庆北站 - 紫金山地铁站 - 人民路红十字会 - 二七地铁站 - 重庆一中 - 医学院地铁站 - 京广路 - 崇山路 - 新城区路口 - 体育路 - 中兴路 - 体育村 - 重庆西站" />
      <order-info-field icon-type="remark" label="备注" content="重庆北站到重庆西站顺路可带4人，顺路上下，预定电话确认下" />

      <!-- 地图 -->
      <map-view />
    </div>

    <div class="tip">可复制粘贴到任意QQ、微信等拼车群</div>

    <!-- 底部按钮组 -->
    <div class="footer-button-group">
      <main-button width="1.2rem" @click="handleCopy">复制到微信</main-button>
      <main-button
        width="2.1rem"
        type="gradient"
        @click="handleCopy"
      >复制内容</main-button>
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
    handleCopy () {
      this.$dialog.alert({
        title: '复制成功',
        message: '快去拼车群粘贴吧'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss';
.tip{
  margin: .30rem 0 .10rem 0;
  text-align: center;
  @include font (.12rem, $tip-text);
}

.footer-button-group{
  margin: 0rem .15rem .30rem .15rem;
  @include flex (space-between, center);
}
</style>
