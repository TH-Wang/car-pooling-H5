<template>
  <!-- 拼车 -->
  <div v-if="type === 'carpool'">
    <carpool-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      @click="handleLinkDetail($event, item.publish.id)"
      @like="handleCommitLike($event, item.publish.id)"
    ><template #button>
        <mini-button
          color="yellow"
          @click="handleLinkReserve(item)"
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
      @click="handleLinkDetail($event, item.publish.id)"
      @like="handleCommitLike($event, item.pprId)"
    >
      <!-- 预约按钮 -->
      <template #button>
        <mini-button
          color="yellow"
          @click="handleLinkReserve(item)"
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
      @click="handleLinkDetail($event, item.publish.id)"
      @like="handleCommitLike($event, item.pprId)"
    ><template #button>
      <mini-button
        color="yellow"
        :orderId="item.id"
        @click="handleLinkReserve(item)"
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
import confirmLogin from '@/utils/confirmLogin'

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
    // 跳转到详情页面
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    },
    // 跳转到预约页面
    async handleLinkReserve (record) {
      // 验证是否登录
      const isLogin = await confirmLogin('尊敬的用户，您还未登录，完成登录后即可预约')
      if (!isLogin) return
      // 验证是否是自己发布的订单
      if (record.suser.id === this.$store.state.user.info.id) {
        this.$toast('该订单是您发布的，无法预约！')
        return
      }
      const { id, num } = record.publish
      this.$router.push({ path: '/common/reserve', query: { id, seat: num } })
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
    handleRefreshLike (isLike, id) {
      // const driverType = ['pending', 'hitCus', 'carryCus']
      // // 判断要获取的id类型
      // const idKey = driverType.indexOf(this.type) === -1 ? 'pprId' : 'orderId'
      // 寻找该订单在列表中的索引
      const elIdx = this.list.findIndex(i => i.publish.id === id)
      // 获取该订单对象
      const el = this.list[elIdx]
      // 深拷贝数据
      const newRecord = cloneDeep(el)
      // 更新操作状态
      newRecord.publish.isDo = isLike

      // 对数量进行判断并操作
      if (isLike === 0) {
        // 取消点赞
        if (el.publish.isDo === 1 && newRecord.publish.isLike >= 1) newRecord.publish.isLike--
        // 取消踩
        else if (el.publish.isDo === 2 && newRecord.publish.isNotLike >= 1) newRecord.publish.isNotLike--
      } else if (isLike === 1) {
        // 点赞
        newRecord.publish.isLike++
        // 如果已踩则取消踩
        if (el.publish.isDo === 2) newRecord.publish.isNotLike--
      } else if (isLike === 2) {
        // 踩
        newRecord.publish.isNotLike++
        // 如果已赞则取消赞
        if (el.publish.isDo === 1) newRecord.publish.isLike--
      }

      // 将新数据更新到列表中
      this.$set(this.list, elIdx, newRecord)
    }
  }
}
</script>
