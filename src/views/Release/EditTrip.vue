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
        :default-index="1"
        :columns="orderMenu"
      />
      <!-- 详细表单项 -->
      <custom-item
        v-for="item in formOptions[publishType]"
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

    <!-- 操作按钮 -->
    <div class="button-group">
      <main-button width="1.2rem" @click="handleSetNull">设为无座</main-button>
      <main-button width="2.1rem" @click="handleSave">保存行程</main-button>
    </div>
  </div>
</template>

<script>
import { userCarDetail, getPublishDetail } from '@/api'
import { Form, Item, Picker, Textarea } from '@/components/Form'
import SearchCard from '@/components/SearchCard'
import MainButton from '@/components/MainButton'
import { getDriverOpts } from './config'
import { mapState } from 'vuex'

export default {
  name: 'EditTrip',
  components: {
    'search-card': SearchCard,
    'custom-form': Form,
    'custom-item': Item,
    'custom-picker': Picker,
    'custom-textarea': Textarea,
    'main-button': MainButton
  },
  data: () => ({
    orderId: null,
    publishType: 1,
    formOptions: {},
    // 所有的发布类型
    orderMenu: [
      { id: 1, label: '拼车' },
      { id: 4, label: '上下班拼车' },
      { id: 5, label: '顺路带物' },
      { id: 6, label: '旅游包车' }
    ]
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
    }
  },
  methods: {
    // 获取该订单信息
    async getOrderInfo () {
      const res = await getPublishDetail(this.orderId)
      this.setFormValues(res.data.data)
    },
    // 获取所有的车辆信息
    async getCarInfo () {
      if (this.user.carList.length === 0) {
        const res = await userCarDetail()
        this.$store.commit('setCarInfo', res.data.data)
      }
      // 赋值到表单配置上
      this.formOptions = getDriverOpts(this.carList)
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
    },
    // 设为无座
    async handleSetNull () {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '设为无座仅将信息从拼车列表撤下，<strong style="color:#FFCD00">不影响已预订</strong> 的乘客。确定设为无座？',
          allowHtml: true
        })
        this.$toast.success({ message: '设置成功' })
        this.$router.go(-1)
      } catch (error) {}
    },
    // 保存行程
    handleSave () {
      this.$dialog.alert({
        title: '提示',
        message: '本次行程已有乘客预定记录，行程信息不能修改。如需发布新行程，可点击“设为无座”，然后重新“车主发布”'
      })
    }
  },
  activated: async function () {
    this.orderId = this.$route.query.id
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
