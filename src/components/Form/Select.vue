<template>
  <div class="custom-input">
    <!-- 主体部分 -->
    <div class="main" @click="show = !show">

      <!-- 显示选择结果 -->
      <div :class="mainClass()" @click.stop="show = true">{{text(val)}}</div>

      <!-- 清除按钮 -->
      <van-icon
        v-show="canClear"
        name="clear"
        size=".14rem"
        color="rgb(225,225,225)"
        style="margin-left:.08rem"
        @click.stop="clear"
      />
    </div>

    <!-- 选择面板 -->
    <van-action-sheet
      v-model="show"
      :actions="columns"
      :description="title"
      cancel-text="取消"
      close-on-click-action
      @cancel="show = false"
      @select="handleChange"
    />
  </div>
</template>

<script>
import { ActionSheet } from 'vant'

export default {
  components: {
    'van-action-sheet': ActionSheet
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
    value: Number,
    // 标签
    // label: String,
    // 所有菜单选项
    columns: {
      type: Array,
      default: () => ([])
    },
    // 默认选中项
    defaultIndex: {
      type: [Number, Boolean],
      default: false
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
    },
    // 选择面板的标题
    title: {
      type: String,
      default: '请选择'
    }
  },
  data: () => ({
    val: null,
    show: false,
    error: false
  }),
  computed: {
    slideStyle () {
      return this.show ? '' : 'transform: scaleY(0)'
    },
    canClear () {
      return this.clearable && this.val !== null
    }
  },
  methods: {
    text (value) {
      if (value === null) {
        // if (this.error) return `请选择${this.label}`
        // else return this.placeholder
        return this.placeholder
      } else {
        const obj = this.columns.find(i => i.value === value)
        return obj ? obj.name : ''
      }
    },
    mainClass () {
      if (this.val === null) {
        return this.error ? 'error' : 'placeholder'
      }
      return ''
    },
    handleChange (el) {
      this.val = el.value
      setTimeout(() => {
        this.show = false
        if (this.error) this.error = false
      }, 200)
    },
    // 恢复默认值（清空）
    clear () {
      // if (this.defaultIndex !== false) this.val = this.defaultIndex
      // else if (this.columns[0]) this.val = this.columns[0].value
      this.val = null
      if (this.required) this.error = true
    },
    // 获取值
    getValue () {
      return this.val
    },
    setValue (value) {
      this.$nextTick(() => {
        this.val = value
      })
    },
    validate () {
      if (this.required && this.val === null) {
        this.error = true
        return false
      } else return true
    }
  },
  mounted () {
    // this.val = null
  },
  watch: {
    val: function (newVal) {
      this.$emit('change', newVal)
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
    @include flex (space-between, center);
    position: relative;

    input{
      width: 100%;
      flex: 1;
      background-color: transparent;
      border: none;
      font-size: .16rem;
      color: $main-text;

      &::placeholder{
        color: $tip-text;
      }
    }

    .placeholder{
      color: $tip-text;
    }

    // 错误提示
    .error{
      color: #ee0a24;
    }

    // 触发 "必填" 校验规则的错误提示
    .unrequired::placeholder{
      color: #ee0a24;
    }

    .slot{
      flex-shrink: 0;
    }
  }
}
</style>
