<template>
  <div>
    <!-- 钱包余额 -->
    <overage-card
      title="积分分余额"
      :number="100"
      style="margin-bottom: 0"
    />

    <!-- 账单列表 -->
    <div class="page-title">我的账单</div>
    <div class="bill">
      <div
        class="bill-item"
        v-for="(item, index) in billList"
        :key="index"
        @click="$router.push(item.path)"
      >
        <div class="bill-main">
          <img :src="getBillIcon(item.type)" alt="">
          <span>{{getBillText(item.type)}}</span>
          <div class="price">{{item.price}}</div>
        </div>
        <div class="bill-tip">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import OverageCard from '@/components/OverageCard'

export default {
  components: {
    'overage-card': OverageCard
  },
  data: () => ({
    billList: [
      { type: 0, price: '+10.00', time: '2020-07-23 10:55' },
      { type: 1, price: '-10.00', time: '2020-07-23 10:55' }
    ]
  }),
  methods: {
    getBillIcon (type) {
      let iconName = ''
      switch (type) {
        case 0: iconName = 'reward'; break
        case 1: iconName = 'consume'; break
      }
      return require(`@/assets/icons/wallet/${iconName}-fill.png`)
    },
    getBillText (type) {
      switch (type) {
        case 0: return '系统奖励'
        case 1: return '消费'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/cell.scss';
.page-title{
  @include font (.18rem, $main-text, bold);
  margin: 0 .15rem;
  margin-top: .20rem;
}
</style>
