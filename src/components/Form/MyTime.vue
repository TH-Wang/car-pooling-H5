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
      const dateIdx = this.getDateIndex(oriTime.format('YYYY-MM-DD'), this.dateList)
      const hourIdx = this.getDateIndex(oriTime.format('HH'), this.dateList[dateIdx].children)
      console.log(oriTime.format('HH'))
      console.log([dateIdx, hourIdx])
      const minuteList = this.dateList[dateIdx].children[hourIdx].children
      const minuteIdx = this.getDateIndex(oriTime.format('mm'), minuteList)
      this.$refs.picker.setIndexes([dateIdx, hourIdx, minuteIdx])
    },
    getDateIndex (item, data) {
      return data.findIndex(i => i.date === item)
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
