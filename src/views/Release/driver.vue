<template>
  <div>
    <custom-form ref="form">
      <!-- 发布类型 -->
      <custom-picker
        v-model="orderType"
        name="order_type"
        label="发布类型"
        placeholder="请选择发布类型"
        :columns="['拼车', '上下班拼车', '顺路带物', '旅游包车']"
      />
      <!-- 详细表单项 -->
      <custom-item
        v-for="item in formOptions[orderType]"
        :key="item.id"
        :options="item"
      />
      <!-- 公用的备注表单项 -->
      <custom-textarea
        name="remark"
        label="备注"
        placeholder="请输入备注"
      />
    </custom-form>

    <!-- 提交部分 -->
    <div class="submit">
      <div class="submit-checkbox">
        <van-checkbox
          v-model="agreePact"
          icon-size=".15rem"
          checked-color="#FFCD00"
          shape="square"
        >我已阅读并同意发布拼车信息<span class="link">《合乘协议》</span></van-checkbox>
      </div>
      <div class="submit-checkbox">
        <van-checkbox
          v-model="agreePackage"
          icon-size=".15rem"
          checked-color="#FFCD00"
          shape="square"
        >天天拼车套餐，免去天天发布信息（非必选）</van-checkbox>
      </div>
      <main-button
        center
        style="margin-top:.22rem"
        @click="handleSubmit"
      >发布</main-button>
    </div>
  </div>
</template>

<script>
import { Checkbox } from 'vant'
import { Form, Item, Picker, Textarea } from '@/components/Form'
import MainButton from '@/components/MainButton'
import { driver as driverConfig } from './config'

export default {
  components: {
    'van-checkbox': Checkbox,
    'custom-form': Form,
    'custom-item': Item,
    'custom-picker': Picker,
    'custom-textarea': Textarea,
    'main-button': MainButton
  },
  data: () => ({
    // 选择的发布类型
    orderType: 0,
    // 表单列表
    formOptions: driverConfig,
    agreePact: true,
    agreePackage: false
  }),
  methods: {
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (!err) console.log(values)
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';
</style>
