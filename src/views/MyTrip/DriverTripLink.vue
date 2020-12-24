<template>
  <div>
    <div ref="main">
      <!-- 导航栏 -->
      <van-nav-bar
        title="出行详情"
        left-arrow
        fixed
        placeholder
        @click-left="$router.go(-1)"
        @click-right="$router.replace('/home')"
      >
        <template #right><van-icon name="wap-home" /></template>
      </van-nav-bar>

      <!-- 顶部 -->
      <order-info-header
        :record="{
          startAddr: addrName.startAddr,
          endAddr: addrName.endAddr,
          seatNum: record.remainingSeat}"
        content-type="seat"
      />

      <!-- 备注 -->
      <div class="remark cell" style="padding-top:.05rem">
        <span>备注</span>{{record.remark || '无'}}
      </div>

      <!-- 电话 -->
      <div class="cell">
        <div class="phone-title">预定后可查看完整电话</div>
        <div>
          <van-icon name="phone" size=".19rem" color="#FFAE20" />
          <span class="phone-num">{{telPhone}}</span>
        </div>
      </div>

      <!-- 地图路线 -->
      <div class="page-title" style="margin-top:.20rem">
        <p>地图路线</p>
        <map-view style="margin-top:.15rem" :info="record.passPointList" />
      </div>
    </div>

    <!-- 预约按钮 -->
    <main-button :class="submitButtonClass" width="3.45rem" @click="handleReserve">
      {{this.record.remainingSeat > 0 ? '预约' : '更多车主'}}
    </main-button>
  </div>
</template>

<script>
import { getPublishDetail } from '@/api'
import { isEmpty } from 'lodash'
import { Header } from '@/components/OrderInfo/index'
import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'
import formButtonMixin from '@/mixins/form-button-mixin'

export default {
  mixins: [formButtonMixin],
  components: {
    'order-info-header': Header,
    'map-view': MapView,
    'main-button': MainButton
  },
  data: () => ({
    orderId: null,
    record: {}
  }),
  computed: {
    // 起止点名称
    addrName () {
      if (isEmpty(this.record)) return ''
      const passPointList = this.record.passPointList
      return {
        startAddr: passPointList.find(i => i.type === 1).pointName,
        endAddr: passPointList.find(i => i.type === 3).pointName
      }
    },
    // 带星号的手机号码
    telPhone () {
      if (!this.record.mobilePhone) return '****'
      const t = this.record.mobilePhone
      return t.slice(0, 3) + '****' + t.slice(-4)
    }
  },
  methods: {
    // 请求数据
    async handleReq () {
      const res = await getPublishDetail(this.orderId)
      this.record = res.data.data
    },
    // 点击预约
    handleReserve () {
      // 如果可以预约就跳转预约页面
      if (this.record.remainingSeat > 0) {
        // 判断是否登录...

        // 跳转到预约页面
        const id = this.orderId
        this.$router.push({ path: '/common/reserve', query: { id } })
      } else {
        // 更多车主跳转到首页
        this.$router.push('/home')
      }
    }
  },
  created () {
    this.orderId = this.$route.query.id
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.cell{
  padding: .2rem 0;
  margin: 0 .15rem;
  border-bottom: solid 1px $normal-text;
}

// 备注
.remark{
  @include font(.14rem, $main-text, bold);
  line-height: .28rem;

  span{
    display: inline-block;
    width: .5rem;
    margin-right: .2rem;
    @include font(.12rem, $tip-text);
    @include textJustify;
  }
}

// 联系方式
.phone-title{
  @include font (.12rem, $main-text);
  margin-bottom: .15rem;
}

// 手机号码
.phone-num{
  @include font (.24rem, $sub-color, bold);
  margin-left: .05rem;
}

// 地图路线
.page-title{
  margin: 0 .15rem;
  @include font (.18rem, $main-text, bold);
}

// 底部按钮样式
.flow{
  margin: .60rem auto .30rem auto;
}
.fixed{
  position: fixed;
  bottom: .30rem;
  left: .15rem;
}
</style>
