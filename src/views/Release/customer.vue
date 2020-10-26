<template>
  <div>
    <!-- 表单部分 -->
    <custom-form ref="form">
      <!-- 发布类型 -->
      <custom-picker
        v-model="orderType"
        name="order_type"
        label="发布类型"
        placeholder="请选择发布类型"
        :columns="['拼车', '上下班拼车', '顺路带物']"
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

    <!-- 选择套餐窗口 -->
    <choose-combo-layer
      ref="layer"
      @close="handlePopupClose"
      @submit="handleChangeCombo"
    />
  </div>
</template>

<script>
import { Checkbox } from 'vant'
import { Form, Item, Picker, Textarea } from '@/components/Form'
import MainButton from '@/components/MainButton'
import ChooseComboLayer from '@/components/Layer/ChooseCombo'
import { customer as customerConfig } from './config.js'

export default {
  components: {
    'van-checkbox': Checkbox,
    'custom-form': Form,
    'custom-item': Item,
    'custom-picker': Picker,
    'custom-textarea': Textarea,
    'main-button': MainButton,
    'choose-combo-layer': ChooseComboLayer
  },
  data: () => ({
    // 选择的发布类型
    orderType: 0,
    // 表单列表
    formOptions: customerConfig,
    agreePact: true,
    agreePackage: false,
    combo: {}
  }),
  methods: {
    // 提交发布
    handleSubmit () {
      const _this_ = this
      const { err, values, errors } = this.$refs.form.submit()
      if (!err) {
        const combo = this.combo
        console.log({ ...values, combo })
        this.$dialog.confirm({
          title: '提示',
          message: '请确认 <span style="color:#FFCD00">157 2020 0123</span> 能联系到你',
          allowHtml: true,
          confirmButtonText: '确认在用',
          cancelButtonText: '修改手机号'
        }).then(() => {
          console.log('[确认在用]')
          setTimeout(() => {
            _this_.$dialog.alert({
              title: '提示',
              message: '2018年11月16日起，为车主每拼到1人收取3元的信息服务费，行程结束后计费，请知悉。',
              confirmButtonText: '我知道了'
            })
          }, 300)
        }).catch(() => {
          _this_.$router.push('/common/phone/modify')
        })
      } else {
        console.log(errors)
      }
    },
    // 弹出层关闭
    handlePopupClose () {
      if (JSON.stringify(this.combo) === '{}') {
        this.agreePackage = false
      }
    },
    // 选择套餐
    handleChangeCombo (value) {
      this.combo = value
    }
  },
  mounted () {
    // this.$refs.form.setValues({
    //   car_type: 2,
    //   order_type: 2,
    //   phone: '13788889999',
    //   seat: '1'
    // })
  },
  watch: {
    agreePackage: function (newVal) {
      if (newVal) this.$refs.layer.show()
      else this.combo = {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';
</style>
