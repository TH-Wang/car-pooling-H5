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
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import { postApplication } from '@/api'
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
  computed: {
    ...mapState(['user'])
  },
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
    // 提交信息
    async handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return
      const data = cloneDeep(values)
      // 地区
      data.city = values.area[1].name
      data.region = values.area[2].name
      delete data.area
      // 用户id
      data.userId = this.user.info.id
      console.log(data)
      // 发起请求
      this.$toast.loading({ message: '提交中', duration: 10000 })
      const res = await postApplication(data)
      this.$toast.clear()
      if (res.data.status === 200) {
        await this.$dialog.alert({
          title: '提交成功',
          message: '已为您提交成功，请耐心等待管理员的审核，感谢您的加入！'
        })
        this.$router.push('/common/settle/group/finish')
      } else {
        this.$dialog.alert({
          title: '提交失败',
          message: res.data.msg
        })
      }
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
