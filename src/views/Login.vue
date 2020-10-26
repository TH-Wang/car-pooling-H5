<template>
  <div class="page">

    <div class="header">
      <van-icon @click="handleBack" name="cross" size=".18rem" color="#BFBFBF" />
    </div>

    <div class="main">
      <div class="title">拼车之家登录/注册</div>

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

      <!-- 提示 -->
      <div class="tip">未注册的手机号验证后登录即注册</div>

      <!-- 提交按钮 -->
      <div style="margin-top: .50rem">
        <main-button @click="handleSubmit" center>确认</main-button>
      </div>

    </div>

    <div class="footer tip">登录即同意《用户协议》</div>
  </div>
</template>

<script>
import { Form, Input } from '@/components/Form'
import MainButton from '@/components/MainButton'
import vertifyCodeMixin from '@/mixins/vertify-code'

export default {
  mixins: [vertifyCodeMixin],
  components: {
    'custom-form': Form,
    'custom-input': Input,
    'main-button': MainButton
  },
  data: () => ({
    phone: '152 1907 6783',
    code: ''
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
    },
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
  @include flex (space-between, center, column);

  .header{
    width: calc(100% - .60rem);
    margin: 0 auto;
    padding-top: .30rem;
    text-align: right;
  }

  .main{
    transform: translateY(-.40rem);

    .title{
      margin: 0 .30rem;
      margin-bottom: .8rem;
      @include font (.24rem, $main-text, bold);
    }

    .tip{
      margin: .15rem .30rem;
      @include font (.12rem, $tip-text);
    }
  }

  .footer{
    padding-bottom: .50rem;
    @include font (.12rem, $tip-text);
  }
}

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
