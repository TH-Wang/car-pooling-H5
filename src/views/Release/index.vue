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

        <div v-if="identity === 1">
          <!-- 搜索卡片 -->
          <div class="search-card-wrap">
            <search-card search-type="release" ref="driver_search_card" :hasButton="false"/>
          </div>

          <driver-form-body ref="driver" @submit="handleSubmit" />
        </div>

        <van-empty v-else class="empty-wrap" description="您还没有认证为车主">
          <div
            class="tobe-driver-button"
            @click="$router.push('/common/setting?guide=authDriver')"
          >成为车主</div>
        </van-empty>

      </van-tab>

      <!-- 乘客发布 -->
      <van-tab title="乘客发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card search-type="release" ref="customer_search_card" :hasButton="false"/>
        </div>

        <customer-form-body ref="customer" @submit="handleSubmit" />

      </van-tab>
    </van-tabs>

    <!-- 联系号码 -->
    <div class="confirm-phone" v-show="showPhoneTip">
      请确认你的联系手机号
      <span class="phone">{{user.info.phone}}</span>
      <span class="link" @click="$router.push('/common/phone/modify')">修改手机号</span>
    </div>

    <!-- 温馨提示 -->
    <div class="tip" v-show="showPhoneTip">
      <p>温馨提示</p>
      <p>请务必保证信息的真实，如被拼友投诉，将被平台限制发信息哦</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { Tabs, Tab } from 'vant'
import { insertPublish, inesrtPublishPassenger } from '@/api'
import { cloneDeep } from 'lodash'
import SearchCard from '@/components/SearchCard'
import CustomerFormBody from './customer'
import DriverFormBody from './driver'
// import confirmLogin from '@/utils/confirmLogin'
import getLineData, { filterPointParams } from '@/utils/transPos'
import { aliPay, wexinPay } from '@/utils/pay'
import { getUserCode, isWeixin } from '@/utils/wx'

export default {
  name: 'Release',
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'search-card': SearchCard,
    'customer-form-body': CustomerFormBody,
    'driver-form-body': DriverFormBody
  },
  data: () => ({
    tabId: 0,
    code: null
  }),
  computed: {
    ...mapState(['user', 'position', 'release', 'tabsId']),
    ...mapGetters(['identity']),
    showPhoneTip () {
      // 如果是乘客发布，则正常展示
      if (this.tabsId.release === 1) return true
      // 如果是车主发布，则判断是否已认证车主
      else return this.identity === 1
    }
  },
  methods: {
    // 提交
    async handleSubmit ({ data, type }) {
      try {
        // 1. 校验起止点信息是否输入
        if (!this.$refs[type + '_search_card'].validate()) {
          window.scrollTo(0, 0)
          return
        }
        // 2. 提示收取信息费
        await this.alertCost()
        // 3. 发起请求
        const res = type === 'driver'
          ? await this.driverRequest(cloneDeep(data))
          : await this.customerRequest(cloneDeep(data))
        // 4. 如果需要支付
        if (type === 'driver' && data.setType > 0) {
          const id = res.data.data.data.id
          this.handlePay(res, data.payType, '/common/order/detail?id=' + id)
          return
        }
        // 5. 处理反馈
        if (res.data.status === -4) {
          // 如果token失效
          this.$dialog.alert({ message: '请重新登录' })
          this.$router.push('/common/login')
          return
        } else if (res.data.status !== 200) {
          // 发布失败
          this.$toast.fail('发布失败\n请稍后再试')
          return
        }
        // 6. 重置时间未当前时间的半小时后
        this.$refs[type].resetTime()
        // 如果发布成功
        const commitType = type === 'driver' ? 'setDriverPublish' : 'setCustomerPublish'
        this.$store.commit(commitType, data)
        this.$toast.success('发布成功')
        // 跳转分享订单信息页面
        let pathInfo = {}
        const id = res.data.data
        type === 'driver'
          ? pathInfo = { path: '/common/tripshare/driver', query: { id } }
          : pathInfo = { path: '/common/tripshare/customer', query: { id, quick: 1 } }
        this.$router.push(pathInfo)
      } catch (error) {
        console.log(error)
        this.$dialog.alert({
          message: '请选择使用支付宝支付'
        })
      }
    },
    // 提示确认手机号
    async confirmPhone () {
      return new Promise((resolve, reject) => {
        const phone = this.$store.state.user.info.phone
        this.$dialog.confirm({
          title: '提示',
          message: `请确认 <span style="color:#FFCD00">${phone}</span> 能联系到你`,
          allowHtml: true,
          confirmButtonText: '确认在用',
          cancelButtonText: '修改手机号'
        }).then(() => { resolve() })
          .catch(() => { this.$router.push('/common/phone/modify') })
      })
    },
    // 提示收取信息费
    alertCost () {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.$dialog.confirm({
            title: '提示',
            message: '拼车之家信息发布，仅向车主收取信息服务费，信息服务费收费标准用见《用户协议》，行程结束后计费，请知悉。',
            confirmButtonText: '确认发布',
            cancelButtonText: '取消'
          }).then(() => {
          // 发送请求
            resolve()
          })
        }, 300)
      })
    },
    // 发送请求（乘客发布）
    customerRequest (data) {
      // 用户手机号
      data.telPhone = this.user.info.phone
      // 获取起止点信息
      const { startAddr, endAddr } = this.release
      const startParams = filterPointParams(startAddr)
      const endParams = filterPointParams(endAddr)
      Object.assign(data, {
        // 起点信息
        startAddr: startParams.pointName,
        startLon: startParams.lon,
        startLat: startParams.lat,
        pname: startParams.pname,
        cityname: startParams.cityname,
        adname: startParams.adname,
        township: startParams.township || '',
        // 终点信息
        endAddr: endParams.pointName,
        endLon: endParams.lon,
        endLat: endParams.lat,
        endpname: endParams.pname,
        endcityname: endParams.cityname,
        endadname: endParams.adname,
        endtownship: endParams.township || ''
      })
      // 删除多余的中间路线字段
      delete data.middlePoint
      return inesrtPublishPassenger(data)
    },
    // 发送请求（司机发布）
    driverRequest (data) {
      // 用户手机号
      data.mobilePhone = this.user.info.phone

      // 获取起止点、途径点信息
      data.passPointList = getLineData(this.release)
      if (data.publishType === 5) {
        data.passPointList = data.passPointList.filter(i => i.type !== 2)
      }
      // 删除多余的中间路线字段
      delete data.middlePoint

      // 订单状态（进行中）
      data.orderState = 1
      console.log(data)
      // 发起请求
      return insertPublish(data)
    },
    // 处理支付
    handlePay (res, type, redirect) {
      // 如果是微信支付
      type === 1 ? aliPay(res) : wexinPay(res, redirect)
    }
  },
  activated () {
    if (!this.user.token) return
    if (!this.$store.state.ticket.code && isWeixin()) {
      getUserCode('/release')
      return
    }
    // 如果距上次登录超过了三天，提示确认手机号
    if ((new Date().getTime() - this.user.leaveTime) > 259200000) {
      this.confirmPhone()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';

.empty-wrap{
  border-top: solid 1px $normal-text;
}
// 成为车主的按钮
.tobe-driver-button{
  padding: .08rem .2rem;
  border-radius: .04rem;
  background-color: $main-color;
  box-shadow: 0px 6px 10px -2px rgba(255, 174, 32, 0.5);
  @include font (.16rem, #FFFFFF);
}
</style>
