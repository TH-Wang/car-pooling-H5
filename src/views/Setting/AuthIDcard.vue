<template>
  <div>
    <div ref="main">
      <!-- 导航栏 -->
      <van-nav-bar
        title="身份证认证"
        fixed
        placeholder
        left-arrow
        :border="false"
        @click-left="$router.go(-1)"
      />

      <!-- 表单主体 -->
      <custom-form ref="form">

        <!-- 姓名和身份证号 -->
        <custom-field name="realname" label="姓名" placeholder="请输入您的真实姓名" />
        <custom-field
          name="idcount"
          label="身份证号"
          placeholder="请输入您的身份证号"
          :max-length="18"
          clearable
          :rules="[{
            pattern: /^\d{17}[\dx]$/i, message: '18位身份证号，最后一位可为X'
          }]"
        />

        <!-- 上传身份证图片 -->
        <div class="title">请上传身份证正反面</div>
        <custom-upload name="front" description="请上传身份证正面" />
        <custom-upload name="back" description="请上传身份证反面" />
      </custom-form>
    </div>

    <main-button :class="submitButtonClass" @click="handleSubmit">确认</main-button>
  </div>
</template>

<script>
import { Form, Field, Upload } from '@/components/Form'
import MainButton from '@/components/MainButton'
import formButtonMixin from '@/mixins/form-button-mixin'

export default {
  mixins: [formButtonMixin],
  components: {
    'custom-form': Form,
    'custom-field': Field,
    'custom-upload': Upload,
    'main-button': MainButton
  },
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
