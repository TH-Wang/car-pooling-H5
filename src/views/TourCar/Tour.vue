<template>
  <div>
    <order-filter :filter-list="filters" />
    <scroll-nav-bar
      :list="list"
      height="calc(100vh - 140px)"
      scroll-key="tour"
      id="tour-scroll"
    >
      <template v-slot="props">
        <goods-item
          v-for="item in props.list"
          :key="item.id"
          :record="item"
          size="small"
          style="margin-top: 0"
          @click="$router.push('/common/tour/detail?id=' + item.id)"
        />
      </template>
    </scroll-nav-bar>
  </div>
</template>

<script>
// import Vue from 'vue'
// import VueScrollTo from 'vue-scrollto'
import { getTourTypeList, getTourList } from '@/api'
import ScrollNavBar from '@/components/ScrollNavBar'
import { OrderFilter } from '@/components/Filter/index.js'
import GoodsItem from '@/components/GoodsItem'
import filtersTourcar from '@/utils/filters-tourcar'

// Vue.use(VueScrollTo, {
//   container: '#tour-scroll',
//   duration: 0
// })

export default {
  components: {
    'scroll-nav-bar': ScrollNavBar,
    'order-filter': OrderFilter,
    'goods-item': GoodsItem
  },
  data: () => ({
    typeList: [],
    tourList: [],
    list: [],
    filters: filtersTourcar
  }),
  methods: {
    // 处理请求
    async handleReq () {
      // 请求所有分类
      const resType = await getTourTypeList()
      this.typeList = resType.data.data
      // 请求所有列表
      const res = await getTourList()
      this.tourList = res.data.data
      this.handleList()
    },
    // 组装列表
    handleList () {
      const obj = {}
      this.typeList.forEach(item => {
        obj[item.id] = { title: item.name, list: [] }
      })
      this.tourList.forEach(item => {
        obj[item.tourNameId].list.push(item)
      })
      const result = []
      for (const key in obj) {
        result.push(obj[key])
      }
      console.log(result)
      this.list = result
    }
  },
  created: async function () {
    this.handleReq()
  }
  // mounted () {
  //   const titles = ['全部', '川藏线', '四川', '西藏', '云南', '新疆', '青海/甘肃', '自驾游新路', '新老客户回馈路线', '出行须知']
  //   const data = titles.map((item, index) => {
  //     let name = ''
  //     if (index === 0) name = '故宫博物馆感受文化之旅'
  //     else if (index >= 1 && index <= 6) name = `${item}三日游`
  //     else name = item
  //     return { title: item, list: new Array(6).fill({ title: name, price: 1000 }) }
  //   })
  //   this.list = data
  // }
}
</script>

<style lang="scss" scoped>

</style>
