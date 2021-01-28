<template>
  <div :style="show ? 'padding-top: 40px;' : ''">
    <!-- 公告栏 -->
    <notice-bar v-model="show" position="top" limit="90px" />

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无预约订单，点击刷新" />
    </div>
    <!-- 预约订单 -->
    <van-pull-refresh v-else v-model="refresh" @refresh="handlePullRefresh">
      <!-- 拼单列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        @load="handleListLoad"
        class="list-container"
      >
        <pending-order
          v-for="(item, index) in list"
          :key="index"
          :record="item"
          type="driver"
          color="yellow"
          showCall
        >
          <!-- 预约按钮 -->
          <template #button>
            <confirm-button
              color="yellow"
              :status="item.status"
              @confirm="handleOrderConfirm($event, item.orderId)"
              @cancel="handleOrderCancel($event, item.orderId)"
              @report="handleOrderReport($event, item.orderId)"
            />
          </template>
        </pending-order>
      </van-list>
      <div style="height:.5rem"></div>
    </van-pull-refresh>

    <!-- 退订弹窗 -->
    <refund-order-layer v-model="showRefund" @submit="handleRefund" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { PullRefresh, List } from 'vant'
import { getOrdering, confirmOrder } from '@/api'
import NoticeBar from '@/components/NoticeBar'
import PendingOrder from '@/components/OrderItem/Pending'
import ConfirmButton from '@/components/ConfirmButton'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'
import RefundOrderLayer from '@/components/Layer/RefundOrder'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin, ButtonMenuMixin],
  components: {
    'notice-bar': NoticeBar,
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'pending-order': PendingOrder,
    'confirm-button': ConfirmButton,
    'refund-order-layer': RefundOrderLayer
  },
  data: () => ({
    // 显示公告栏
    show: true,
    list: [],
    menuVisibleId: null,
    orderMenu: [
      { type: 'cancel', text: '取消预约' },
      { type: 'report', text: '举报' }
    ],
    showRefund: false,
    // 需要退订的订单id
    cancelOrderId: null
  }),
  computed: {
    ...mapState(['user']),
    ...mapGetters(['identity']),
    isCustom () {
      return this.identity === 0
    }
  },
  methods: {
    // 列表请求
    async handleListLoad (deep) {
      if (this.total === this.list.length && !deep) return

      // 我是乘客，查询我的预约订单
      const { startPage, pageSize } = this
      const res = await getOrdering({ startPage, pageSize })
      const { list, total } = res.data.data
      const result = list.map(item => {
        item.seatNum = item.orderNum
        return item
      })
      // 如果是首页，则直接设置list，否则插入到尾部
      if (this.startPage === 1) {
        this.list = result
      } else {
        this.list.push(...result)
      }

      this.total = total
      this.startPage++
      this.loading = false
      if (this.list.length === this.total) {
        this.finished = true
      }
    },
    // 刷新预约订单信息
    async handleRetry () {
      this.$toast.loading({
        message: '加载中...',
        duration: 10000
      })
      await this.handleListLoad()
      this.$toast.clear()
    },
    // 确认订单
    async handleOrderConfirm (status, orderId) {
      // const userId = this.user.info.id
      const res = await confirmOrder({ orderId, status })
      if (res.data.msg === '成功') {
        this.$toast.success('已确认')
        this.handleRefreshStatus(orderId, 2)
      } else {
        this.$toast.fail('确认失败，请稍后再试')
      }
    },
    // 乘客退订
    async handleRefund (reason) {
      const orderId = this.cancelOrderId
      const data = { status: 4, orderId, ...reason }
      // await this.handleReqCancel(data)
      this.$toast.loading({ message: '请求中', duration: 10000 })
      const res = await confirmOrder(data)
      this.$toast.clear()
      if (res.data.msg === '成功') {
        this.$toast.success('取消成功')
      } else {
        this.$toast.fail('取消失败\n请稍后重试')
      }
      this.showRefund = false
      this.handleListLoad()
    },
    // 取消预约
    handleOrderCancel (status, orderId) {
      this.cancelOrderId = orderId
      this.showRefund = true
    },
    handleRefreshStatus (id, status) {
      // 预约成功，status: 6 -> 2
      // 取消预约，status: 2 -> 4
      this.list.find(i => i.orderId === id).status = status
    },
    // 举报订单
    handleOrderReport () {
      console.log('举报订单')
    }
  }
}
</script>

<style lang="scss" scoped>
// 顶部通知栏
.notice-bar{
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
  top: 90px;
  left: 0;
}

.btn{
  height: 100%;
  display: flex;
  align-items: center;
}
.close{
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
</style>
