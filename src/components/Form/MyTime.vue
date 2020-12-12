<template>
  <div class="container">
    <van-picker
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
      this.$emit('confirm', moment(result))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
