<template>
  <div>
    <!-- 输入框 -->
    <custom-field
      v-if="options.type === 'field'"
      :name="options.name"
      :label="options.label"
      :type="options.inputType"
      :placeholder="options.placeholder"
      :maxLength="options.maxLength"
      :readonly="options.readonly"
      :clearable="options.clearable"
      :input-style="options.inputStyle"
      :rules="options.rules"
    />

    <!-- 文本域 -->
    <custom-textarea
      v-else-if="options.type === 'textarea'"
      :name="options.name"
      :label="options.label"
      :placeholder="options.placeholder"
      :rows="options.rows"
      :link="options.link"
      :linkPath="options.linkPath"
      :readonly="options.readonly"
      :required="options.required"
    />

    <!-- 下拉菜单选择器 -->
    <custom-picker
      v-else-if="options.type === 'picker'"
      :name="options.name"
      :label="options.label"
      :columns="options.columns"
      :defaultIndex="options.defaultIndex"
      :placeholder="options.placeholder"
      :clearable="options.clearable"
      :required="options.required"
    />

    <!-- 时间选择器 -->
    <custom-timer
      v-else-if="options.type === 'timer'"
      :name="options.name"
      :label="options.label"
      :type="options.timerType"
      :defaultTime="options.defaultTime"
      :placeholder="options.placeholder"
      :clearable="options.clearable"
      :required="options.required"
    />
  </div>
</template>

<script>
// import { Field, Picker, Textarea, Timer } from './index.js'
import Field from './Field'
import Textarea from './Textarea'
import Picker from './Picker'
import Timer from './Timer'

export default {
  components: {
    'custom-field': Field,
    'custom-textarea': Textarea,
    'custom-picker': Picker,
    'custom-timer': Timer
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        // 唯一标识的字段：表单项类型
        type: {
          type: String,
          default: 'field'
        },

        // 公用的props:
        // 表单标识
        name: {
          type: String
        },
        // 标签
        label: String,
        // 占位文本
        placeholder: String,

        // 部分组件公用的props:
        // 只读模式: field、textarea
        readonly: {
          type: Boolean,
          default: false
        },
        // 是否可清除: field、picker、timer
        clearable: {
          type: Boolean,
          default: false
        },
        // 是否必选或必填: textarea、picker、timer
        required: {
          type: Boolean,
          default: false
        },

        // field独有props:
        // 原生输入框的键盘类型
        inputType: {
          type: String,
          default: 'text'
        },
        // 输入字符的最大长度
        maxLength: {
          type: String,
          default: '999'
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
        },

        // textarea独有props:
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
        // 链接按钮跳转的路径
        linkPath: String,

        // picker独有props:
        // 所有菜单选项
        columns: {
          type: Array,
          default: () => ([])
        },
        // 默认选中项
        defaultIndex: {
          type: [Number, Boolean],
          default: null
        },

        // timer独有props:
        // 时间选择器的类型
        timerType: {
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
        }
      })
    }
  },
  data: () => ({
    name: '',
    value: ''
  }),
  methods: {
    getValue () {
      return this.$children[0].getValue()
    },
    setValue (value) {
      this.$children[0].setValue(value)
    },
    validate () {
      return this.$children[0].validate()
    }
  },
  mounted () {
    this.name = this.options.name
  }
}
</script>

<style lang="scss" scoped>

</style>
