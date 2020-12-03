<template>
  <div class="custom-form-item">
    <!-- 主体部分 -->
    <div class="custom-field" @click="visible = true">

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

    <!-- 选择表 -->
    <van-popup round position="bottom" v-model="visible">
      <van-area
        :area-list="areaList"
        :title="title"
        :columns-num="3"
        @confirm="handleChange"
        @cancel="visible = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Area, Popup } from 'vant'
import areaList from '@/utils/areaList.js'

export default {
  components: {
    'van-popup': Popup,
    'van-area': Area
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
    // 标题
    title: {
      type: String,
      default: '选择省市区'
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
    val: null,
    visible: false,
    error: false,
    areaList: areaList
  }),
  computed: {
    canClear () {
      return this.clearable && this.val !== null
    },
    regionText () {
      return this.val[1].name + ' ' + this.val[2].name
    }
  },
  methods: {
    // 显示结果字符串
    text () {
      if (this.val === null) {
        if (this.error) return `请选择${this.label}`
        else return this.placeholder
      } else {
        return this.val[1].name + ' ' + this.val[2].name
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
      this.visible = false
      this.val = value
    },
    clear () {
      this.val = null
      if (this.required) this.error = true
    },
    // 获取值
    getValue () {
      return this.val
    },
    setValue (value) {
      this.val = value
    },
    validate () {
      if (this.required && this.val === null) {
        this.error = true
        return false
      } else return true
    }
  },
  watch: {
    val: function (newVal) {
      this.$emit('change', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/form.scss';
</style>
