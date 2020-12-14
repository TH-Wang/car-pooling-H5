<template>
  <div class="custom-form-item">
    <!-- 主体部分 -->
    <div class="custom-field" @click="showPicker = true">

      <!-- label -->
      <div class="label">{{label}}</div>

      <!-- 显示选择结果 -->
      <div :class="mainClass()">{{text()}}</div>

      <!-- 清除按钮 -->
      <van-icon
        v-show="canClear"
        name="clear"
        size=".14rem"
        color="#BFBFBF"
        style="margin-left:.08rem"
        @click.stop="clear"
      />

      <!-- 箭头 -->
      <van-icon
        name="arrow-down"
        size=".14rem"
        color="#BFBFBF"
        style="margin-left:.08rem"
      />
    </div>

    <!-- 时间选择器 -->
    <van-popup v-model="showPicker" round position="bottom" :lazy-render="false">
      <my-time-picker ref="timePicker" @confirm="handleChange"/>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant'
import moment from 'moment'
import MyTime from '@/components/Form/MyTime'

export default {
  components: {
    'van-popup': Popup,
    'my-time-picker': MyTime
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 表单标识
    name: {
      type: String
    },
    // 字段值
    value: [String, Number, Date],
    // 标签
    label: String,
    // 时间选择器类型
    type: {
      type: String,
      default: 'datetime'
    },
    // 默认的初始时间
    defaultTime: {
      type: [Date, String, Boolean],
      default: false
    },
    // 时间选择器的标题
    title: {
      type: String,
      default: '选择时间'
    },
    // 占位符
    placeholder: {
      type: String,
      default: ''
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否必选
    required: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    oriVal: moment().format('YYYY-MM-DD HH:mm'),
    val: null,
    minDate: new Date(),
    maxDate: moment().add(3, 'months')._d,
    showPicker: false,
    error: false
  }),
  computed: {
    canClear () {
      return this.clearable && this.val !== null
    }
  },
  methods: {
    text () {
      if (this.val === null) {
        if (this.error) return `请选择${this.label}`
        else return this.placeholder
      } else {
        return this.val
      }
    },
    mainClass () {
      const classNames = ['main']
      if (this.val === null) {
        if (this.error) classNames.push('required')
        else classNames.push('placeholder')
      }
      return classNames.join(' ')
    },
    handleChange (value) {
      this.showPicker = false
      this.oriVal = value
    },
    formatter (time) {
      let formatDate = ''
      const momentTime = moment(time)
      const day = momentTime.get('date')
      if (day === moment().get('date')) formatDate = '今天'
      else if (day === moment().add(1, 'day').get('date')) formatDate = '明天'
      else if (day === moment().add(2, 'day').get('date')) formatDate = '后天'
      else formatDate = momentTime.format('MM月DD日')
      return `${formatDate} ${momentTime.format('HH:mm')}`
    },
    clear () {
      this.oriVal = new Date()
      if (this.required) this.error = true
    },
    // 获取值
    getValue () {
      return this.oriVal
    },
    setValue (value) {
      this.oriVal = value
      this.$refs.timePicker.setValue(value)
    },
    validate () {
      if (this.required && this.val === null) {
        this.error = true
        return false
      } else return true
    }
  },
  mounted () {
    if (this.defaultTime !== false) {
      this.val = this.defaultTime
    } else this.val = this.formatter(this.oriVal)
  },
  watch: {
    oriVal: function (newVal) {
      const formatDate = this.formatter(newVal)
      this.val = formatDate
      this.$emit('change', formatDate)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/form.scss';
</style>
