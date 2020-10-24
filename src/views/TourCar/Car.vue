<template>
  <div>
    <common-filter :filter-list="filters" />
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
        />
      </template>
    </scroll-nav-bar>
  </div>
</template>

<script>
// import Vue from 'vue'
// import VueScrollTo from 'vue-scrollto'
import ScrollNavBar from '@/components/ScrollNavBar'
import Filter from '@/components/Filter'
import GoodsItem from '@/components/GoodsItem'
import filtersTourcar from '@/utils/filters-tourcar'

// Vue.use(VueScrollTo, {
//   container: '#car-scroll',
//   duration: 0
// })

export default {
  components: {
    'scroll-nav-bar': ScrollNavBar,
    'common-filter': Filter,
    'goods-item': GoodsItem
  },
  data: () => ({
    list: [],
    filters: filtersTourcar
  }),
  mounted () {
    const titles = ['全部', '大巴车', '中巴车', '商务MPV', 'SUV小汽车', '摩托', '小面包', '中面包', '小货车', '中货车', '大货车']
    const data = titles.map(item => ({
      title: item,
      list: new Array(4).fill({
        title: '小面包车',
        tip: '乘坐',
        price: '30'
      })
    }))
    this.list = data
  }
}
</script>

<style lang="scss" scoped>

</style>
