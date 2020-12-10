<template>
  <div class="custom-input">
    <!-- 输入框主体 -->
    <div class="main">
      <div class="slot">
        <slot name="prefix" />
      </div>
      <!-- 输入框 -->
      <input
        ref="input"
        :type="type"
        :disabled="readonly"
        :placeholder="placeholder || ''"
        v-model="val"
        :class="unrequired ? 'unrequired' : ''"
        :style="inputStyle"
        :maxlength="maxLength"
        @input="handleInput"
        @blur="validate"
      >
      <!-- 清空按钮 -->
      <van-icon
        v-show="showClear"
        style="margin-left:.10rem"
        name="clear"
        size=".16rem"
        color="#E1E1E1"
        @click="clear"
      />
      <div class="slot">
        <slot name="suffix"/>
      </div>
    </div>

    <!-- 错误提示 -->
    <div class="error">{{errorMessage}}</div>
  </div>
</template>

<script>
import isEmpty from '@/utils/isEmpty'

export default {
  name: 'custom-input',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 输入框的值
    value: {
      type: [String, Number],
      default: ''
    },
    // 表单标识
    name: {
      type: String
    },
    // 输入框类型
    type: {
      type: String,
      default: 'text'
    },
    // 占位文本
    placeholder: String,
    // 最大长度
    maxLength: {
      type: String,
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
    // 输入框显示的文本格式
    formatter: Function,
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
    text () {
      return this.formatter ? this.formatter(this.val) : this.val
    },
    showClear () {
      return this.clearable && !isEmpty(this.val)
    }
  },
  methods: {
    // 清空输入框
    clear () {
      this.val = ''
      this.$refs.input.focus()
    },
    handleInput (e) {
      // 消除必填的提示
      if (this.unrequired) this.unrequired = false
      if (this.errorMessage !== '') this.errorMessage = ''
      // this.val = e.target.value
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
      if (this.rules.length === 0) return
      // 输入框的值
      const value = this.val
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
          if (!new RegExp(item.pattern).test(value)) {
            this.errorMessage = item.message
            return false
          }
        }
      }
      return true
    }
  },
  watch: {
    val: function (newValue) {
      this.$emit('change', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-input{
  margin: 0 .32rem;
  margin-top: .15rem;

  .main{
    height: .58rem;
    border-bottom: solid 1px $normal-text;
    @include flex ($align: center);
    position: relative;

    input{
      width: 100%;
      flex: 1;
      background-color: transparent;
      border: none;
      font-size: .16rem;
    }

    // 触发 "必填" 校验规则的错误提示
    .unrequired::placeholder{
      color: #ee0a24;
    }

    .slot{
      flex-shrink: 0;
    }
  }

  // 错误提示
  .error{
    margin-top: 2px;
    @include font (.12rem, #ee0a24)
  }
}
</style>
