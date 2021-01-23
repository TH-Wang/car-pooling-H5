<template>
  <div>
    <div ref="main">
      <!-- 导航栏 -->
      <van-nav-bar
        title="驾驶证认证"
        fixed
        placeholder
        left-arrow
        :border="false"
        @click-left="$router.go(-1)"
        :rules="[{required: true}]"
      />

      <!-- 表单主体 -->
      <custom-form ref="form">

        <!-- 姓名和身份证号 -->
        <custom-field name="userName" label="姓名" placeholder="请输入您的真实姓名" />
        <!-- <custom-field
          name="carModel"
          label="车型"
          placeholder="请输入您爱车的型号"
          clearable
          :rules="[{required: true}]"
        /> -->

        <!-- 上传身份证图片 -->
        <div class="title">请上传身份证正反面</div>
        <custom-upload
          name="identityCardFront"
          description="请上传身份证正面"
          base-image="idcard-front.png"
          required
        />
        <custom-upload
          name="identityCardBack"
          description="请上传身份证反面"
          base-image="idcard-back.png"
          required
        />

        <!-- 上驾驶证证图片 -->
        <div class="title">请上传驾驶证</div>
        <custom-upload
          name="userDrivingCard"
          description="请上传驾驶证左面"
          base-image="driver-front.png"
          required
        />
        <custom-upload
          name="userDrivingCardBack"
          description="请上传驾驶证右面"
          base-image="driver-back.png"
          required
        />
      </custom-form>
    </div>

    <main-button :class="submitButtonClass" @click="handleSubmit">确认</main-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userDrivingCard, getUserDetail } from '@/api'
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
      if (err) {
        this.$toast.fail({ message: '信息不完整' })
        return
      }

      // 发送认证请求
      const userId = this.user.info.id
      const data = { ...values, userId }
      this.$toast.loading('正在提交...')
      const res = await userDrivingCard(data)
      this.$toast.clear()
      if (res.data.status === 200) {
        // 更新用户信息
        const res = await getUserDetail()
        this.$store.commit('setUserInfo', res.data.data)
        await this.$dialog.alert({
          title: '提交成功',
          message: '我们需要对您的信息进行审核，请您耐心等待'
        })
        this.$router.go(-1)
      } else {
        this.$toast.fail('提交失败\n请稍后重试')
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
