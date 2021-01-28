<template>
  <div :style="show && isDriver ? 'padding-top: 40px;' : ''">
    <van-notice-bar
      v-if="isDriver"
      mode="closeable"
      left-icon="volume-o"
      class="notice-bar"
      @close="show = false"
    >
      您已成功预约 {{peopleCount}} 人
      <!-- <template #right-icon>
        <van-icon name="cross" class="close" @click="show = false"/>
      </template> -->
    </van-notice-bar>

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="isDriver ? handleRetry : void 0">
      <van-empty :description="isDriver ? '暂无预约订单，点击刷新' : '可在我的乘客查看您的预约'" />
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
          type="custom"
          color="green"
          showCall
        >
          <!-- 预约按钮 -->
          <template #button>
            <confirm-button
              color="green"
              :status="item.status"
              identity="driver"
              @confirm="handleOrderConfirm($event, item.orderId)"
              @cancel="handleOrderCancel($event, item.orderId)"
              @report="handleOrderReport($event, item.orderId)"
            />
          </template>
        </pending-order>
      </van-list>
      <div style="height:.5rem"></div>
    </van-pull-refresh>

    <!-- 车主取消预约弹窗 -->
    <cancel-reserve-layer v-model="showCancel" @submit="handleDriverCancel" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { NoticeBar, PullRefresh, List } from 'vant'
import { driverOrder, confirmOrder } from '@/api'
import PendingOrder from '@/components/OrderItem/Pending'
import ConfirmButton from '@/components/ConfirmButton'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'
import CancelReserve from '@/components/Layer/CancelReserve'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin, ButtonMenuMixin],
  components: {
    'van-notice-bar': NoticeBar,
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'pending-order': PendingOrder,
    'confirm-button': ConfirmButton,
    'cancel-reserve-layer': CancelReserve
  },
  data: () => ({
    show: true,
    menuVisibleId: null,
    orderMenu: [
      { type: 'cancel', text: '取消预约' },
      { type: 'report', text: '举报' }
    ],
    showCancel: false,
    // 需要退订的订单id
    cancelOrderId: null
  }),
  computed: {
    ...mapState(['user']),
    ...mapGetters(['identity']),
    isDriver () {
      return this.identity === 1
    },
    peopleCount () {
      return this.list.filter(i => i.status === 1).length
    }
  },
  methods: {
    reqApi: driverOrder,
    // 刷新预约订单信息
    async handleRetry () {
      this.$toast.loading({
        message: '加载中...',
        duration: 10000
      })
      await this.handleListLoad(true)
      this.$toast.clear()
    },
    // 确认订单
    async handleOrderConfirm (status, orderId) {
      // const userId = this.user.info.id
      const res = await confirmOrder({ orderId, status })
      if (res.data.msg === '成功') {
        this.$toast.success('已确认')
        this.handleRefreshStatus(orderId, 1)
        // this.handleListLoad(true)
      } else {
        this.$toast.fail('确认失败，请稍后再试')
      }
    },
    // 车主取消
    async handleDriverCancel ({ id, text }) {
      const orderId = this.cancelOrderId
      const data = { status: 3, orderId, unsubscribeResonId: id }
      // await this.handleReqCancel(data)
      this.$toast.loading({ message: '请求中', duration: 10000 })
      const res = await confirmOrder(data)
      this.$toast.clear()
      if (res.data.msg === '成功') {
        this.$toast.success('取消成功')
      } else {
        this.$toast.fail('取消失败\n请稍后重试')
      }
      this.showCancel = false
      this.handleListLoad()
    },
    // 取消预约
    async handleOrderCancel (status, orderId) {
      this.cancelOrderId = orderId
      this.showCancel = true
    },
    handleRefreshStatus (id, status) {
      // 预约成功，status: 5 -> 1
      // 取消预约，status: 1 -> 4
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
  z-index: 9;
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
