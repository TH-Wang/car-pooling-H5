<template>
  <div>

    <!-- 表单部分 -->
    <custom-form ref="form">
      <!-- 发布类型 -->
      <custom-picker
        v-model="orderType"
        name="publishType"
        label="发布类型"
        placeholder="请选择发布类型"
        :columns="orderMenu"
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
import { mapState } from 'vuex'
import { Checkbox } from 'vant'
import { isEmpty } from 'lodash'
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
    orderType: 2,
    // 表单列表
    formOptions: customerConfig,
    // 所有的发布类型
    orderMenu: [
      { id: 4, label: '上下班拼车' },
      { id: 1, label: '短途拼车' },
      { id: 2, label: '城际拼车' },
      { id: 3, label: '跨省拼车' },
      { id: 5, label: '顺路带物' }
    ],
    agreePact: true,
    agreePackage: false,
    combo: {}
  }),
  computed: {
    ...mapState(['release']),
    // 是否起始点和终止点都显示了
    allInputStartEnd () {
      const { startAddr, endAddr } = this.release
      return !isEmpty(startAddr.name) && !isEmpty(endAddr.name)
    },
    startAddrName () {
      return this.release.startAddr.name
    },
    endAddrName () {
      return this.release.endAddr.name
    }
  },
  methods: {
    // 发送提交请求
    async handleSubmit () {
      // 表单校验并获取值
      const { err, values, errors } = this.$refs.form.submit()
      if (err) {
        console.log(errors)
        return
      }
      // 表单数据
      const data = {
        ...values,
        cost: parseInt(values.cost),
        peopel: parseInt(values.peopel),
        // 发布类型：乘客发布
        orderType: 2
      }
      // 通知父组件做提交相关操作
      this.$emit('submit', { data, type: 'customer' })
    },
    // 父组件提交后调用该方法，清空表单
    clearForm () {
      this.$refs.form.clear()
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
    },
    // 判断拼车单类型
    judgeType () {
      if (!this.allInputStartEnd) return 1
      const { startAddr, endAddr } = this.release
      if (startAddr.pname !== endAddr.pname) return 3
      if (startAddr.cityname === endAddr.cityname) {
        return startAddr.adname === endAddr.adname ? 1 : 2
      }
      return 1
    }
  },
  watch: {
    agreePackage: function (newVal) {
      if (newVal) this.$refs.layer.show()
      else this.combo = {}
    },
    startAddrName: function (newVal) {
      if (!this.allInputStartEnd) return
      const type = this.judgeType()
      const typeName = this.orderMenu.find(i => i.id === type).label
      this.$refs.form.setValueField('publishType', type)
      this.$toast({ message: `已为您自动选择为：${typeName}`, duration: 1000 })
    },
    endAddrName: function (newVal) {
      if (!this.allInputStartEnd) return
      const type = this.judgeType()
      const typeName = this.orderMenu.find(i => i.id === type).label
      this.$refs.form.setValueField('publishType', type)
      this.$toast({ message: `已为您自动选择为：${typeName}`, duration: 1000 })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';
</style>
