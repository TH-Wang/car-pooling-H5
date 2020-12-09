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
 * resDataHandler: func (请求成功的回调，自己处理数据)
 *    @params res: { list: 数据列表, total: 数据总量 } (返回值)
 */

import { getCar, getCommonRoute } from '@/api'
import { isEmpty, cloneDeep } from 'lodash'

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
    filters: {},
    // 列表数据
    list: [],
    // 快捷路线列表
    quickList: []
  }),
  methods: {
    // 筛选条件发生改变
    handleFilterChange (filters) {
      this.startPage = 1
      this.filters = filters
      this.handleListLoad(true)
    },
    // 请求列表
    async handleListLoad (deep) {
      if (this.total === this.list.length && !deep) return

      const { startPage, pageSize } = this

      // 基础参数
      const data = cloneDeep({ startPage, pageSize })

      // 如果该组件需要额外参数，则直接获取并合并
      if (this.getRequestDatas) {
        // data = { ...data, ...this.getRequestDatas() }
        Object.assign(data, this.getRequestDatas())
      }

      // 如果有过滤参数
      if (!isEmpty(this.filters)) {
        // data = { ...data, ...cloneDeep(this.filters) }
        Object.assign(data, cloneDeep(this.filters))
      }

      // 组件的自定义api
      const res = this.reqApi
        ? await this.reqApi(data)
        : await getCar(data)

      // 如果自己处理返回值
      const mainData = this.resDataHandler
        ? this.resDataHandler(res)
        : res.data.data

      const { list, total } = mainData

      // 如果是首页，则直接设置list，否则插入到尾部
      if (this.startPage === 1) {
        this.list = list
      } else {
        this.list.push(...list)
      }

      this.$nextTick(() => {
        this.total = total
        this.startPage++
        this.loading = false
        if (this.list.length === this.total) {
          this.finished = true
        }
      })
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
    async handleRetry () {
      this.startPage = 1
      this.$toast.loading('加载中...')
      await this.handleListLoad()
      this.$toast.clear()
    },
    // 点击重试（快捷路线列表）
    async handleRetryQuick () {
      this.startPage = 1
      this.$toast.loading('加载中...')
      await this.handleQuickListLoad()
      this.$toast.clear()
    },
    // 处理下拉刷新
    async handlePullRefresh () {
      this.startPage = 1
      this.finished = false
      this.$nextTick(async () => {
        await this.handleListLoad(true)
        this.refresh = false
      })
    }
  },
  mounted: async function () {
    try {
      if (this.notReqOnMounted) return
      if (this.needQuick) {
        await this.handleQuickListLoad()
      }
      await this.handleListLoad()
    } catch (error) {
      console.log(error)
    }
  }
}
