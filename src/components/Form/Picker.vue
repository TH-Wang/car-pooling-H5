<template>
  <div class="custom-form-item">
    <!-- 主体部分 -->
    <div class="custom-field" @click="show = !show">

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

      <!-- 下拉菜单 -->
      <div class="menu" :style="slideStyle">
        <div
          :class="`menu-item${index === val ? '-active' : ''}`"
          v-for="(item, index) in columns"
          :key="index"
          @click.stop="handleChange($event, index)"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
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
    value: Number,
    // 标签
    label: String,
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
    }
  },
  data: () => ({
    val: 0,
    show: false,
    error: false
  }),
  computed: {
    slideStyle () {
      return this.show ? '' : 'transform: scaleY(0)'
    },
    clear () {
      return this.clearable && this.val !== null
    }
  },
  methods: {
    text () {
      if (this.val === null) {
        if (this.error) return `请选择${this.label}`
        else return this.placeholder
      } else {
        return this.columns[this.val]
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
    handleChange (e, idx) {
      this.val = idx
      setTimeout(() => {
        this.show = false
        if (this.error) this.error = false
      }, 200)
    },
    handleClear () {
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
  mounted () {
    if (this.defaultIndex !== false) this.val = this.dataIndex
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
