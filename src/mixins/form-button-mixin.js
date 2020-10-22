export default {
  data: () => ({
    submitButtonClass: ''
  }),
  methods: {
    getButtonClass () {
      const mainHeight = this.$refs.main.getBoundingClientRect().height
      const clientHeight = document.documentElement.clientHeight
      console.log('[计算高度]')
      this.submitButtonClass = clientHeight - mainHeight < 140 ? 'flow' : 'fixed'
    }
  },
  mounted () {
    this.getButtonClass()
    window.addEventListener('resize', this.getButtonClass, false)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getButtonClass, false)
  }
}
