<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="发布" fixed placeholder :border="false" />

    <!-- tabs -->
    <van-tabs
      :active="$store.state.tabsId.release"
      @change="(index) => {$store.commit('changeTabsId', {type: 'release', index})}"
      color="#262626"
      title-inactive-color="#BFBFBF"
      title-active-color="#262626"
      background="#ffffff"
      line-width="52px"
      line-height="2px"
    >
      <!-- 车主发布 -->
      <van-tab title="车主发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card :hasButton="false" v-model="addr" />
        </div>

        <driver-form-body ref="driver" @submit="handleSubmit" />

      </van-tab>

      <!-- 乘客发布 -->
      <van-tab title="乘客发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card :hasButton="false" v-model="addr" />
        </div>

        <customer-form-body ref="customer" @submit="handleSubmit" />

      </van-tab>
    </van-tabs>

    <!-- 联系号码 -->
    <div class="confirm-phone">
      请确认你的联系手机号
      <span class="phone">{{user.info.phone}}</span>
      <span class="link" @click="$router.push('/common/phone/modify')">修改手机号</span>
    </div>

    <!-- 温馨提示 -->
    <div class="tip">
      <p>温馨提示</p>
      <p>请务必保证信息的真实，如被拼友投诉，将被平台限制发信息哦</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tabs, Tab } from 'vant'
import { insertPublish } from '@/api'
import { isEmpty } from 'lodash'
import SearchCard from '@/components/SearchCard'
import CustomerFormBody from './customer'
import DriverFormBody from './driver'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'search-card': SearchCard,
    'customer-form-body': CustomerFormBody,
    'driver-form-body': DriverFormBody
  },
  data: () => ({
    // 起止点
    addr: {
      start: '',
      end: ''
    },
    tabId: 0
  }),
  computed: {
    ...mapState(['user', 'position'])
  },
  methods: {
    // 提交
    async handleSubmit ({ data, type }) {
      // 1. 提示确认手机号
      await this.confirmPhone()
      // 2. 提示收取信息费
      await this.alertCost()
      // 3. 发起请求
      await this.handleRequest(data)
      // 4. 通知子组件清空表单
      this.$refs[type].clearForm()
    },
    // 提示确认手机号
    async confirmPhone () {
      try {
        const phone = this.$store.state.user.info.phone
        return await this.$dialog.confirm({
          title: '提示',
          message: `请确认 <span style="color:#FFCD00">${phone}</span> 能联系到你`,
          allowHtml: true,
          confirmButtonText: '确认在用',
          cancelButtonText: '修改手机号'
        })
      } catch (error) {
        // 点击修改手机号
        this.$router.push('/common/phone/modify')
      }
    },
    // 提示收取信息费
    alertCost () {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.$dialog.confirm({
            title: '提示',
            message: '2018年11月16日起，为车主每拼到1人收取3元的信息服务费，行程结束后计费，请知悉。',
            confirmButtonText: '确认发布',
            cancelButtonText: '取消'
          }).then(() => {
          // 发送请求
            resolve()
          })
        }, 300)
      })
    },
    // 发送请求
    async handleRequest (data) {
      // 用户手机号
      data.mobilePhone = this.user.info.phone

      // 地区id
      data.cnRegionInfoCode = isEmpty(this.position.county)
        ? this.position.city.code
        : this.position.county.code

      // 出发点、目的地、途径点
      const passPointList = []
      const { start, end } = this.addr
      // 出发点
      passPointList.push({ pointName: start, sort: 1, type: 1 })
      // 目的地
      passPointList.push({ pointName: end, sort: 2, type: 3 })
      data.passPointList = passPointList

      // 订单状态（进行中）
      data.orderState = 1

      // 发起请求
      const res = await insertPublish(data)
      // 如果token失效
      if (res.data.status === -4) {
        this.$dialog.alert({ message: '请重新登录' })
        this.$router.push('/common/login')
        return
      }
      // 如果发布成功
      this.$toast.success('发布成功')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';
</style>
