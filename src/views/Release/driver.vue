<template>
  <div>
    <custom-form ref="form">
      <custom-picker
        label="发布类型"
        name="type"
        placeholder="请选择发布类型"
        :columns="['拼车', '上下班拼车', '顺路带物', '旅游包车']"
        clearable
        required
      />
      <custom-field
        name="seat"
        label="余座"
        type="tel"
        placeholder="请输入余座"
        max-length="1"
        clearable
        :rules="[{required: true}, {
          pattern: /^\d/,
          message: '必须以数字开头'
        }]"
      />
      <custom-timer
        name="time"
        label="时间"
        :default-time="new Date()"
        placeholder="请选择时间"
        clearable
        required
      />
      <custom-textarea
        name="remark"
        label="备注"
        placeholder="请输入备注"
        required
      />
    </custom-form>

    <main-button center @click="handleSubmit">提交</main-button>
  </div>
</template>

<script>
import { Form, Field, Picker, Timer, Textarea } from '@/components/Form/index'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'custom-form': Form,
    'custom-field': Field,
    'custom-textarea': Textarea,
    'custom-picker': Picker,
    'custom-timer': Timer,
    'main-button': MainButton
  },
  data: () => ({
    index: 0
  }),
  methods: {
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (!err) console.log(values)
    }
  },
  mounted () {
    this.$refs.form.setValues({
      type: 1,
      seat: 2,
      time: new Date(2020, 5, 21),
      remark: '急急急急'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
