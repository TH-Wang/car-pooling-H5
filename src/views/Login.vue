<template>
  <div class="page">

    <div class="header">
      <div class="title">拼车之家登录/注册</div>
      <van-icon @click="handleBack" name="cross" size=".22rem" color="#8C8C8C" />
    </div>

    <div class="main">

      <!-- 表单主体 -->
      <custom-form ref="form">

        <!-- 手机号 -->
        <custom-input
          name="phone"
          type="tel"
          max-length="11"
          placeholder="请输入手机号码"
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

        <!-- 邀请码 -->
        <custom-input
          v-if="invite"
          name="invite"
          v-model="invite"
          type="text"
          readonly
          input-style="font-size:0.16rem;font-weight:bold;"
          :rules="[{required: true}]"
        ><template #suffix>
            <span class="invite-suffix">邀请码</span>
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

    <div class="footer tip">
      登录即同意
      <span @click="$router.push('/common/user/agreement')">《用户协议》</span>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import { Form, Input } from '@/components/Form'
import MainButton from '@/components/MainButton'
import vertifyCodeMixin from '@/mixins/vertify-code'
import { sendCode, userCodeLogin, userRecommendLogin } from '@/api'

export default {
  mixins: [vertifyCodeMixin],
  components: {
    'custom-form': Form,
    'custom-input': Input,
    'main-button': MainButton
  },
  data: () => ({
    phone: '',
    code: '',
    // 邀请码
    invite: null
  }),
  methods: {
    async handleGetCode () {
      try {
        await this.handleChangeCodeStatus()
        // 请求验证码
        const phone = this.$refs.form.getValueField('phone')
        await sendCode({ phone, type: 'LOGIN' })
      } catch (error) {
        console.log(error)
      }
    },
    // 表单提交
    async handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return
      this.invite ? this.handleInviteLogin(values) : this.handleCommonLogin(values)
    },
    // 普通用户登录
    async handleCommonLogin (values) {
      this.$toast.loading('登录中')
      const res = await userCodeLogin(values)
      const { msg, data } = res.data
      if (msg === '成功') {
        this.$toast.clear()
        const { token, phone } = data
        this.$toast({ message: '登录成功！', type: 'success' })
        this.$store.commit('setStorage', { token, phone, info: data })
        // 根据历史路由，判断需要返回页面，还是跳转首页
        this.$store.state.route.history
          ? this.$router.go(-1)
          : this.$router.push('/home')
      } else {
        this.$toast({ message: msg, type: 'fail' })
      }
    },
    // 用户邀请登录
    async handleInviteLogin (values) {
      this.$toast.loading('登录中')
      const res = await userRecommendLogin(values)
      const { msg, data } = res.data
      if (msg === '成功') {
        this.$toast.clear()
        const { token, phone } = data
        this.$toast({ message: '登录成功！', type: 'success' })
        this.$store.commit('setStorage', { token, phone, info: data })
        // 根据历史路由，判断需要返回页面，还是跳转首页
        this.$router.push('/home')
      } else {
        this.$toast({ message: msg, type: 'fail' })
      }
    },
    // 处理返回
    handleBack () {
      if (this.$store.state.route.history) {
        this.$router.go(-1)
      } else this.$router.push('/home')
    }
  },
  created () {
    const invite = this.$route.query.invite
    if (this.$store.state.user.token && !invite) {
      console.log('跳转到首页')
      this.$router.push('/home')
    } else {
      this.invite = this.$route.query.invite
    }
  },
  mounted () {
    const phone = this.$store.state.user.loginPhone
    if (!isEmpty(phone)) {
      this.$refs.form.setValues({ phone })
    }
    if (this.invite) {
      const invite = this.invite
      this.$refs.form.setValues({ invite })
    }
  },
  // beforeRouteEnter (to, from, next) {
  // },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/common/setting') {
      next('/mine')
      return
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
  @include flex (space-evenly, center, column);

  .header{
    width: 100%;
    margin: 0 auto;
    padding: 0 .30rem;
    box-sizing: border-box;
    @include flex (space-between);

    .title{
      // margin: 0 .30rem;
      transform: translateY(.3rem);
      @include font (.24rem, $main-text, bold);
    }
  }

  .main{

    .tip{
      margin: .15rem .30rem;
      @include font (.12rem, $tip-text);
    }
  }

  .footer{
    @include font (.12rem, $tip-text);

    span{
      color: $main-color;
    }
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

.invite-suffix{
  @include font (.16rem, $main-text);
}
</style>
