<template>
  <!-- 等待预约 -->
  <mini-button v-if="status === 0" color="gray">等待预约</mini-button>

  <!-- 乘客等待车主确认 -->
  <mini-button
    v-else-if="status === 5 && isCustomer"
    color="red"
  >待车主确认</mini-button>
  <!-- 乘客确认 -->
  <mini-button
    v-else-if="status === 6 && isCustomer"
    color="yellow" @click="$emit('confirm', 2)"
  >立即确认</mini-button>

  <!-- 车主确认 -->
  <mini-button
    v-else-if="status === 5 && isDriver"
    color="green" @click="$emit('confirm', 1)"
  >立即确认</mini-button>
  <!-- 车主等待乘客确认 -->
  <mini-button
    v-else-if="status === 6 && isDriver"
    color="red"
  >待乘客确认</mini-button>

  <!-- 司机或乘客已确认 -->
  <mini-button
    v-else-if="status === 1 || status === 2"
    color="blue"
    :menu="menu"
    :menuVisible="menuVisible"
    @click="menuVisible = !menuVisible"
    @cancel="handleCancel"
    @report="$emit('report')"
  >预约成功</mini-button>

  <!-- 已取消 -->
  <mini-button v-else-if="status === 3" color="gray" >
    {{isDriver ? '已取消' : '车主已取消'}}
  </mini-button>
  <mini-button v-else-if="status === 4" color="gray" >
    {{isCustomer ? '已取消' : '乘客已取消'}}
  </mini-button>
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
      const color = { customer: 'yellow', driver: 'blue' }
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
