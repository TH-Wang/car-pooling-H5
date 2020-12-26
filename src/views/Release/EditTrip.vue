<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改行程"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />
    <div style="height: .2rem"></div>

    <!-- 搜索卡片 -->
    <div class="search-card-wrap">
      <search-card search-type="trip" ref="driver_search_card" :hasButton="false"/>
    </div>

    <!-- 表单主体 -->
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

    <!-- 操作按钮 -->
    <div class="button-group">
      <main-button
        width="1.2rem"
        @click="handleSetNull"
        :color="submitButton.color"
      >设为无座</main-button>
      <main-button
        width="2.1rem"
        @click="handleSave"
        :color="submitButton.color"
      >{{submitButton.text}}</main-button>
    </div>
  </div>
</template>

<script>
import { userCarDetail, getPublishDetail, updatePublish, noSeatNum } from '@/api'
import { cloneDeep, isEmpty } from 'lodash'
import { Form, Item, Field, Picker, Textarea } from '@/components/Form'
import SearchCard from '@/components/SearchCard'
import MainButton from '@/components/MainButton'
import { getDriverOpts } from './config'
import { mapState } from 'vuex'
import getLineData from '@/utils/transPos'

export default {
  name: 'EditTrip',
  components: {
    'search-card': SearchCard,
    'custom-form': Form,
    'custom-item': Item,
    'custom-field': Field,
    'custom-picker': Picker,
    'custom-textarea': Textarea,
    'main-button': MainButton
  },
  data: () => ({
    orderId: null,
    pCount: 0,
    state: null,
    publishType: 1,
    formOptions: {},
    // 所有的发布类型
    orderMenu: [
      { id: 1, label: '拼车' },
      { id: 4, label: '上下班拼车' },
      { id: 5, label: '顺路带物' },
      { id: 6, label: '旅游包车' }
    ],
    // 是否带物
    isTakeGoods: 0
  }),
  computed: {
    ...mapState(['user', 'trip']),
    // 路线拼接
    pointText () {
      if (this.trip.passPointList.length === 0) return '点击选择途径点'
      const { startAddr, passPointList, endAddr } = this.trip
      return (startAddr.name ? startAddr.name + ' - ' : '') +
        passPointList.map(i => i.name).join(' - ') +
        (endAddr.name ? ' - ' + endAddr.name : '')
    },
    // 需要用户输入路线
    needLine () {
      return this.publishType <= 4
    },
    // 路线是否为空
    emptyLine () {
      return this.trip.passPointList.length === 0 ? 'color:#999' : ''
    },
    // 保存行程按钮状态
    submitButton () {
      switch (parseInt(this.state)) {
        case 1: return { text: '保存行程', color: 'yellow' }
        case 2: return { text: '行程已撤下', color: 'gray' }
        case 3: return { text: '行程已完成', color: 'gray' }
        default: return { text: '保存行程', color: 'yellow' }
      }
    },
    // 是否显示 [是否带物] 的 [重量] 和 [体积]
    showTakeGoodsField () {
      const { publishType, isTakeGoods } = this
      return publishType !== 5 && publishType !== 6 && isTakeGoods === 1
    },
    // 是否起始点和终止点都显示了
    allInputStartEnd () {
      const { startAddr, endAddr } = this.trip
      return !isEmpty(startAddr.name) && !isEmpty(endAddr.name)
    }
  },
  methods: {
    // 获取该订单信息
    async getOrderInfo () {
      const res = await getPublishDetail(this.orderId)
      const data = res.data.data
      const publishType = data.publishType
      this.setFormValues({
        ...data,
        vehicleType: parseInt(data.vehicleType),
        publishType: publishType >= 1 && publishType <= 3 ? 1 : publishType
      })
    },
    // 获取所有的车辆信息
    async getCarInfo () {
      if (this.user.carList.length === 0) {
        const res = await userCarDetail()
        this.$store.commit('setCarInfo', res.data.data)
      }
      // 赋值到表单配置上
      this.formOptions = getDriverOpts(this.user.carList)
    },
    // 打开输入路线的对话框
    handleOpenLine () {
      this.$router.push('/common/passpoint?type=trip')
    },
    // 将订单信息设置到表单
    setFormValues (data) {
      // 设置位置信息到缓存中
      this.$store.commit('setTripAddrInfo', data.passPointList)
      // 设置表单信息
      this.$refs.form.setValues(data)
      setTimeout(() => {
        this.$refs.form.setValueField('weight', data.weight)
        this.$refs.form.setValueField('volume', data.volume)
      }, 300)
    },
    // 设为无座
    async handleSetNull () {
      // 如果该订单不是进行中则不进行操作
      if (parseInt(this.state) !== 1) return
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '设为无座仅将信息从拼车列表撤下，<strong style="color:#FFCD00">不影响已预订</strong> 的乘客。确定设为无座？',
          allowHtml: true
        })
        console.log('点击确认')
        const res = await noSeatNum(this.orderId)
        if (res.data.status === 200) {
          this.$toast.success({ message: '设置成功' })
          this.$router.go(-1)
        } else {
          this.$toast.fail({
            message: res.data.msg
          })
        }
      } catch (error) {}
    },
    // 保存行程
    async handleSave () {
      // 如果该订单不是进行中则不进行操作
      if (parseInt(this.state) !== 1) return
      // 如果已有乘客预约则提示并拦截修改
      if (this.pCount > 0) {
        this.$dialog.alert({
          title: '提示',
          message: '本次行程已有乘客预定记录，行程信息不能修改。如需发布新行程，可点击“设为无座”，然后重新“车主发布”'
        })
        return
      }
      // 否则提交修改信息
      this.handleSubmit()
    },
    // 提交修改
    async handleSubmit () {
      const { err, values } = await this.$refs.form.submit()
      if (err) return
      const data = cloneDeep(values)
      // 用户手机号
      data.mobilePhone = this.user.info.phone
      // 获取起止点、途径点信息
      data.passPointList = getLineData(this.trip)
      // 订单id
      data.id = parseInt(this.orderId)
      // 订单类型
      data.publishType = this.judgeType()
      // 顺路带物
      if (data.publishType === 5) data.isTakeGoods = 1
      console.log(data)
      // 发起请求
      const res = await updatePublish(data)
      if (res.data.status === 200) {
        this.$toast.success('修改成功')
        this.$router.go(-1)
      } else {
        this.$toast.fail({
          message: res.data.msg
        })
      }
    },
    // 判断拼车单类型
    judgeType () {
      if (this.publishType > 3) return this.publishType
      if (!this.allInputStartEnd) return 1
      const { startAddr, endAddr } = this.trip
      // 如果是后端返回的数据
      if (typeof startAddr.sort !== 'undefined') startAddr.adname = startAddr.cityname
      if (typeof endAddr.sort !== 'undefined') endAddr.adname = endAddr.cityname
      // 判断是否跨省
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
  activated: async function () {
    const { id, pCount, state } = this.$route.query
    this.pCount = pCount
    this.state = state
    // 如果是同一个订单信息则不再更新页面数据
    if (this.orderId === id) return
    this.orderId = id
    await this.getCarInfo()
    this.getOrderInfo()
  }
}
</script>

<style lang="scss" scoped>
.button-group{
  margin: 0 .15rem;
  margin-bottom: .3rem;
  @include flex (space-between, center);
}
</style>
