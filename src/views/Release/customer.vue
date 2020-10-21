<template>
  <div>
    <!-- 表单部分 -->
    <custom-form ref="form">
      <custom-item :options="orderTypeOptions" />
      <custom-item
        v-for="(item, index) in formOptions"
        :key="index"
        :options="item"
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

    <!-- 联系号码 -->
    <div class="confirm-phone">
      请确认你的联系手机号
      <span class="phone">157 2020 0126</span>
      <span class="link">修改手机号</span>
    </div>

    <!-- 温馨提示 -->
    <div class="tip">
      <p>温馨提示</p>
      <p>请务必保证信息的真实，如被拼友投诉，将被平台限制发信息哦</p>
    </div>
  </div>
</template>

<script>
import { Checkbox } from 'vant'
import { Form, Item } from '@/components/Form'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-checkbox': Checkbox,
    'custom-form': Form,
    'custom-item': Item,
    'main-button': MainButton
  },
  data: () => ({
    // 发布类型字段
    orderTypeOptions: {
      type: 'picker',
      name: 'order_type',
      label: '发布类型',
      placeholder: '请选择发布类型',
      columns: ['拼车', '上下班拼车', '顺路带物', '旅游包车']
    },
    // 表单列表
    formOptions: [
      {
        type: 'field',
        name: 'phone',
        label: '手机号',
        placeholder: '请输入手机号',
        inputType: 'tel'
      }, {
        type: 'timer',
        name: 'time',
        label: '时间',
        placeholder: '请选择时间',
        defaultTime: new Date(),
        clearable: true
      }, {
        type: 'picker',
        name: 'car_type',
        label: '车型',
        placeholder: '请选择车型',
        columns: ['小面包车', '轿车', 'SUV'],
        required: true
      }, {
        type: 'field',
        name: 'seat',
        label: '余座',
        placeholder: '请输入余座',
        inputType: 'tel',
        maxLength: 1
      }
    ],
    agreePact: true,
    agreePackage: false
  }),
  methods: {
    // handleOrderTypeConfirm (value) {
    //   this.order_type = value
    //   this.showOrderTypePicker = false
    // },
    // 表单提交，所有校验通过后才执行此回调函数
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (!err) console.log(values)
    }
    // handleTimeConfirm (time) {
    //   console.log(time)
    //   // this.time = time
    //   this.showTimePicker = false
    // }
  },
  mounted () {
    this.$refs.form.setValues({
      car_type: 2,
      order_type: 2,
      phone: '13788889999',
      seat: '1',
      time: new Date(2020, 5, 21)
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/field.scss';
@import '@/assets/scss/release.scss';
</style>
