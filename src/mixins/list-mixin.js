/**
 * 负责列表的筛选和动态加载数据
 *
 * 核心数据：
 * list: Array (列表)
 * filters: Object [可选] (筛选条件)
 * 其他请翻阅 data ，同名可覆盖
 *
 * 调用接口：
 * handleListLoad: func (加载列表)
 * handleRetry: func (点击重试)
 * handlePullRefresh: func (下拉刷新)
 *
 * 自定义接口：
 * reqApi: func (自定义发送请求的api函数)
 * getRequestDatas: func (返回除页码、每页数据量外的其他参数)
 *    @returns object
 */

import { getCar, getCommonRoute } from '@/api'

export default {
  data: () => ({
    // 当前页码
    startPage: 1,
    // 每页数据量
    pageSize: 10,
    // 记录页面总数据数
    total: null,
    // 是否在下拉刷新
    refresh: false,
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
      this.handleListLoad(1)
    },
    // 请求列表
    async handleListLoad (page) {
      if (this.list.length === this.total) {
        this.finished = true
        return
      }

      const _this_ = this

      // 基础参数
      const data = {
        startPage: page || _this_.startPage,
        pageSize: _this_.pageSize
      }

      // 如果该组件需要额外参数，则直接获取并合并
      if (this.getRequestDatas) {
        Object.assign(data, _this_.getRequestDatas())
      }

      const res = this.reqApi
        ? await this.reqApi(data)
        : await getCar(data)

      const { list, total } = res.data.data
      this.list.push(...list)
      this.total = total
      this.startPage++
    },
    // 请求快捷路线
    async handleQuickListLoad () {
      // 基础参数
      const { startPage, pageSize } = this
      const data = { startPage, pageSize }

      // 自定义额外参数
      if (this.getRequestQuickDatas) {
        Object.assign(data, this.getRequestQuickDatas())
      }
      // 发送请求
      const res = await getCommonRoute(data)
      this.quickList = res.data.data.list
    },
    // 点击重试（订单列表）
    handleRetry () {
      this.$toast.loading({
        message: '加载中...',
        duration: 1000
      })
      this.handleListLoad(1)
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
      setTimeout(() => {
        this.refresh = false
      }, 1000)
      this.handleListLoad(1)
    }
  },
  mounted: async function () {
    await this.handleListLoad()
    if (this.needQuick) {
      await this.handleQuickListLoad()
    }
  }
}
