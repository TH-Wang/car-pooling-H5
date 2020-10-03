// 负责 nav-bar-search 导航栏的状态变化
// 若置于顶部，则为 light 状态
// 若页面发生滚动，则为 dark 状态

export default {
  data: () => ({
    navbarMode: 'light'
  }),
  methods: {
    // search-nav-bar 导航栏的状态变化处理: light <=> dark
    handleWindowScroll (e) {
      var top = e.srcElement.scrollingElement.scrollTop
      if (top > 1 && this.navbarMode === 'light') {
        console.log('[页面滚动]')
        this.navbarMode = 'dark'
      } else if (top <= 1 && this.navbarMode === 'dark') {
        console.log('[回到顶部]')
        this.navbarMode = 'light'
      }
    },
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
    // 完成挂载时注册事件
    if ('menuVisibleId' in this) {
      window.addEventListener('click', this.windowClick, false)
    }
    window.addEventListener('scroll', this.handleWindowScroll, false)
  },
  beforeDestroy () {
    // 销毁前注销事件
    if ('menuVisibleId' in this) {
      window.removeEventListener('click', this.windowClick, false)
    }
    window.removeEventListener('scroll', this.handleWindowScroll, false)
  }
}
