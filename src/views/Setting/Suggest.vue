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
          name="problem_type"
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
        <custom-upload name="front" description="请上传图片" />
      </custom-form>
    </div>

    <main-button :class="submitButtonClass" @click="handleSubmit">确认</main-button>
  </div>
</template>

<script>
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
    problemColumns: ['我要申诉', '我要投诉', '系统错误', '优化建议']
  }),
  methods: {
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (!err) console.log(values)
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
