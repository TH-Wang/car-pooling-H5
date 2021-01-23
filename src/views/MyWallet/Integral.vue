<template>
  <div>
    <!-- 钱包余额 -->
    <overage-card
      title="我的积分"
      :number="account"
      style="margin-bottom: 0"
      :hasButton="account < 0"
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
          v-for="(item, index) in list"
          :key="index"
          @click="$router.push(item.path)"
        >
          <div class="bill-main">
            <img :src="getBillIcon(item.recordStatus)" alt="">
            <span>{{item.recordBody}}</span>
            <div class="price">{{getPrice(item.recordPrice, item.recordStatus)}}</div>
          </div>
          <div class="bill-tip">{{item.createDate | time}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import moment from 'moment'
import { selectAccountRecord } from '@/api'
import { List } from 'vant'
import OverageCard from '@/components/OverageCard'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'overage-card': OverageCard
  },
  data: () => ({
    account: 0
  }),
  filters: {
    time: (date) => date ? '' : moment(date).format('YYYY-MM-DD HH:mm')
  },
  methods: {
    reqApi: selectAccountRecord,
    getRequestDatas () {
      return { recordType: 2 }
    },
    resDataHandler (res) {
      this.account = res.data.data.account
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
    },
    getPrice (price, type) {
      if (!price || !type) return ''
      return type === 0 ? '-' + price : '+' + price
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
