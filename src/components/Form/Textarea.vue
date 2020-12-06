<template>
  <div class="custom-form-item">
    <div class="custom-textarea">
      <div class="label">
        <div>{{label}}</div>
        <div class="link link-default" @click="$emit('link')">{{link}}</div>
      </div>
      <div class="main" @click="$emit('click')">
        <slot v-if="custom"></slot>
        <textarea
          v-else
          v-model="val"
          :class="textareaClass"
          :rows="rows"
          :disabled="readonly"
          :placeholder="placeText"
          @blur="handleBlur"
        ></textarea>
      </div>
    </div>
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
    // 标签
    label: String,
    // 占位文本
    placeholder: String,
    // 行数
    rows: {
      type: String,
      default: '2'
    },
    // 右上角链接按钮
    link: {
      type: String,
      default: ''
    },
    // 只读模式
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否必填
    required: {
      type: Boolean,
      default: false
    },
    // 是否自己填充内容
    custom: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    val: '',
    error: false
  }),
  computed: {
    textareaClass () {
      return this.error ? 'textarea-error' : ''
    },
    placeText () {
      return this.error ? `请输入${this.label}` : this.placeholder
    }
  },
  methods: {
    // 清空表单内容
    clear () {
      this.val = ''
    },
    // 失焦
    handleBlur () {
      if (this.required && isEmpty(this.val)) {
        this.error = true
      }
    },
    // 获取值
    getValue () {
      return this.val
    },
    setValue (value) {
      this.val = value
    },
    validate () {
      if (this.required && isEmpty(this.val)) {
        this.error = true
        return false
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

.link-default{
  color: $tip-text;
}
</style>
