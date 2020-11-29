<template>
  <div>
    <!-- 乘客等待车主确认 -->
    <mini-button
      v-if="status === 0 && isCustomer"
      color="red"
      @click="handleClick"
    >待车主确认</mini-button>

    <!-- 乘客 -->

    <!-- 司机或乘客已确认 -->
    <mini-button
      v-if="status === 1 || status === 2"
      :color="buttonColor"
      :menu="menu"
      :menuVisible="menuVisible"
      @click="handleClick"
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
      /**
       * 乘客确定
       * 乘客等待车主确定
       *
       * 车主确定
       * 车主等待乘客确定
       */
      return this.identity === 'customer'
    },
    // 车主
    isDriver () {
      return this.identity === 'driver'
    }
  },
  methods: {
    // 点击按钮事件
    handleClick () {
      // 切换菜单的显示状态
      if (this.status > 0) this.menuVisible = !this.menuVisible
      // 触发确认预约事件
      else {
        const status = this.getIdentity() === 0 ? 2 : 1
        this.$emit('confirm', status)
      }
    },
    // 点击取消预约
    handleCancel () {
      const status = this.getIdentity() === 0 ? 4 : 3
      this.$emit('cancel', status)
    },
    // 身份判断：0乘客，1车主
    getIdentity () {
      return this.user.info.carstatus === 'YES' ? 1 : 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
