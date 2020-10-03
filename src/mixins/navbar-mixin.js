// 负责 nav-bar-search 导航栏的状态变化
// 若置于顶部，则为 light 状态
// 若页面发生滚动，则为 dark 状态

export default {
  data: () => ({
    navbarMode: 'light'
  }),
  methods: {
    // 状态变化处理
    handleWindowScroll (e) {
      var top = e.srcElement.scrollingElement.scrollTop
      if (top > 1 && this.navbarMode === 'light') {
        console.log('[页面滚动]')
        this.navbarMode = 'dark'
      } else if (top <= 1 && this.navbarMode === 'dark') {
        console.log('[回到顶部]')
        this.navbarMode = 'light'
      }
    }
  },
  mounted () {
    // 挂载时注册 scroll 事件
    window.addEventListener('scroll', this.handleWindowScroll, false)
  },
  beforeDestroy () {
    // 销毁前注销 scroll 事件
    window.removeEventListener('scroll', this.handleWindowScroll, false)
  }
}
