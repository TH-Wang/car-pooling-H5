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
          <search-card search-type="release" ref="driver_search_card" :hasButton="false"/>
        </div>

        <driver-form-body ref="driver" @submit="handleSubmit" />

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
import { insertPublish, inesrtPublishPassenger } from '@/api'
import { cloneDeep } from 'lodash'
import SearchCard from '@/components/SearchCard'
import CustomerFormBody from './customer'
import DriverFormBody from './driver'

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
    tabId: 0
  }),
  computed: {
    ...mapState(['user', 'position', 'release'])
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
        // 2. 提示确认手机号
        await this.confirmPhone()
        // 3. 提示收取信息费
        await this.alertCost()
        // 4. 发起请求
        const res = type === 'driver'
          ? await this.driverRequest(cloneDeep(data))
          : await this.customerRequest(cloneDeep(data))
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
        // 6. 通知子组件清空表单
        this.$refs[type].resetTime()
        // 如果发布成功
        this.$toast.success('发布成功')
        this.$router.push(`/common/tripshare/${type}?id=${res.data.data}`)
      } catch (error) {
        console.log(error)
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
    // 发送请求（乘客发布）
    customerRequest (data) {
      // 用户手机号
      data.telPhone = this.user.info.phone
      // 获取起止点信息
      const { startAddr, endAddr } = this.release
      data.startAddr = startAddr.name
      data.startLon = startAddr.location.lng
      data.startLat = startAddr.location.lat
      data.endAddr = endAddr.name
      data.endLon = endAddr.location.lng
      data.endLat = endAddr.location.lat
      // 删除多余的中间路线字段
      delete data.middlePoint
      return inesrtPublishPassenger(data)
    },
    // 发送请求（司机发布）
    driverRequest (data) {
      // 用户手机号
      data.mobilePhone = this.user.info.phone

      // 获取起止点、途径点信息
      data.passPointList = this.getLineData(data)
      // 删除多余的中间路线字段
      delete data.middlePoint

      // 订单状态（进行中）
      data.orderState = 1

      // 发起请求
      return insertPublish(data)
    },
    // 获取起点、终点和途径点
    getLineData (data) {
      // 出发点、目的地、途径点
      const _this_ = this
      const result = []
      const { startAddr, passPointList, endAddr } = this.release
      let sort = 0
      // 出发点
      result.push({
        ..._this_.filterPointParams(startAddr),
        sort: ++sort,
        type: 1
      })
      // 途径点
      for (let i = 0; i < passPointList.length; i++) {
        result.push({
          ..._this_.filterPointParams(passPointList[i]),
          sort: ++sort,
          type: 2
        })
      }
      // 目的地
      result.push({
        ..._this_.filterPointParams(endAddr),
        sort: ++sort,
        type: 3
      })
      console.log(result)
      return result
    },
    // 通过地点信息筛选参数
    filterPointParams (data) {
      const { pname, cityname, adname, name, location } = data

      // 直辖市
      const city = ['重庆市', '北京市', '上海市', '天津市']
      const result = {
        pointName: name,
        lon: location.lng,
        lat: location.lat
      }
      // 如果是直辖市
      if (city.indexOf(pname) !== -1) {
        return {
          ...result,
          pname: cityname,
          cityname: adname
          // fullName: `${cityname}${adname}${name}`
        }
      }
      // 普通城市
      return {
        ...result,
        pname,
        cityname
        // fullName: `${pname}${cityname}${name}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/release.scss';
</style>
