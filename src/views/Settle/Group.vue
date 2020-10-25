<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="入驻群"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- tip -->
    <div class="header-tip">我有拼车群，我要入驻平台！</div>

    <!-- step -->
    <step :current="0" />

    <!-- 表单 -->
    <custom-form ref="form" style="margin: .28rem 0">
      <custom-item
        v-for="(item, index) in formOptions"
        :key="index"
        :options="item"
      />
    </custom-form>

    <!-- 确认按钮 -->
    <main-button
      center
      style="margin-bottom:.30rem"
      @click="handleSubmit"
    >下一步</main-button>
  </div>
</template>

<script>
import { Form, Item } from '@/components/Form'
import Step from '@/components/Step'
import MainButton from '@/components/MainButton'
import options from './groupOptions'

export default {
  components: {
    step: Step,
    'custom-form': Form,
    'custom-item': Item,
    'main-button': MainButton
  },
  data: () => ({
    formOptions: options
  }),
  methods: {
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (!err) console.log(values)
      this.$router.push('/common/settle/group/finish')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-tip{
  margin: .14rem .15rem .10rem .15rem;
  @include font (.12rem, $tip-text);
}
</style>
