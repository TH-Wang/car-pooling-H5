<template>
  <div></div>
</template>

<script>
// import wxLoad, { isWeixin, getUserCode } from '@/utils/wx'
import wxLoad from '@/utils/wx'
// import { isWeixin } from '@/utils/wx'

export default {
  methods: {
    async getLocation () {
      // if (isWeixin()) {
      // } else this.$dialog.alert({ message: '不是微信浏览器' })
      try {
        await wxLoad()
        window.wx.getLocation({
          type: 'wgs84',
          success (res) {
            this.$dialog.alert({ message: JSON.stringify(res) })
          }
        })
      } catch (error) {
        this.$dialog.alert({ message: error })
      }
    }
  },
  created: async function () {
    // getUserCode()
    this.getLocation()
  },
  mounted () {
    // this.$dialog.confirm({
    //   title: '请确认支付是否已完成',
    //   confirmButtonText: '已完成支付',
    //   cancelButtonText: '遇到问题'
    // }).then(() => {
    //   const url = this.$store.state.orderUrl
    //   this.$router.push(url)
    // })
  }
}
</script>

<style lang="scss" scoped>

</style>
