<template>
  <div>

    <custom-form ref="form">
      <!-- 途径点（路线） -->
      <custom-textarea
        v-show="needLine"
        name="line"
        label="路线"
        custom
        @click="handleOpenLine"
      ><template>
        <div class="pass-point" :style="emptyLine">{{pointText}}</div>
        </template>
      </custom-textarea>
      <!-- 发布类型 -->
      <custom-picker
        v-model="publishType"
        name="publishType"
        label="发布类型"
        placeholder="请选择发布类型"
        :default-index="1"
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
        :rules="[{required: true}]"
      />
      <custom-field
        v-if="showTakeGoodsField"
        name="volume"
        label="体积"
        placeholder="请输入体积"
        :rules="[{required: true}]"
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
        >
          我已阅读并同意发布拼车信息
          <span class="link" @click="$router.push('/common/user/agreement')">《用户协议》</span>
        </van-checkbox>
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

    <!-- 输入路线的对话框 -->
    <van-dialog
      v-model="inputLine"
      confirm-button-color="#0AD593"
      width="2.80rem"
      @confirm="handleChangeMiddlePoint"
    ><div class="line-input-container">
        <div><b>{{release.startAddr.name || 'xx'}}出发</b></div>
        <textarea
          type="text"
          ref="textarea"
          :placeholder="defaultText"
          rows="4"
        />
        <div><b>目的地：{{release.endAddr.name || 'xx'}}</b></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { Checkbox } from 'vant'
import { isEmpty } from 'lodash'
import { userCarDetail, latestDriverPublish } from '@/api'
import { Form, Item, Field, Picker, Textarea } from '@/components/Form'
import MainButton from '@/components/MainButton'
import ChooseComboLayer from '@/components/Layer/ChooseCombo'
import { getDriverOpts } from './config'
import { isWeixin } from '@/utils/wx'

export default {
  components: {
    'van-checkbox': Checkbox,
    'custom-form': Form,
    'custom-item': Item,
    'custom-field': Field,
    'custom-picker': Picker,
    'custom-textarea': Textarea,
    'main-button': MainButton,
    'choose-combo-layer': ChooseComboLayer
  },
  props: {},
  data: () => ({
    // 选择的发布类型
    publishType: 1,
    // 所有的发布类型
    orderMenu: [
      { id: 1, label: '拼车' },
      // { id: 2, label: '城际拼车' },
      // { id: 3, label: '跨省拼车' },
      { id: 4, label: '上下班拼车' },
      { id: 5, label: '顺路带物' },
      { id: 6, label: '旅游包车' }
    ],
    // 表单列表
    formOptions: {},
    // 是否带物
    isTakeGoods: 0,
    // 是否统一协议
    agreePact: true,
    // 是否选择套餐
    agreePackage: false,
    // 中间点
    middlePoint: '',
    // 显示输入路线的对话框
    inputLine: false,
    // 选择套餐
    combo: {}
  }),
  computed: {
    ...mapState(['user', 'release', 'history']),
    // 路线拼接
    pointText () {
      if (this.release.passPointList.length === 0) return '点击选择途径点'
      const { startAddr, passPointList, endAddr } = this.release
      return (startAddr.name ? startAddr.name + ' - ' : '') +
        passPointList.map(i => i.name).join(' - ') +
        (endAddr.name ? ' - ' + endAddr.name : '')
    },
    // 路线模板
    lineText () {
      const { startAddr, endAddr } = this.release
      if (!this.allInputStartEnd) return ''
      return `${startAddr.name || 'xx'}出发，${this.middlePoint || this.defaultText}，目的地：${endAddr.name || 'xx'}`
    },
    // 途径点模板
    defaultText () {
      if (!this.allInputStartEnd) return ''
      return this.judgeType() === 3
        ? '途径xx站（推荐上车），xx站上高速，xx站下高速'
        : '途径xx路、x号线xx地铁/轻轨站（推荐上车点），xx下高速'
    },
    carList () {
      return this.user.carList.map(item => {
        // const label = item.carBrand + ' ' + item.carModel
        return { id: item.id, label: item.carModel }
      })
    },
    // 需要用户输入路线
    needLine () {
      return this.publishType <= 4
    },
    // 路线是否为空
    emptyLine () {
      return this.release.passPointList.length === 0 ? 'color:#999' : ''
    },
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
    // 请求最近一次发布的信息，并将数据设置到表单内
    async setLastData () {
      const res = await latestDriverPublish()
      const data = res.data.data
      if (!data) return
      const publishType = parseInt(data.publishType)
      data.publishType = publishType >= 1 && publishType <= 3 ? 1 : publishType
      this.$store.commit('setReleaseAddrInfo', data.passPointList)
      this.$refs.form.setValues(data)
      const carId = this.user.carList[0].id
      setTimeout(() => {
        this.$refs.form.setValues({
          remark: '拼车顺路上下，预订后请电话确认一下，请说拼车之家提供的信息服务',
          vehicleType: carId,
          weight: data.weight,
          volume: data.volume,
          cost: data.cost
        })
        this.resetTime()
      }, 200)
    },
    // 获取所有的车辆信息
    async getCarInfo () {
      if (this.user.carList.length === 0) {
        // this.$toast.loading({ message: '加载中', duration: 10000 })
        const res = await userCarDetail()
        this.$store.commit('setCarInfo', res.data.data)
        // this.$toast.clear()
      }
      // 赋值到表单配置上
      this.formOptions = getDriverOpts(this.user.carList)
    },
    // 提交
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
        // 发布类型：车主发布
        orderType: 1
      }
      // 订单类型
      // if (this.isTakeGoods && this.isTakeGoods === 1) {
      //   data.publishType = 5
      // } else if (this.publishType === 1) {
      //   data.publishType = this.judgeType()
      // }
      data.publishType = this.judgeType()
      // 顺路带物
      if (data.publishType === 5) data.isTakeGoods = 1
      // 数据类型转换
      if (data.cost) data.cost = parseInt(data.cost)
      // if (data.weight) data.weight = parseInt(data.weight)
      // if (data.volume) data.volume = parseInt(data.volume)

      // 如果需要传途径点
      if (this.needLine) {
        data.middlePoint = this.middlePoint
      }
      // 如果没有选择套餐
      if (isEmpty(this.combo)) {
        data.setType = 0
      } else {
        Object.assign(data, this.combo)
        // 如果是微信浏览器，则发送code
        if (isWeixin()) data.code = this.$store.state.ticket.code
      }

      // 通知父组件做提交相关操作
      this.$emit('submit', { data, type: 'driver' })
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
      this.$refs.form.setValueField('startTime', time)
    },
    // 打开输入路线的对话框
    handleOpenLine () {
      this.$router.push('/common/passpoint?type=release')
    },
    // 改变途径点
    handleChangeMiddlePoint () {
      this.middlePoint = this.$refs.textarea.value
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
      if (this.publishType > 3) return this.publishType
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
  created: async function () {
    this.getCarInfo()
  },
  mounted () {
    this.setLastData()
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

.pass-point{
  min-height: .3rem;
}

.line-input-container{
  padding: .20rem;

  textarea{
    border: none;
    width: 100%;
    // background-color: #f5f5f5;
    margin: .05rem 0;
  }
}
</style>
