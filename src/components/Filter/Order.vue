<template>
  <div>
    <van-dropdown-menu class="dropdown" active-color="#FFCD00">

      <van-dropdown-item :title="getTitle('time')" :value="values.time"
        @change="handleChange($event, 'time')" :options="options.time" />

      <van-dropdown-item :title="getTitle('seat')" :value="values.seat"
        @change="handleChange($event, 'seat')" :options="options.seat" />

      <van-dropdown-item :title="getTitle('font')" :value="values.font"
        @change="handleChange($event, 'font')" :options="options.font" />

      <van-dropdown-item :title="getTitle('sort')" :value="values.sort"
        @change="handleChange($event, 'sort')" :options="options.sort" />

    </van-dropdown-menu>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from 'vant'
import { cloneDeep } from 'lodash'

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
    values: {
      time: 0,
      seat: 0,
      font: 0,
      sort: 0
    },
    title: {
      time: '出发时间',
      seat: '余座',
      font: '字体',
      sort: '排序'
    },
    options: {
      time: [
        { text: '全部', value: 0 },
        { text: '今天(01日)', value: 1 },
        { text: '明天(02日)', value: 2 },
        { text: '后天(04日)', value: 3 }
      ],
      seat: [
        { text: '全部', value: 0 },
        { text: '2座以上', value: 1 },
        { text: '3座以上', value: 2 },
        { text: '4座以上', value: 3 }
      ],
      font: [
        { text: '正常', value: 0 },
        { text: '稍小', value: 1 },
        { text: '稍大', value: 2 },
        { text: '特大', value: 3 }
      ],
      sort: [
        { text: '默认排序', value: 0 },
        { text: '最早出发', value: 1 },
        { text: '距离最近', value: 2 }
      ]
    }
  }),
  methods: {
    // 获取筛选的标题
    getTitle (type) {
      return this.values[type] === 0
        ? this.title[type]
        : this.options[type].find(i => i.value === this.values[type]).text
    },
    // 筛选选项发生改变
    handleChange (value, type) {
      const newVal = cloneDeep(this.values)
      newVal[type] = value
      this.$emit('change', newVal)
      this.values[type] = value
    }
  },
  mounted () {
    console.log(this.values)
  }
}
</script>

<style lang="scss" scoped>

</style>
