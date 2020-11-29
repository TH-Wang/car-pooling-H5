<template>
  <div :style="show ? 'padding-top: 40px;' : ''">
    <van-notice-bar
      v-if="show"
      left-icon="volume-o"
      text="没有合适车辆？马上预约！"
      class="notice-bar"
    >
      <template #right-icon>
        <span class="btn" @click="$router.push('/common/appoint')">马上预约</span>
        <van-icon name="cross" class="close" @click="show = false"/>
      </template>
    </van-notice-bar>

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无预约订单，点击刷新" />
    </div>
    <!-- 预约订单 -->
    <pending-order
      v-else
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      type="driver"
      color="yellow"
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
  </div>
</template>

<script>
import { NoticeBar } from 'vant'
import { getOrdering, confirmOrder } from '@/api'
import PendingOrder from '@/components/OrderItem/Pending'
import ConfirmButton from '@/components/ConfirmButton'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'

export default {
  mixins: [ButtonMenuMixin],
  components: {
    'van-notice-bar': NoticeBar,
    'pending-order': PendingOrder,
    'confirm-button': ConfirmButton
  },
  data: () => ({
    // 显示公告栏
    show: false,
    list: [],
    menuVisibleId: null,
    orderMenu: [
      { type: 'cancel', text: '取消预约' },
      { type: 'report', text: '举报' }
    ]
  }),
  methods: {
    async handleRequest () {
      // 我是乘客，查询我的预约订单
      const res = await getOrdering({
        startPage: 1,
        pageSize: 999
      })
      const { list } = res.data.data
      this.list = list.map(item => {
        item.startTime = item.passengerStartTime
        item.seatNum = item.orderNum
        return item
      })
      this.list = list
      this.show = list.length > 0
    },
    // 刷新预约订单信息
    handleRetry () {
      this.$toast.loading({
        message: '加载中...',
        duration: 1000
      })
      this.handleRequest()
    },
    // 确认订单
    async handleOrderConfirm (status, orderId) {
      // const userId = this.user.info.id
      const res = await confirmOrder({ orderId, status })
      if (res.data.msg === '成功') {
        this.$toast.success('已确认')
      } else {
        this.$toast.fail('确认失败，请稍后再试')
      }
      this.reqList()
    },
    // 取消预约
    async handleOrderCancel (status, orderId) {
      const userId = this.user.info.id
      const res = await confirmOrder({ orderId, status, userId })
      console.log(res.data)
    },
    // 举报订单
    handleOrderReport () {
      console.log('举报订单')
    }
  },
  created () {
    this.handleRequest()
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
