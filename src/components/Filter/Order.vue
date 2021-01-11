<template>
  <div>
    <van-dropdown-menu class="dropdown" active-color="#FFCD00">

      <van-dropdown-item
        v-for="(item, index) in filterType"
        :key="index"
        :title="getTitle(item)"
        :value="values[item]"
        @change="handleChange($event, item)"
        :options="options[item]"
      />

    </van-dropdown-menu>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { DropdownMenu, DropdownItem } from 'vant'

export default {
  components: {
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem
  },
  model: {
    prop: 'vals',
    event: 'change'
  },
  props: {
    vals: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    filterType: ['flag', 'time', 'cost', 'seat'],
    values: {
      flag: 0,
      time: 0,
      cost: 0,
      seat: 0
    },
    title: {
      flag: '全城',
      time: '时间',
      cost: '车价',
      seat: '余座'
    },
    options: {
      flag: [
        { text: '全城', value: 0 },
        { text: '距离最近', value: 1 },
        { text: '相似度最高', value: 2 }
      ],
      time: [],
      cost: [
        { text: '默认', value: 0 },
        { text: '从低到高', value: 1 },
        { text: '从高到低', value: 2 }
      ],
      seat: [
        { text: '全部', value: 0 },
        { text: '2座以上', value: 1, seat: 2 },
        { text: '3座以上', value: 2, seat: 3 },
        { text: '4座以上', value: 3, seat: 4 }
      ]
    }
  }),
  computed: {
    ...mapState(['filters', 'position', 'search']),
    ...mapGetters(['unGeoLocation']),
    remainingSeat () {
      return this.options.seat.find(i => i.value === this.values.seat).seat
    }
  },
  methods: {
    ...mapMutations(['updateDateOptions']),
    ...mapActions(['updateAreaOptions']),
    // 获取筛选的标题
    getTitle (type) {
      return this.values[type] === 0
        ? this.title[type]
        : this.options[type].find(i => i.value === this.values[type]).text
    },
    // 筛选选项发生改变
    handleChange (value, type) {
      this.values[type] = value
      this.$nextTick(() => {
        const { flag, time, cost, seat } = this.values
        const filterData = {}
        if (flag !== 0) filterData.flag = flag
        if (cost !== 0) filterData.carPriceSort = cost
        if (seat !== 0) filterData.remainingSeat = this.options.seat.find(i => i.value === seat).seat
        if (time !== 0) filterData.startTime = this.options.time.find(i => i.value === time).date
        this.$emit('change', filterData)
      })
    },
    // 更新flag
    updateFlag () {
      // 确定falg
      const { startAddr, endAddr } = this.search
      if (startAddr.name && endAddr.name) {
        this.values.flag = 2
      } else if (this.position.selected.county.name) {
        this.values.flag = 1
      } else this.values.flag = 0
    }
  },
  created: async function () {
    // if (
    //   !this.unGeoLocation &&
    //   this.filters.currentCityCode !== this.position.city.code
    // ) {
    //   await this.updateAreaOptions(this.position.city.code)
    // }
    // this.options.area = this.filters.areaOptions
    if (moment() !== this.filters.currentDate) {
      this.updateDateOptions()
    }
    this.options.time = this.filters.timeOptions
    this.updateFlag()
  },
  watch: {
    'search.startAddr.name': function () {
      this.updateFlag()
    },
    'search.endAddr.name': function () {
      this.updateFlag()
    },
    'position.county.name': function () {
      this.updateFlag()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
