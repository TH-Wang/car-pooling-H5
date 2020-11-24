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
        <custom-field
          name="userName"
          label="姓名"
          placeholder="请输入您的真实姓名"
          :rules="[{required: true}]"
        />
        <custom-field
          name="userIdentity"
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
        <custom-upload name="identityCardFront" description="请上传身份证正面" required />
        <custom-upload name="identityCardBack" description="请上传身份证反面" required />
      </custom-form>
    </div>

    <main-button :class="submitButtonClass" @click="handleSubmit">确认</main-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userIdentityCard } from '@/api'
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
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return

      // 发送认证请求
      const userId = this.user.info.id
      const data = { ...values, userId }
      this.$toast.loading('正在验证...')
      const res = await userIdentityCard(data)
      if (res.data.status === 200) {
        this.$toast.clear()
        this.$toast.success('验证成功')
        this.$router.go(-1)
      } else {
        this.$toast.fail('验证失败\n请稍后重试')
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
