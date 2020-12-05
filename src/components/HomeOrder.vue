<template>
  <div>
    <div v-if="identity === 0">
      <!-- 乘客身份 -->
      <carpool-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
        @click="$emit('link', item.pprId)"
      >
        <template #button>
          <mini-button
            color="yellow"
            @click="$emit('reserve', item.pprId)"
          >立即预订</mini-button>
        </template>
      </carpool-order>
    </div>

    <!-- 司机身份 -->
    <pending-order
      v-else
      v-for="(item, index) in list"
      :key="index"
      :record="item"
    >
      <template #button>
        <driver-reserve-button :record="item" />
      </template>
    </pending-order>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { commitOrder } from '@/api'
import CarpoolOrder from '@/components/OrderItem/Carpool'
import PendingOrder from '@/components/OrderItem/Pending'
import MiniButton from '@/components/MiniButton'
import DriverReserveButton from '@/components/DriverReserveButton'

export default {
  components: {
    'carpool-order': CarpoolOrder,
    'pending-order': PendingOrder,
    'mini-button': MiniButton,
    'driver-reserve-button': DriverReserveButton
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    hasReserve: false
  }),
  computed: {
    ...mapGetters(['identity'])
  },
  methods: {
    // 司机预约
    async handleReserve (e, record) {
      this.$toast.loading({ message: '正在预约', duration: 10000 })
      const res = await commitOrder({
        pprIdCar: record.id
      })
      this.$toast.clear()
      // 处理请求结果
      const { status, msg } = res.data
      if (status === 200 || msg === '成功') {
        // 预约成功
        this.handleTip(record.mobilePhone)
        this.hasReserve = true
      } else if (status === -6) {
        // 如果车主尚未发布
        await this.$dialog.confirm({
          title: '无法预约',
          message: msg,
          confirmButtonText: '立即发布',
          cancelButtonText: '稍后发布'
        })
        // 跳转到车主发布页面
        this.$router.push('/release')
        this.$store.commit('changeTabsId', { type: 'release', index: 0 })
      } else {
        // 如果其他原因预约失败
        this.$toast.fail('预约失败\n请稍后再试')
      }
    },
    // 提示车主尽快联系乘客，并展示手机号码
    handleTip (phone) {
      const phoneHtml = '<strong style="color:#FFCD00">' + phone + '</strong>'
      this.$dialog.confirm({
        title: '预约成功',
        message: '请及时联系沟通让乘客尽快确认，乘客电话' + phoneHtml,
        confirmButtonText: '立即拨打',
        allowHtml: true
      })
    }
  }
}
</script>

<style>

</style>
