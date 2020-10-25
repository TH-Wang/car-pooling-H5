<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="申请站长"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
      @click-right="$router.push('/common/settle/site/history')"
    >
      <template #right>申请记录</template>
    </van-nav-bar>

    <!-- 当前定位城市 -->
    <div class="current-city">
      当前定位城市·区域 <span>重庆 · 渝北区</span>
    </div>

    <!-- 表单 -->
    <custom-form ref="form">
      <custom-item
        v-for="(item, index) in formOptions"
        :key="index"
        :options="item"
      />
      <custom-field
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        type="tel"
        :max-length="6"
        :rules="[{required: true}, {pattern: /^\d{6}$/, message: '验证码由6位数字组成'}]"
        style="margin-bottom: .1rem"
      >
        <template #suffix>
          <span class="get-code" @click="handleGetCode">{{verifyCode.text}}</span>
        </template>
      </custom-field>
    </custom-form>

    <div class="tip-button">收不到短信？反馈客服</div>

    <!-- 确认按钮 -->
    <main-button
      center
      style="margin-bottom:.30rem"
      @click="handleSubmit"
    >提交申请</main-button>
  </div>
</template>

<script>
import { Form, Item, Field } from '@/components/Form'
import MainButton from '@/components/MainButton'
import options from './siteOptions'
import vertifyCodeMixin from '@/mixins/vertify-code'

export default {
  mixins: [vertifyCodeMixin],
  components: {
    'custom-form': Form,
    'custom-item': Item,
    'custom-field': Field,
    'main-button': MainButton
  },
  data: () => ({
    formOptions: options
  }),
  methods: {
    // 获取验证码
    async handleGetCode () {
      try {
        // 判断或改变验证码当前状态：vertify-code-mixin
        await this.handleChangeCodeStatus()
      } catch (error) {
        console.warn('The code is pending')
      }
    },
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (!err) console.log(values)
    }
  }
}
</script>

<style lang="scss" scoped>
// 当前定位城市
.current-city{
  text-align: left;
  padding: .20rem .15rem 0 .15rem;
  @include font (.14rem, $sub-text);

  span{
    color: $main-text;
    font-weight: bold;
  }
}
// 获取验证码
.get-code{
  @include font (.16rem, $main-color, bold);
  margin-left: .10rem;
}
.tip-button{
  @include font (.12rem, $tip-text);
  margin: 0 .15rem;
  margin-bottom: .46rem;
  text-align: right;
}
</style>
