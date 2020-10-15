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
        // console.log('[页面滚动]')
        this.navbarMode = 'dark'
      } else if (top <= 1 && this.navbarMode === 'dark') {
        // console.log('[回到顶部]')
        this.navbarMode = 'light'
      }
    }
  },
  mounted () {
    // 完成挂载时注册事件
    window.addEventListener('scroll', this.handleWindowScroll, false)
  },
  beforeDestroy () {
    // 销毁前注销事件
    window.removeEventListener('scroll', this.handleWindowScroll, false)
  }
}
