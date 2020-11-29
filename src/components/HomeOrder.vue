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
            @click="$emit('link', item.pprId)"
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
        <mini-button @click="handleReserve($event, itme)" color="green" >
          <van-icon style="margin-right: .05rem" size=".18rem" name="phone" />预约
        </mini-button>
      </template>
    </pending-order>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { confirmOrder } from '@/api'
import CarpoolOrder from '@/components/OrderItem/Carpool'
import PendingOrder from '@/components/OrderItem/Pending'
import MiniButton from '@/components/MiniButton'

export default {
  components: {
    'carpool-order': CarpoolOrder,
    'pending-order': PendingOrder,
    'mini-button': MiniButton
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapGetters(['identity'])
  },
  methods: {
    // 司机预约
    async handleReserve (e, record) {
      const res = await confirmOrder({
        orderId: record.pprId,
        status: 0
      })
      if (res.data.status === 200 || res.data.msg === '成功') {
        const phoneHtml = '<strong style="color:#FFCD00">' + record.mobilePhone + '</strong>'
        this.$dialog.success({
          title: '预约成功',
          message: '请及时联系沟通让乘客尽快确认，乘客电话' + phoneHtml,
          allowHtml: true
        })
      } else {
        this.$toast.fail('预约失败\n请稍后再试')
      }
    }
  }
}
</script>

<style>

</style>
