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
        startAddr: record.startAddr,
        endAddr: record.endAddr,
        state: record.orderState,
      }"
      content-type="state"
    />

    <!-- 详情卡片 -->
    <div class="content-card">
      <!-- 地图 -->
      <map-view :info="record.passPointLis" />

      <!-- 详细信息 -->
      <order-info-field
        v-for="(item, index) in infoConfig"
        :key="index"
        :icon-type="item[0]"
        :label="item[1]"
        :content="record[item[2]]"
      />
      <!-- 备注 -->
      <order-info-field icon-type="remark" label="备注" :content="record.remark || '无'" />

      <!-- 联系电话 -->
      <order-info-phone tipType="customer" :phone="record.mobilePhone"/>
    </div>
  </div>
</template>

<script>
import { selectByPassengerDetail } from '@/api'
import { Header, Field, Phone } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'

export default {
  components: {
    'order-info-header': Header,
    'order-info-field': Field,
    'order-info-phone': Phone,
    'map-view': MapView
  },
  data: () => ({
    orderId: null,
    record: {},
    infoConfig: [
      ['user', '乘客', 'userName'],
      ['car', '出发地点', 'startAddr'],
      ['car', '到达地点', 'endAddr']
    ]
  }),
  methods: {
    async handleRequest () {
      const res = await selectByPassengerDetail(this.orderId)
      this.record = res.data.data[0]
    }
  },
  created () {
    this.orderId = this.$route.query.id
    this.handleRequest()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/orderinfo.scss'
</style>
