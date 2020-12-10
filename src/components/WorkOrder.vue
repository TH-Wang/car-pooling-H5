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
import { cloneDeep } from 'lodash'
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
      const driverType = ['pending', 'hitCus', 'carryCus']
      // 判断要获取的id类型
      const idKey = driverType.indexOf(this.type) === -1 ? 'pprId' : 'orderId'
      // 寻找该订单在列表中的索引
      const elIdx = this.list.findIndex(i => i[idKey] === pprId)
      // 获取该订单对象
      const el = this.list[elIdx]
      // 深拷贝数据
      const newRecord = cloneDeep(el)
      // 更新操作状态
      newRecord.isDo = isLike

      // 对数量进行判断并操作
      if (isLike === 0) {
        // 取消点赞
        if (el.isDo === 1 && newRecord.isLike >= 1) newRecord.isLike--
        // 取消踩
        else if (el.isDo === 2 && newRecord.isNotLike >= 1) newRecord.isNotLike--
      } else if (isLike === 1) {
        // 点赞
        newRecord.isLike++
        // 如果已踩则取消踩
        if (el.isDo === 2) newRecord.isNotLike--
      } else if (isLike === 2) {
        // 踩
        newRecord.isNotLike++
        // 如果已赞则取消赞
        if (el.isDo === 1) newRecord.isLike--
      }

      // 将新数据更新到列表中
      this.$set(this.list, elIdx, newRecord)
    }
  }
}
</script>
