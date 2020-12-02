<template>
  <div>
    <!-- 乘客等待车主确认 -->
    <mini-button
      v-if="status === 5 && isCustomer"
      :color="color.wait"
    >待车主确认</mini-button>
    <!-- 乘客确认 -->
    <mini-button
      v-if="status === 6 && isCustomer"
      :color="color.confirm" @click="$emit('confirm', 2)"
    >立即确认</mini-button>

    <!-- 车主确认 -->
    <mini-button
      v-if="status === 5 && isDriver"
      :color="color.confirm" @click="$emit('confirm', 1)"
    >立即确认</mini-button>
    <!-- 车主等待乘客确认 -->
    <mini-button
      v-if="status === 6 && isDriver"
      :color="color.wait"
    >待乘客确认</mini-button>

    <!-- 司机或乘客已确认 -->
    <mini-button
      v-if="status === 1 || status === 2"
      :color="buttonColor"
      :menu="menu"
      :menuVisible="menuVisible"
      @click="menuVisible = !menuVisible"
      @cancel="handleCancel"
      @report="$emit('report')"
    >预约成功</mini-button>
  </div>
</template>

<script>
import MiniButton from '@/components/MiniButton'
import { mapState } from 'vuex'

export default {
  components: {
    'mini-button': MiniButton
  },
  props: {
    // 0是待确定，1司机确定，2乘客确定，3司机取消，4乘客取消
    status: {
      type: Number,
      default: 0
    },
    // 身份：customer，driver
    identity: {
      type: String,
      default: 'customer'
    }
  },
  data: () => ({
    color: {
      confirm: 'yellow',
      wait: 'red'
    },
    menuVisible: false,
    menu: [
      { type: 'cancel', text: '取消预约' },
      { type: 'report', text: '举报' }
    ]
  }),
  computed: {
    ...mapState(['user']),
    buttonColor () {
      const color = { customer: 'yellow', driver: 'green' }
      return color[this.identity]
    },
    // 乘客
    isCustomer () {
      return this.identity === 'customer'
    },
    // 车主
    isDriver () {
      return this.identity === 'driver'
    }
  },
  methods: {
    // 点击取消预约
    handleCancel () {
      const status = this.isCustomer ? 4 : 3
      this.$emit('cancel', status)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
