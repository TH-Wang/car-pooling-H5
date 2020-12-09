<template>
  <!-- 拼车 -->
  <div v-if="type === 'carpool'">
    <carpool-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      @click="handleLinkDetail($event, item.pprId)"
      @like="handleCommitLike($event, item.pprId)"
    ><template #button>
        <mini-button
          color="yellow"
          @click="handleLinkDetail($event, item.pprId)"
        >立即预订</mini-button>
      </template>
    </carpool-order>
  </div>

  <!-- 车主找人 -->
  <div v-else-if="type === 'pending'">
    <pending-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      @like="handleCommitLike($event, item.orderId)"
    ><template #button>
        <driver-reserve-button :record="item" />
      </template>
    </pending-order>
  </div>

  <!-- 上下班拼车：车主信息 -->
  <div v-else-if="type === 'hitDri'">
    <hitchhike-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      color="yellow"
      showCar showLineDetail
      @click="handleLinkDetail($event, item.pprId)"
      @like="handleCommitLike($event, item.pprId)"
    >
      <!-- 预约按钮 -->
      <template #button>
        <mini-button
          color="yellow"
          @click="handleLinkDetail($event, item.pprId)"
        >立即预订</mini-button>
      </template>
    </hitchhike-order>
  </div>

  <!-- 上下班拼车：乘客信息 -->
  <div v-else-if="type === 'hitCus'">
    <hitchhike-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      color="green"
      @like="handleCommitLike($event, item.orderId)"
    ><template #button>
        <driver-reserve-button :record="item" />
      </template>
    </hitchhike-order>
  </div>

  <!-- 顺路带物：车主信息 -->
  <div v-else-if="type === 'carryDri'">
    <carry-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      type="customer"
      @click="handleLinkDetail($event, item.pprId)"
      @like="handleCommitLike($event, item.pprId)"
    ><template #button>
      <mini-button
        color="yellow"
        :orderId="item.id"
        @click="handleLinkDetail($event, item.pprId)"
      >立即预订</mini-button>
      </template>
    </carry-order>
  </div>

  <!-- 顺路带物：乘客信息 -->
  <div v-else-if="type === 'carryCus'">
    <carry-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      type="customer"
      @like="handleCommitLike($event, item.orderId)"
    ><template #button>
        <driver-reserve-button :record="item" />
      </template>
    </carry-order>
  </div>
</template>

<script>
import { commitLike } from '@/api'
import CarPool from '@/components/OrderItem/Carpool'
import Pending from '@/components/OrderItem/Pending'
import Hitchhike from '@/components/OrderItem/Hitchhike'
import MiniButton from '@/components/MiniButton'
import DriverReserveButton from '@/components/DriverReserveButton'
import Carry from '@/components/OrderItem/Carry'

export default {
  components: {
    'carpool-order': CarPool,
    'pending-order': Pending,
    'hitchhike-order': Hitchhike,
    'carry-order': Carry,
    'mini-button': MiniButton,
    'driver-reserve-button': DriverReserveButton
  },
  props: {
    // 业务订单类型
    type: {
      type: String,
      default: 'carpool'
    },
    // 数据列表
    list: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    },
    // 点赞
    async handleCommitLike (isLike, pprId) {
      const res = await commitLike(isLike, pprId)
      if (res.data.status === 1 && res.data.msg === '点赞成功') {
        this.handleRefreshLike(isLike, pprId)
      } else {
        this.$toast.fail('操作失败')
      }
    },
    // 更新订单的点赞状态
    handleRefreshLike (isLike, pprId) {
      const idKey = this.identity === 0 ? 'pprId' : 'orderId'
      const el = this.list.find(i => i[idKey] === pprId)
      if (isLike === 1) el.isDo = 1
    }
  }
}
</script>
