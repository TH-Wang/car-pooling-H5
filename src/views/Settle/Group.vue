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
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'
import { addGroup } from '@/api'
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
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return
      const data = cloneDeep(values)
      // 状态
      data.status = 1
      // 地区
      data.city = values.area[1].name
      data.region = values.area[2].name
      delete data.area
      // 用户id
      data.userId = this.user.info.id

      // 发起请求
      this.$toast.loading({ message: '提交中', duration: 10000 })
      const res = await addGroup(data)
      this.$toast.clear()
      if (res.data.status === 200) {
        this.$toast.success('提交成功')
        this.$router.push('/common/settle/group/finish')
      } else {
        this.$toast.fail('上传失败\n请稍后重试')
      }
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
