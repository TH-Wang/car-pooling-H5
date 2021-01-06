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
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { NoticeBar, PullRefresh, List } from 'vant'
import { driverOrder, confirmOrder } from '@/api'
import PendingOrder from '@/components/OrderItem/Pending'
import ConfirmButton from '@/components/ConfirmButton'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin, ButtonMenuMixin],
  components: {
    'van-notice-bar': NoticeBar,
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'pending-order': PendingOrder,
    'confirm-button': ConfirmButton
  },
  data: () => ({
    show: true,
    menuVisibleId: null,
    orderMenu: [
      { type: 'cancel', text: '取消预约' },
      { type: 'report', text: '举报' }
    ]
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
    // 请求列表
    // async handleListLoad (deep) {
    //   if (this.total === this.list.length && !deep) return

    //   // 我是乘客，查询我的预约订单
    //   const res = await driverOrder({
    //     startPage: 1,
    //     pageSize: 999
    //   })
    //   const { list, total } = res.data.data
    //   const result = list.map(item => {
    //     item.startTime = item.passengerStartTime
    //     item.seatNum = item.orderNum
    //     return item
    //   })
    //   // 如果是首页，则直接设置list，否则插入到尾部
    //   if (this.startPage === 1) {
    //     this.list = result
    //   } else {
    //     this.list.push(...result)
    //   }

    //   this.total = total
    //   this.startPage++
    //   this.loading = false
    //   if (this.list.length === this.total) {
    //     this.finished = true
    //   }
    // },
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
    // 取消预约
    async handleOrderCancel (status, orderId) {
      const userId = this.user.info.id
      const res = await confirmOrder({ orderId, status, userId })
      if (res.data.msg === '成功') {
        this.$toast.success('取消成功')
        this.handleRefreshStatus(orderId, 4)
        // this.startPage = 1
        // this.handleListLoad(true)
      } else {
        this.$toast.fail('取消失败\n请稍后重试')
      }
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
