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
    <!-- 手机号 -->
    <custom-input
      name="phone"
      ref="phone"
      clearable
      input-style="font-size:0.18rem;font-weight:bold"
      :rules="[{required: true}]"
    >
      <template #prefix>
        <span class="phone-prefix">+86</span>
      </template>
    </custom-input>

    <!-- 验证码 -->
    <custom-input
      name="code"
      type="tel"
      max-length="6"
      placeholder="请输入验证码"
      clearable
      :rules="[{required: true}]"
    >
      <template #suffix>
        <span class="code-suffix" @click="handleGetCode">{{verifyCode.text}}</span>
      </template>
    </custom-input>

    <!-- 提交按钮 -->
    <div style="margin-top: .50rem">
      <main-button @click="handleSubmit" center>确认</main-button>
    </div>

    <!-- 操作成功 -->
    <div v-show="showLayer" class="feedback-layer">
      <feedback type="success" title="操作成功" tip="您的手机号：15219076783" />
      <main-button
        style="margin-top: 1rem"
        center
        @click="$router.back(-1)"
      >确定</main-button>
    </div>
  </div>
</template>

<script>
import { Input } from '@/components/Form'
import MainButton from '@/components/MainButton'
import Feedback from '@/components/Feedback'
import VertifyCode from '@/mixins/vertify-code'

export default {
  mixins: [VertifyCode],
  components: {
    'custom-input': Input,
    'main-button': MainButton,
    feedback: Feedback
  },
  data: () => ({
    phone: '',
    showLayer: false
  }),
  methods: {
    async handleGetCode () {
      try {
        await this.handleChangeCodeStatus()
      } catch (error) {
        console.log(error)
      }
    },
    // 表单提交
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return
      console.log(values)
      this.showLayer = true
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
