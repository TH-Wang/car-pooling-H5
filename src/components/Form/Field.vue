<template>
  <div class="custom-form-item">
    <!-- 主体部分 -->
    <div class="custom-field">
      <div class="label">{{label}}</div>
      <div class="main">
        <input
          ref="input"
          :type="type"
          :disabled="readonly"
          :placeholder="placeholder || ''"
          v-model="val"
          :class="unrequired ? 'required' : ''"
          :style="inputStyle"
          :maxlength="maxLength"
          @input="handleInput"
          @blur="handleBlur"
        >
      </div>
      <slot name="suffix"></slot>

      <!-- 清除按钮 -->
      <van-icon
        v-show="showClear"
        name="clear"
        size=".14rem"
        color="#BFBFBF"
        style="margin-left:.08rem"
        @click="handleClear"
      />
    </div>

    <!-- 错误提示 -->
    <div class="error-message">{{errorMessage}}</div>
  </div>
</template>

<script>
import isEmpty from '@/utils/isEmpty'

export default {
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
    value: [String, Number],
    // 标签
    label: String,
    // 输入框类型
    type: {
      type: String,
      default: 'text'
    },
    // 占位文本
    placeholder: String,
    // 最大长度
    maxLength: {
      type: [String, Number],
      default: '999'
    },
    // 只读模式
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: false
    },
    // 输入框自定义样式
    'input-style': {
      type: String,
      default: ''
    },
    // 校验规则
    rules: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    val: '',
    unrequired: false,
    errorMessage: ''
  }),
  computed: {
    showClear () {
      return this.clearable && !isEmpty(this.val)
    }
  },
  methods: {
    // 清空输入框
    handleClear () {
      this.val = ''
      this.$refs.input.focus()
    },
    // 输入框发生变化
    handleInput (e) {
      // 消除必填的提示
      if (this.unrequired) this.unrequired = false
      if (this.errorMessage !== '') this.errorMessage = ''
      this.$emit('change', e.target.value)
    },
    // 输入框失焦
    handleBlur () {
      setTimeout(() => { this.validate() }, 30)
    },
    // 获取值
    getValue () {
      return this.val
    },
    // 设置值
    setValue (value) {
      this.val = value
    },
    // 字段校验
    validate () {
      // 如果当前字段不需要做校验，则跳过
      if (this.rules.length === 0) return true
      // 输入框的值
      const value = this.$refs.input.value
      const len = this.rules.length
      for (let i = 0; i < len; i++) {
        const item = this.rules[i]
        // 必填校验
        if (item.required) {
          if (isEmpty(value)) {
            this.unrequired = true
            return false
          }
        }
        // 自定义校验
        if (item.validator) {
          if (!item.validator(value)) {
            this.errorMessage = item.message
            return false
          }
        }
        // 正则校验
        if (item.pattern) {
          if (!item.pattern.test(value)) {
            this.errorMessage = item.message
            return false
          }
        }
      }
      return true
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
