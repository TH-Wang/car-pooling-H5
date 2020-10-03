// 负责列表的筛选和动态加载数据

export default {
  data: () => ({
    // 列表数据
    list: [],
    // 记录页面总数据数
    total: 0,
    // 加载
    loading: false,
    // 全部加载完毕
    finished: false,
    // 加载失败
    error: false,
    // 地区选择项
    areaValue: 0,
    // 地区下拉菜单
    areaOptions: [
      { text: '全城', value: 0 },
      { text: '江北区', value: 1 },
      { text: '渝中区', value: 3 },
      { text: '南岸区', value: 4 },
      { text: '沙坪坝区', value: 5 }
    ],
    // 时间选择像
    timeValue: 0,
    // 时间下拉菜单
    timeOptions: [
      { text: '全天', value: 0 },
      { text: '上午', value: 1 },
      { text: '中午', value: 2 },
      { text: '下午', value: 3 },
      { text: '晚上', value: 4 }
    ],
    // 车价选择项
    priceValue: 0,
    // 车价下拉菜单
    priceOptions: [
      { text: '不限车价', value: 0 },
      { text: '100元以下', value: 1 },
      { text: '100-300元', value: 2 },
      { text: '300-500元', value: 3 },
      { text: '500-1000元', value: 4 },
      { text: '1000元以上', value: 5 }
    ],
    // 座位选择项
    seatValue: 0,
    // 座位下拉菜单
    seatOptions: [
      { text: '不限座位', value: 0 },
      { text: '靠窗', value: 1 },
      { text: '前排', value: 2 },
      { text: '后排', value: 3 }
    ]
  }),
  methods: {
    createList (count) {
      const result = []
      const date = Date.now()
      for (let i = 0; i < count; i++) {
        result.push({ id: `${date}-${i}` })
      }
      return result
    },
    // 列表加载
    handleListLoad () {
      setTimeout(() => {
        if (this.total >= 16) {
          this.loading = false
          this.finished = true
          return
        }

        this.list.push(...this.createList(4))
        this.total += 4
        console.log('[加载列表]')
        this.loading = false
      }, 2000)
    }
  },
  mounted: function () {
    console.log('开始请求:' + this.url)
    this.list = this.createList(4)
    this.total = 4
  }
}
