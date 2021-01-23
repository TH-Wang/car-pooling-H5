<template>
  <div>
    <!-- 钱包余额 -->
    <overage-card
      title="钱包余额（元）"
      :number="account"
      style="margin-bottom: 0"
      :hasButton="account < 0"
      @click-button="handleOpenPayType"
    />

    <!-- 菜单列表 -->
    <div class="cell">
      <div
        class="cell-item"
        v-for="(item, index) in menuList"
        :key="index"
        @click="$router.push(item.path)"
      >
        <img :src="item.icon" alt="">
        <span>{{item.title}}</span>
        <van-icon name="arrow" color="#E8E8E8" size=".12rem"/>
      </div>
    </div>

    <div class="page-title">我的账单</div>
    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无数据，请点击重试" />
    </div>
    <!-- 账单列表 -->
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
            <span>{{getBillText(item.recordStatus)}}</span>
            <div class="price">{{getPrice(item.recordPrice, item.recordStatus)}}</div>
          </div>
          <div class="bill-tip">{{item.createDate | time}}</div>
        </div>
      </div>
    </van-list>

    <!-- 支付欠费弹层 -->
    <pay-arrears ref="layer" @handleSubmit="handlePayArrears" />
  </div>
</template>

<script>
import moment from 'moment'
import { selectAccountRecord, insertAccount } from '@/api'
import { List } from 'vant'
import OverageCard from '@/components/OverageCard'
import PayArrears from '@/components/Layer/PayArrears'
import ListMixin from '@/mixins/list-mixin'
import { aliPay, wexinPay } from '@/utils/pay'

export default {
  mixins: [ListMixin],
  components: {
    'pay-arrears': PayArrears,
    'van-list': List,
    'overage-card': OverageCard
  },
  data: () => ({
    account: 0,
    menuList: [
      {
        icon: require('@/assets/icons/wallet/top-up.png'),
        title: '充值',
        path: '/common/recharge'
      },
      { icon: require('@/assets/icons/wallet/with-draw.png'), title: '提现', path: '' }
    ]
  }),
  filters: {
    time: (date) => date ? '' : moment(date).format('YYYY-MM-DD HH:mm')
  },
  methods: {
    reqApi: selectAccountRecord,
    getRequestDatas () {
      return { recordType: 1 }
    },
    resDataHandler (res) {
      this.account = res.data.data.account
      const { list, total } = res.data.data.list
      return { list, total }
    },
    // 打开支付方式的弹窗
    handleOpenPayType () {
      // this.$refs.layer.show()
      const count = Math.abs(this.account)
      this.$router.push('/common/recharge?count=' + count)
    },
    // 提交支付欠费
    async handlePayArrears (pay) {
      const code = this.$store.state.ticket.code
      const money = this.account
      const res = await insertAccount({ code, pay, money })
      const payType = res.data.data.data.pay
      payType === 1 ? aliPay(res) : wexinPay(res)
    },
    getBillIcon (type) {
      let iconName = ''
      switch (type) {
        case 0: iconName = 'with-draw'; break
        case 1: iconName = 'top-up'; break
      }
      return require(`@/assets/icons/wallet/${iconName}-fill.png`)
    },
    getBillText (type) {
      switch (type) {
        case 0: return '提现'
        case 1: return '充值'
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
