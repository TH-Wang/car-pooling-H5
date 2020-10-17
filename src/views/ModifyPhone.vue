<template>
  <div>

    <!-- 导航栏 -->
    <van-nav-bar
      title="修改手机号"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
    />

    <!-- 表单主体 -->
    <custom-form ref="form">

      <!-- 手机号 -->
      <custom-input
        name="phone"
        v-model="phone"
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
        v-model="code"
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
    </custom-form>

    <!-- 提交按钮 -->
    <div style="margin-top: .50rem">
      <main-button @click="handleSubmit" center>立即预定</main-button>
    </div>
  </div>
</template>

<script>
import { Form, Input } from '@/components/Form'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'custom-form': Form,
    'custom-input': Input,
    'main-button': MainButton
  },
  data: () => ({
    phone: '152 1907 6783',
    code: '',
    verifyCode: {
      // 获取中
      pending: false,
      count: 60,
      // 显示的文本
      text: '获取验证码'
    }
  }),
  methods: {
    // 获取验证码
    handleGetCode () {
      if (!this.verifyCode.pending) {
        // 获取验证码的倒计时
        this.verifyCode.text = this.verifyCode.count + 's'
        this.verifyCode.pending = true
        var countDown = setInterval(() => {
          if (this.verifyCode.count > 0) {
            this.verifyCode.text = (--this.verifyCode.count) + 's'
          } else {
            this.verifyCode = {
              pending: false,
              count: 60,
              text: '获取验证码'
            }
            clearInterval(countDown)
          }
        }, 1000)
      }
    },
    // 表单提交
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return
      console.log(values)
    }
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
</style>
