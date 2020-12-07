<template>
  <mini-button v-if="!hasReserve" @click="handleReserve" color="green" >
    <van-icon style="margin-right: .05rem" size=".18rem" name="phone" />预约
  </mini-button>
  <mini-button v-else color="green" @click="handleTipPhone">预约中</mini-button>
</template>

<script>
import { appointmentPassenger } from '@/api'
import MiniButton from '@/components/MiniButton'
import callPhone from '@/utils/callPhone'

export default {
  components: {
    'mini-button': MiniButton
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    hasReserve: false
  }),
  methods: {
    // 司机预约
    async handleReserve (e, record) {
      this.$toast.loading({ message: '正在预约', duration: 10000 })
      const orderId = this.record.id
      try {
        const res = await appointmentPassenger(orderId)
        this.$toast.clear()
        // 处理请求结果
        const { status, msg } = res.data
        if (status === 200 || msg === '成功') {
          // 预约成功
          this.handleTipPhone()
          this.hasReserve = true
        } else if (status === -6) {
          // 如果车主尚未发布
          this.handleTipRelease(msg)
        } else {
          // 如果其他原因预约失败
          this.$toast.fail('预约失败\n请稍后再试')
        }
      } catch (error) {
        this.$toast.fail('预约失败\n请稍后再试')
      }
    },
    // 提示车主尽快联系乘客，并展示手机号码
    async handleTipPhone (phone) {
      const phoneHtml = '<strong style="color:#FFCD00">' + this.record.mobilePhone + '</strong>'
      await this.$dialog.confirm({
        title: '预约成功',
        message: '请及时联系沟通让乘客尽快确认，乘客电话' + phoneHtml,
        confirmButtonText: '立即拨打',
        allowHtml: true
      })
      callPhone(this.phone)
    },
    // 提示车主先发布订单
    async handleTipRelease (msg) {
      await this.$dialog.confirm({
        title: '无法预约',
        message: msg,
        confirmButtonText: '立即发布',
        cancelButtonText: '稍后发布'
      })
      // 跳转到车主发布页面
      this.$router.push('/release')
      this.$store.commit('changeTabsId', { type: 'release', index: 0 })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
