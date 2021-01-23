<template>
  <div>
    <!-- 钱包余额 -->
    <overage-card
      title="我的积分"
      :number="user.info.credit"
      style="margin-bottom: 0"
      :hasButton="user.info.credit < 0"
    />

    <!-- 账单列表 -->
    <div class="page-title">积分变动</div>
    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无数据，请点击重试" />
    </div>
    <!-- 拼单列表 -->
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="handleListLoad"
      class="list-container"
    >
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
    </van-list>
  </div>
</template>

<script>
import { selectAccountRecord } from '@/api'
import { List } from 'vant'
import OverageCard from '@/components/OverageCard'
import ListMixin from '@/mixins/list-mixin'
import { mapState } from 'vuex'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'overage-card': OverageCard
  },
  computed: {
    ...mapState(['user'])
  },
  data: () => ({
    billList: [
      { type: 0, price: '+10.00', time: '2020-07-23 10:55' },
      { type: 1, price: '-10.00', time: '2020-07-23 10:55' }
    ]
  }),
  methods: {
    reqApi: selectAccountRecord,
    getRequestDatas () {
      return { recordType: 2 }
    },
    resDataHandler (res) {
      const { list, total } = res.data.data.list
      return { list, total }
    },
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
