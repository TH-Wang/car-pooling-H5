<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="确认订单"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 反馈图标 -->
    <feedback type="success" title="购买成功" tip="请注意出发时间，不要错过啦" />

    <div class="card">
      <div class="title">订单信息</div>
      <div class="info">
        <div class="info-label">订单编号</div>
        <div class="info-text">{{record.orderNo}}</div>
      </div>
      <div class="info">
        <div class="info-label">出行时间</div>
        <div class="info-text">{{time.start}} 至 {{time.end}}</div>
      </div>
      <div class="info">
        <div class="info-label">支付方式</div>
        <div class="info-text">在线支付/微信支付</div>
      </div>
      <div class="info">
        <div class="info-label">实付金额</div>
        <div class="info-text">¥{{record.price}}</div>
      </div>
      <div class="info">
        <div class="info-label">付款时间</div>
        <div class="info-text">{{record.payTime}}</div>
      </div>
    </div>

    <!-- <main-button type="hollow" color="gray" center bold>退票</main-button> -->

    <!-- 温馨提示 -->
    <order-info-tips :tips="tips" />
  </div>
</template>

<script>
import moment from 'moment'
import { getTourCarOrderList } from '@/api'
import { Tips } from '@/components/OrderInfo/index'
import Feedback from '@/components/Feedback'
// import MainButton from '@/components/MainButton'

export default {
  components: {
    feedback: Feedback,
    // 'main-button': MainButton,
    'order-info-tips': Tips
  },
  data: () => ({
    tips: [
      '温馨提示',
      '1.如您行程改变，请尽可能提前退订，<span style="color:#FFCD00">07月09日 08:00</span style="color:#FFCD00">前可<span style="color:#FFCD00">无责退订</span>。'
    ],
    id: null,
    record: null
  }),
  computed: {
    time () {
      if (!this.record) return {}
      const { startTime, endTime } = this.record
      return {
        state: moment(startTime).format('YYYY/MM/DD'),
        end: moment(endTime).format('YYYY/MM/DD')
      }
    }
  },
  methods: {
    async handleReq () {
      const res = await getTourCarOrderList(this.id)
      this.record = res.data.data
    }
  },
  created () {
    this.id = this.$route.query.id
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.card{
  margin: 0 .15rem;
  margin-top: .22rem;
  margin-bottom: .30rem;
  padding: 1px 0;
  border-block: .05rem;
  border-radius: .05rem;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);

  .title, .info{
    margin: .20rem;
  }

  .title{
    @include font (.18rem, $main-text, bold);
  }

  .info{
    &-label{
      @include font (.12rem, $sub-text);
    }
    &-text{
      @include font (.14rem, $main-text);
    }
  }
}
</style>
