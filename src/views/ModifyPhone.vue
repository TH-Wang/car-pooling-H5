<template>
  <div>

    <!-- 导航栏 -->
    <van-nav-bar
      title="修改手机号"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 表单主体 -->
    <custom-form ref="form">
      <!-- 手机号 -->
      <custom-input
        v-model="phone"
        name="phone"
        ref="phone"
        clearable
        input-style="font-size:0.18rem;font-weight:bold"
        :rules="[{required: true}, {pattern: /^1\d{10}$/g, message: '请输入合理的手机号码'}]"
      >
        <template #prefix>
          <span class="phone-prefix">+86</span>
        </template>
      </custom-input>

      <!-- 验证码 -->
      <custom-input
        v-model="code"
        name="code"
        type="tel"
        max-length="6"
        placeholder="请输入验证码"
        clearable
        :rules="[{required: true}, {pattern: /^\d{6}$/g, message: '验证码必须位6位数字'}]"
      >
        <template #suffix>
          <span class="code-suffix" @click="handleGetCode">{{verifyCode.text}}</span>
        </template>
      </custom-input>
    </custom-form>

    <!-- 提交按钮 -->
    <div style="margin-top: .50rem">
      <main-button @click="handleSubmit" center>确认</main-button>
    </div>

    <!-- 操作成功 -->
    <div v-show="showLayer" class="feedback-layer">
      <feedback type="success" title="修改成功" :tip="`您的手机号：${successPhone}`" />
      <main-button
        style="margin-top: 1rem"
        center
        @click="$router.back(-1)"
      >确定</main-button>
    </div>
  </div>
</template>

<script>
import { sendCode, updatePhoneToTwo, getUserDetail } from '@/api'
import { Form, Input } from '@/components/Form'
import MainButton from '@/components/MainButton'
import Feedback from '@/components/Feedback'
import VertifyCode from '@/mixins/vertify-code'

export default {
  mixins: [VertifyCode],
  components: {
    'custom-form': Form,
    'custom-input': Input,
    'main-button': MainButton,
    feedback: Feedback
  },
  data: () => ({
    phone: '',
    code: '',
    showLayer: false,
    successPhone: ''
  }),
  methods: {
    async handleGetCode () {
      try {
        await this.handleChangeCodeStatus()
        // 获取验证码
        const params = { type: 'BINGDINGPHONE' }
        params.phone = this.phone
        const res = await sendCode(params)
        const { status, msg } = res.data
        // 如果获取失败
        if (status !== 200) {
          this.$dialog.alert({ title: '获取失败', message: msg })
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 表单提交
    async handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return
      // 请求修改手机号
      this.$toast.loading({ message: '修改中', duration: 10000 })
      const res = await updatePhoneToTwo(values)
      this.$toast.clear()
      if (res.data.status === 200) {
        const phone = this.phone
        this.successPhone = phone
        this.showLayer = true
        await this.resetUserInfo()
        this.$toast.success('修改成功')
        this.$router.go(-1)
      } else {
        this.$toast.fail('修改失败\n请稍后再试')
      }
    },
    // 更新个人信息
    async resetUserInfo () {
      const res = await getUserDetail()
      this.$store.commit('setUserInfo', res.data.data)
      this.$store.commit('setToken', res.data.data.token)
    }
  },
  mounted () {
    const phone = this.$store.state.user.info.phone
    this.$refs.phone.setValue(phone)
  }
}
</script>

<style lang="scss" scoped>
.phone-prefix{
  @include font (.14rem, $main-text);
  padding-right: .20rem;
  margin-right: .20rem;
  display: inline-block;
  border-right: dashed 1px $normal-text;
}

.code-suffix{
  @include font (.16rem, $main-color);
  padding-left: .20rem;
  margin-left: .10rem;
  border-left: dashed 1px $normal-text;
}

.feedback-layer{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 46px;
  left: 0;
  background-color: #ffffff;
}
</style>
