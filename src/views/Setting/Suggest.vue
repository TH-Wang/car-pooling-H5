<template>
  <div>
    <div ref="main">
      <!-- 导航栏 -->
      <van-nav-bar
        title="投诉建议"
        fixed
        placeholder
        left-arrow
        :border="false"
        @click-left="$router.go(-1)"
        @click-right="$router.push('/common/suggest/history')"
      >
        <template #right><span>历史记录</span></template>
      </van-nav-bar>

      <!-- 表单主体 -->
      <custom-form ref="form">

        <!-- 问题类型 -->
        <custom-picker
          name="king"
          label="问题类型"
          placeholder="请选择问题类型"
          :columns="problemColumns"
          required
        />

        <!-- 问题描述 -->
        <custom-textarea
          name="remark"
          label="问题描述"
          placeholder="请详细描述您的问题"
        />

        <!-- 上传身份证图片 -->
        <div class="title">请上传问题图片</div>
        <custom-upload name="url" description="请上传图片" multiple />
      </custom-form>
    </div>

    <main-button :class="submitButtonClass" @click="handleSubmit">确认</main-button>
  </div>
</template>

<script>
import { addComplaint } from '@/api'
import { Form, Textarea, Picker, Upload } from '@/components/Form'
import MainButton from '@/components/MainButton'
import formButtonMixin from '@/mixins/form-button-mixin'

export default {
  mixins: [formButtonMixin],
  components: {
    'custom-form': Form,
    'custom-textarea': Textarea,
    'custom-picker': Picker,
    'custom-upload': Upload,
    'main-button': MainButton
  },
  data: () => ({
    problemColumns: [
      { id: 1, label: '我要申诉' },
      { id: 2, label: '我要投诉' },
      { id: 3, label: '系统错误' },
      { id: 4, label: '优化建议' }
    ]
  }),
  methods: {
    async handleSubmit () {
      const { err, values, errors } = this.$refs.form.submit()
      if (err) {
        console.log(errors)
        return
      }
      if (values.url.length < 1) {
        this.$toast('请至少上传一张图片！')
        return
      }
      this.$toast.loading({ message: '提交中', duration: 100000 })
      try {
        const res = await addComplaint(values)
        if (res.data.status === 200) {
          this.$toast.clear()
          this.$toast.success('感谢您的反馈！')
          this.$router.go(-1)
        } else {
          throw new Error()
        }
      } catch (error) {
        this.$toast.clear()
        this.$toast.fail('提交失败\n请稍后再试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  margin: 0 .15rem;
  @include font (.17rem, $main-text, bold);
}

.flow{
  margin: .60rem auto .30rem auto;
}
.fixed{
  position: fixed;
  bottom: .30rem;
  left: .30rem;
}
</style>
