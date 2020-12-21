<template>
  <div>

    <!-- 表单部分 -->
    <custom-form ref="form">
      <!-- 发布类型 -->
      <custom-picker
        v-model="publishType"
        name="publishType"
        label="发布类型"
        placeholder="请选择发布类型"
        :columns="orderMenu"
      />
      <!-- 详细表单项 -->
      <custom-item
        v-for="item in formOptions[publishType]"
        :key="item.id"
        :options="item"
      />
      <!-- 是否带物 -->
      <custom-picker
        v-if="publishType !== 5 && publishType !== 6"
        v-model="isTakeGoods"
        name="isTakeGoods"
        label="是否带物"
        placeholder="请选择是否带物"
        :columns="[{ id: 0, label: '否' }, { id: 1, label: '是' }]"
      />
      <custom-field
        v-if="showTakeGoodsField"
        name="weight"
        label="重量"
        placeholder="请输入重量"
        :rules="[{require: true}]"
      />
      <custom-field
        v-if="showTakeGoodsField"
        name="volume"
        label="体积"
        placeholder="请输入体积"
        :rules="[{require: true}]"
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
      <!-- <div class="submit-checkbox">
        <van-checkbox
          v-model="agreePackage"
          icon-size=".15rem"
          checked-color="#FFCD00"
          shape="square"
        >天天拼车套餐，免去天天发布信息（非必选）</van-checkbox>
      </div> -->
      <main-button
        center
        style="margin-top:.22rem"
        @click="handleSubmit"
      >发布</main-button>
    </div>

    <!-- 选择套餐窗口 -->
    <!-- <choose-combo-layer
      ref="layer"
      @close="handlePopupClose"
      @submit="handleChangeCombo"
    /> -->
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { Checkbox } from 'vant'
import { isEmpty } from 'lodash'
import { Form, Item, Field, Picker, Textarea } from '@/components/Form'
import MainButton from '@/components/MainButton'
// import ChooseComboLayer from '@/components/Layer/ChooseCombo'
import { customer as customerConfig } from './config.js'

export default {
  components: {
    'van-checkbox': Checkbox,
    'custom-form': Form,
    'custom-item': Item,
    'custom-field': Field,
    'custom-picker': Picker,
    'custom-textarea': Textarea,
    'main-button': MainButton
    // 'choose-combo-layer': ChooseComboLayer
  },
  data: () => ({
    // 选择的发布类型
    publishType: 2,
    // 表单列表
    formOptions: customerConfig,
    // 所有的发布类型
    orderMenu: [
      { id: 1, label: '拼车' },
      { id: 4, label: '上下班拼车' },
      // { id: 2, label: '城际拼车' },
      // { id: 3, label: '跨省拼车' },
      { id: 5, label: '顺路带物' }
    ],
    // 是否带物
    isTakeGoods: 0,
    // 是否同意协议
    agreePact: true,
    // agreePackage: false,
    combo: {}
  }),
  computed: {
    ...mapState(['release', 'history']),
    // 是否显示 [是否带物] 的 [重量] 和 [体积]
    showTakeGoodsField () {
      const { publishType, isTakeGoods } = this
      return publishType !== 5 && publishType !== 6 && isTakeGoods === 1
    },
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
        orderNum: parseInt(values.orderNum),
        // 发布类型：乘客发布
        orderType: 2
      }
      // 订单类型
      // if (this.isTakeGoods && this.isTakeGoods === 1) {
      //   data.publishType = 5
      // } else if (this.publishType === 1) {
      //   data.publishType = this.judgeType()
      // }
      data.publishType = this.judgeType()
      console.log(data)
      // 通知父组件做提交相关操作
      this.$emit('submit', { data, type: 'customer' })
    },
    // 父组件提交后调用该方法，清空表单
    clearForm () {
      this.$refs.form.clear()
    },
    // 重置时间
    resetTime () {
      const nowTime = moment()
      // const minuteNum = nowTime.get('minute') % 5
      const decNum = 30 - (nowTime.get('minute') % 5)
      const time = moment().add('minute', decNum).format('YYYY-MM-DD HH:mm')
      console.log(decNum, time)
      this.$refs.form.setValueField('startTime', time)
    },
    // 弹出层关闭
    // handlePopupClose () {
    //   if (JSON.stringify(this.combo) === '{}') {
    //     this.agreePackage = false
    //   }
    // },
    // // 选择套餐
    // handleChangeCombo (value) {
    //   this.combo = value
    // },
    // 判断拼车单类型
    judgeType () {
      if (!this.allInputStartEnd) return 1
      const { startAddr, endAddr } = this.release
      if (startAddr.pname !== endAddr.pname) return 3
      if (this.getCityName(startAddr.cityname) === this.getCityName(endAddr.cityname)) {
        return startAddr.adname === endAddr.adname ? 1 : 2
      }
      return 1
    },
    getCityName (data) {
      return ['重庆市', '北京市', '上海市', '天津市'].indexOf(data.pname) === -1
        ? data.cityname
        : data.pname
    }
  },
  mounted () {
    const data = this.history.customerPublish
    if (!isEmpty(data)) {
      console.log(data)
      this.$refs.form.setValues(data)
    }
  },
  watch: {
    agreePackage: function (newVal) {
      if (newVal) this.$refs.layer.show()
      else this.combo = {}
    }
    // startAddrName: function (newVal) {
    //   if (!this.allInputStartEnd) return
    //   const type = this.judgeType()
    //   const typeName = this.orderMenu.find(i => i.id === type).label
    //   this.$refs.form.setValueField('publishType', type)
    //   this.$toast({ message: `已为您自动选择为：${typeName}`, duration: 1000 })
    // },
    // endAddrName: function (newVal) {
    //   if (!this.allInputStartEnd) return
    //   const type = this.judgeType()
    //   const typeName = this.orderMenu.find(i => i.id === type).label
    //   this.$refs.form.setValueField('publishType', type)
    //   this.$toast({ message: `已为您自动选择为：${typeName}`, duration: 1000 })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';
</style>
