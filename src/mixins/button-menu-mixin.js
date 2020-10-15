export default {
  methods: {
    // 点击屏幕事件 -- 关闭mini按钮的下拉菜单
    windowClick (e) {
      const className = e.target.className
      // className中有 MINI_BUTTON_MENU_SAFENODE 的则为下拉菜单的安全节点
      if (
        !/MINI_BUTTON_MENU_SAFENODE/g.test(className) &&
        this.menuVisibleId !== null
      ) {
        this.menuVisibleId = null
      }
    }
  },
  mounted () {
    window.addEventListener('click', this.windowClick, false)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.windowClick, false)
  }
}
