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
    filterType: ['area', 'time', 'cost', 'seat'],
    values: {
      area: 0,
      time: 0,
      cost: 0,
      seat: 0
    },
    title: {
      area: '地区',
      time: '时间',
      cost: '车价',
      seat: '余座'
    },
    options: {
      area: [],
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
    ...mapState(['filters', 'position']),
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
        const { area, time, cost, seat } = this.values
        const filterData = {}
        if (area !== 0) filterData.county = area
        if (cost !== 0) filterData.carPriceSort = cost
        if (seat !== 0) filterData.remainingSeat = this.options.seat.find(i => i.value === seat).seat
        if (time !== 0) filterData.startTime = this.options.time.find(i => i.value === time).date
        this.$emit('change', filterData)
      })
    }
  },
  created: async function () {
    if (
      !this.unGeoLocation &&
      this.filters.currentCityCode !== this.position.city.code
    ) {
      await this.updateAreaOptions(this.position.city.code)
    }
    if (moment() !== this.filters.currentDate) {
      this.updateDateOptions()
    }
    this.options.area = this.filters.areaOptions
    this.options.time = this.filters.timeOptions
  },
  watch: {
    'position.city': async function (newVal) {
      await this.updateAreaOptions(newVal.code)
      this.options.area = this.filters.areaOptions
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
