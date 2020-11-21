<template>
  <div>
    <van-dropdown-menu class="dropdown" active-color="#FFCD00">
      <van-dropdown-item :value="values.area" @change="handleAreaChange" :options="areaOptions" />
      <van-dropdown-item :value="values.time" @change="handleTimeChange" :options="timeOptions" />
      <van-dropdown-item :value="values.cost" @change="handleCostChange" :options="costOptions" />
      <van-dropdown-item :value="values.seat" @change="handleSeatChange" :options="seatOptions" />
    </van-dropdown-menu>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from 'vant'

export default {
  components: {
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem
  },
  model: {
    prop: 'values',
    event: 'change'
  },
  props: {
    values: {
      type: Object,
      default: () => ({
        area: 0,
        time: 0,
        cost: 0,
        seat: 0
      })
    }
  },
  data: () => ({
    // 地区选项
    areaOptions: [
      { text: '全城', value: 0 },
      { text: '江北区', value: 1 },
      { text: '渝中区', value: 3 },
      { text: '南岸区', value: 4 },
      { text: '沙坪坝区', value: 5 }
    ],
    // 时间选项
    timeOptions: [
      { text: '全天', value: 0 },
      { text: '上午', value: 1 },
      { text: '中午', value: 2 },
      { text: '下午', value: 3 },
      { text: '晚上', value: 4 }
    ],
    // 车价选项
    costOptions: [
      { text: '不限车价', value: 0 },
      { text: '100元以下', value: 1 },
      { text: '100-300元', value: 2 },
      { text: '300-500元', value: 3 },
      { text: '500-1000元', value: 4 },
      { text: '1000元以上', value: 5 }
    ],
    // 座位选项
    seatOptions: [
      { text: '不限座位', value: 0 },
      { text: '靠窗', value: 1 },
      { text: '前排', value: 2 },
      { text: '后排', value: 3 }
    ]
  }),
  methods: {
    handleAreaChange (value) {
      this.values = Object.assign(this.values, { area: value })
      this.$emit('change', this.values)
    },
    handleTimeChange (value) {
      this.values = Object.assign(this.values, { time: value })
      this.$emit('change', this.values)
    },
    handleCostChange (value) {
      this.values = Object.assign(this.values, { cost: value })
      this.$emit('change', this.values)
    },
    handleSeatChange (value) {
      this.values = Object.assign(this.values, { seat: value })
      this.$emit('change', this.values)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
