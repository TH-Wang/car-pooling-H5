<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  data: () => ({
    fields: []
  }),
  methods: {
    // 收集所有表单项的最新数据
    collectFields () {
      const fields = []
      this.$children.forEach(item => {
        if (this.isFieldChildren(item)) {
          const { name, val, validate, getValue, setValue, clear } = item
          fields.push({ name, val, validate, getValue, setValue, clear })
        }
      })
      this.fields = fields
    },
    // 设置表单的值
    setValues (values) {
      for (const key in values) {
        this.setValueField(key, values[key])
      }
    },
    // 设置某个字段的值
    setValueField (key, value) {
      const children = this.fields.find(i => i.name === key)
      if (children) {
        children.setValue(value)
      }
    },
    // 获取所有的值
    getValues () {
      // 更新所有字段的值
      this.collectFields()
      // 递归封装结果
      const values = this.fields.reduce((vals, item) => {
        return Object.assign(vals, { [item.name]: item.getValue() })
      }, {})
      return values
    },
    // 获取某个字段的值
    getValueField (key) {
      const field = this.fields.find(i => i.name === key)
      if (field) return field.getValue()
    },
    // 对所有字段进行校验
    validate () {
      const len = this.fields.length
      const errors = []
      for (let i = 0; i < len; i++) {
        const item = this.fields[i]
        if (item.validate() === false) errors.push(item.name)
      }
      return errors
    },
    // 校验某个字段
    validateField (name) {
      this.fields.find(i => i.name === name).validate()
    },
    // 表单重置（清空）
    clear () {
      const len = this.fields.length
      for (let i = 0; i < len; i++) {
        const item = this.fields[i]
        item.clear()
      }
    },
    // 表单提交
    submit (callback) {
      const errors = this.validate()
      // 未通过校验，则返回所有错误的字段
      // 通过校验，则返回所有结果
      return errors.length > 0
        ? { err: true, values: null, errors }
        : { err: false, values: this.getValues(), errors: null }
    },
    // 筛选符合要求的表单项子组件
    isFieldChildren (vm) {
      return /^custom/.test(vm.$options._componentTag) &&
        typeof vm.name !== 'undefined'
    }
  },
  mounted () {
    this.collectFields()
  }
}
</script>
