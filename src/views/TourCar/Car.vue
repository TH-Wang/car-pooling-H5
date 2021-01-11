<template>
  <div>
    <order-filter :filter-list="filters" />
    <scroll-nav-bar
      :list="list"
      height="calc(100vh - 140px)"
      scroll-key="car"
      id="car-scroll"
    >
      <template v-slot="props">
        <goods-item
          v-for="item in props.list"
          :key="item.id"
          :record="item"
          size="small"
          buttonText="包车"
          priceSuffix="起"
          showTip
          style="margin-top: 0"
          @click="$router.push('/common/car/detail?id=' + item.id)"
        />
      </template>
    </scroll-nav-bar>
  </div>
</template>

<script>
// import Vue from 'vue'
// import VueScrollTo from 'vue-scrollto'
import { getBusTypeList, getBusList } from '@/api'
import ScrollNavBar from '@/components/ScrollNavBar'
import { OrderFilter } from '@/components/Filter/index.js'
import GoodsItem from '@/components/GoodsItem'
import filtersTourcar from '@/utils/filters-tourcar'

// Vue.use(VueScrollTo, {
//   container: '#car-scroll',
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
      const resType = await getBusTypeList()
      this.typeList = resType.data.data
      // 请求所有列表
      const res = await getBusList()
      this.tourList = res.data.data
      this.handleList()
    },
    // 组装列表
    handleList () {
      const obj = {}
      this.typeList.forEach(item => {
        obj[item.id] = { title: item.typeName, list: [] }
      })
      this.tourList.forEach(item => {
        obj[item.carTypeId].list.push(item)
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
  //   const titles = ['全部', '大巴车', '中巴车', '商务MPV', 'SUV小汽车', '摩托', '小面包', '中面包', '小货车', '中货车', '大货车']
  //   const data = titles.map((item, index) => {
  //     const name = index === 0 ? '小面包车' : item
  //     return { title: item, list: new Array(6).fill({ title: name, price: 30 }) }
  //   })
  //   this.list = data
  // }
}
</script>

<style lang="scss" scoped>

</style>
