<template>
  <div>
    <!-- 待确认 -->
    <mini-button
      v-if="status === 0"
      :color="buttonColor"
      @click="handleClick"
    >确认预约</mini-button>

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
    status: null
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
    // 按钮按颜色
    buttonColor () {
      return this.getIdentity() === 0 ? 'yellow' : 'green'
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
