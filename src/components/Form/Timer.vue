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
        v-show="clear"
        name="clear"
        size=".14rem"
        color="#BFBFBF"
        style="margin-left:.08rem"
        @click.stop="handleClear"
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
    <van-popup v-model="showPicker" round position="bottom">
      <van-datetime-picker
        v-model="value"
        :title="title"
        @confirm="handleChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup, DatetimePicker } from 'vant'

export default {
  components: {
    'van-popup': Popup,
    'van-datetime-picker': DatetimePicker
  },
  props: {
    // 表单标识
    name: {
      type: String
    },
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
    value: null,
    showPicker: false,
    error: false,
    minData: null,
    maxDate: null
  }),
  computed: {
    clear () {
      return this.clearable && this.value !== null
    }
  },
  methods: {
    text () {
      if (this.value === null) {
        if (this.error) return `请选择${this.label}`
        else return this.placeholder
      } else {
        return this.value.toString()
      }
    },
    mainClass () {
      const classNames = ['main']
      if (this.value === null) {
        if (this.error) classNames.push('required')
        else classNames.push('placeholder')
      }
      return classNames.join(' ')
    },
    handleChange (value) {
      this.showPicker = false
      this.value = value
    },
    handleClear () {
      this.value = null
      if (this.required) this.error = true
    },
    // 获取值
    getValue () {
      return this.value
    },
    setValue (value) {
      this.value = value
    },
    validate () {
      if (this.required && this.value === null) {
        this.error = true
        return false
      } else return true
    }
  },
  mounted () {
    if (this.defaultTime !== false) {
      this.value = this.defaultTime
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/form.scss';
</style>
