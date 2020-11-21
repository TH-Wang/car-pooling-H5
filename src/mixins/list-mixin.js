// 负责列表的筛选和动态加载数据
import { isEmpty } from 'lodash'
import store from '@/store'
import { getCar, getCommonRoute } from '@/api'

export default {
  data: () => ({
    // 当前页码
    startPage: 1,
    // 每页数据量
    pageSize: 10,
    // 记录页面总数据数
    total: 0,
    // 是否在下拉刷新
    isRefresh: false,
    // 加载
    loading: false,
    // 全部加载完毕
    finished: false,
    // 加载失败
    error: false,
    // 筛选选项数据
    filters: {
      area: 0,
      time: 0,
      cost: 0,
      seat: 0
    },
    // 列表数据
    list: [],
    // 快捷路线列表
    quickList: []
  }),
  methods: {
    // 筛选条件发生改变
    handleFilterChange () {
      console.log(JSON.stringify(this.filters))
    },
    // 请求列表
    async handleListLoad () {
      const _this_ = this

      const data = {
        ..._this_.getRequestDatas(),
        startPage: _this_.startPage,
        pageSize: _this_.pageSize
      }

      // 地区id
      data.county = isEmpty(store.state.position.county)
        ? store.state.position.city.code
        : store.state.position.county.code

      const res = await getCar(data)
      this.list.concat(res.data.data.list)
      this.startPage++
    },
    // 请求快捷路线
    async handleQuickListLoad () {
      const data = this.getRequestQuickDatas()
      const res = await getCommonRoute(data)
      this.quickList = res.data.data.list
    },
    // 点击重试（订单列表）
    handleRetry () {
      this.$toast.loading({
        message: '加载中...',
        duration: 1000
      })
      this.handleListLoad()
    },
    // 点击重试（快捷路线列表）
    handleRetryQuick () {
      this.$toast.loading({
        message: '加载中...',
        duration: 1000
      })
      this.handleQuickListLoad()
    },
    // 处理下拉刷新
    handlePullRefresh () {
      var _this_ = this
      setTimeout(() => {
        _this_.isRefresh = false
      }, 1000)
    }
  },
  mounted: async function () {
    const position = store.state.position
    if (isEmpty(position.city) && isEmpty(position.county)) {
      await this.$dialog.alert({
        title: '位置信息',
        message: '请先选择城市，然后向您推荐当地的拼单信息!'
      })
      this.$router.push('/common/city')
      return
    }
    await this.handleListLoad()
    await this.handleQuickListLoad()
  },
  watch: {
    position (val) {
      console.log(val)
    }
  }
}
