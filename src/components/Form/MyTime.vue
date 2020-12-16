<template>
  <div class="container">
    <van-picker
      ref="picker"
      show-toolbar
      title="选择时间"
      :columns="dateList"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import { Picker } from 'vant'
import moment from 'moment'
import timeGenerator from './timeGenerator'

export default {
  components: {
    'van-picker': Picker
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dateList: timeGenerator()
  }),
  methods: {
    handleConfirm (values, indexs) {
      const list = this.dateList
      const [date, hour, minute] = indexs
      const result = list[date].date + ' ' +
        list[date].children[hour].date + ':' +
        list[date].children[hour].children[minute].date
      this.$emit('confirm', moment(result).format('YYYY-MM-DD HH:mm'))
    },
    setValue (time) {
      const oriTime = moment(time)
      // 日期索引
      const dateIdx = this.getDateIndex(oriTime.format('YYYY-MM-DD'), this.dateList)
      // 小时索引
      const hourIdx = this.getDateIndex(oriTime.format('HH'), this.dateList[dateIdx || 0].children)
      // 分钟索引
      const minuteList = this.dateList[dateIdx || 0].children[hourIdx || 0].children
      const minuteIdx = this.getDateIndex(oriTime.format('mm'), minuteList)
      this.$refs.picker.setIndexes([dateIdx, hourIdx, minuteIdx])
    },
    getDateIndex (item, data) {
      const idx = data.findIndex(i => i.date === item)
      return idx === -1 ? false : idx
    }
  },
  watch: {
    value: function (newVal) {
      console.log(newVal)
      this.setValue(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
