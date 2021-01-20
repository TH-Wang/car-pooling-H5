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
        <custom-upload
          name="identityCardFront"
          description="请上传身份证正面"
          :required="!hold"
          base-image="idcard-front.png"
        />
        <custom-upload
          name="identityCardBack"
          description="请上传身份证反面"
          :required="!hold"
          base-image="idcard-back.png"
        />

        <!-- 手持身份证认证 -->
        <div class="title">手持身份证认证</div>
        <custom-upload
          name="identityCardBack"
          description="请上传手持身份证照片"
          :required="!hold"
          base-image="idcard-hold.png"
        />
      </custom-form>
      <!-- <div class="hold-upload">
        <van-checkbox checked-color="#FFCD00" v-model="hold"/>
        <span style="margin-left:.05rem" @click="hold = !hold">手持身份证上传</span>
      </div> -->
    </div>

    <main-button :class="submitButtonClass" @click="handleSubmit">确认</main-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { Checkbox } from 'vant'
import { userIdentityCard, getUserDetail } from '@/api'
import { Form, Field, Upload } from '@/components/Form'
import MainButton from '@/components/MainButton'
import formButtonMixin from '@/mixins/form-button-mixin'

export default {
  mixins: [formButtonMixin],
  components: {
    // 'van-checkbox': Checkbox,
    'custom-form': Form,
    'custom-field': Field,
    'custom-upload': Upload,
    'main-button': MainButton
  },
  data: () => ({
    hold: false
  }),
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
      this.$toast.loading('正在验证...')
      const res = await userIdentityCard(data)
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

.hold-upload{
  @include flex;
  margin: 0 .15rem;
  margin-top: .2rem;
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
