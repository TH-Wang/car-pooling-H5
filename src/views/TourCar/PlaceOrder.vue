<template>
  <div style="padding-bottom: .50rem">
    <!-- 导航栏 -->
    <van-nav-bar
      title="确认订单"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 顶部信息 -->
    <div class="header">
      <van-image :src="record.img" width="1.15rem" height=".90rem" />
      <div class="header-info">
        <div class="header-title">{{isTour ? record.title : record.carName}}</div>
        <!-- 旅游信息 -->
        <div v-if="isTour" class="header-detail">
          <p>出行时间：</p>
          <p>{{record.start}} 至 {{record.end}}</p>
        </div>
        <!-- 包车信息 -->
        <div v-else class="header-detail">
          <p>载重：{{record.load}}kg</p>
          <p>长宽高：{{record.widthHeight}}m</p>
          <p>容积：{{record.volume}}m³</p>
        </div>
      </div>
    </div>

    <custom-form ref="form">
      <div class="main-title">{{isTour ? '预定人信息' : '包车人信息'}}</div>
      <custom-field
        name="userName"
        label="联系人"
        v-model="form.userName"
        placeholder="请输入订单联系人姓名"
        :rules="[{required: true}]"
      />
      <custom-field
        name="phone"
        label="联系电话"
        placeholder="请输入订单联系人电话"
        type="tel"
        v-model="form.phone"
        :max-length="11"
        :rules="[{required: true}, {pattern: /^\d{11}$/, message: '手机号码格式不正确'}]"
      />
      <custom-field
        v-if="isTour"
        name="userNum"
        label="出行人数"
        v-model="form.userNum"
        placeholder="请输入此次出行人数"
        type="tel"
        :rules="[{required: true}, {pattern: /^\d+$/, message: '请输入数字'}]"
      />
      <template v-else>
        <custom-picker
          name="startTime"
          v-model="form.startTime"
          :columns="week"
          :defaultIndex="1"
          label="开始使用"
          placeholder="请选择开始使用时间"
        />
        <custom-picker
          name="endTime"
          v-model="form.endTime"
          :columns="week"
          :defaultIndex="5"
          label="结束使用"
          placeholder="请选择结束使用时间"
        />
      </template>
    </custom-form>

    <!-- 支付方式列表 -->
    <div class="main-title">支付方式</div>
    <van-radio-group class="radio-container" v-model="payType">
      <div
        class="radio-item"
        v-for="opt in payOptions"
        :key="opt.id"
        @click="payType = opt.id"
      >
        <img :src="opt.icon" alt="" />
        <span class="radio-item-label">{{opt.text}}钱包</span>
        <van-radio :name="opt.id" checked-color="#0AD593" icon-size=".20rem" />
      </div>
    </van-radio-group>

    <!-- 下方总计 -->
    <div class="total" :style="totalShadowStyle">
      <div>
        <p class="total-tip">总价</p>
        <div class="total-price">
          1000
          <span
            v-if="isTour"
            class="toggle-detail-button"
            @click="showDetail = !showDetail"
          >
            明细<van-icon name="arrow-up" :style="toggleButtonArrow" />
          </span>
        </div>
      </div>
      <div class="pay-button" @click="handleBuy">立即购买</div>
    </div>

    <!-- 明细弹出层 -->
    <van-popup v-if="isTour" v-model="showDetail" position="bottom" round>
      <div class="detail">
        <div class="detail-title">明细</div>
        <div class="detail-item">
          <span class="label">联系人</span><span>{{form.userName}}</span>
        </div>
        <div class="detail-item">
          <span class="label">联系人电话</span><span>{{form.phone}}</span>
        </div>
        <div class="detail-item">
          <span class="label">出行人数</span><span>{{form.userNum}}</span>
        </div>
        <div class="detail-item">
          <span class="label">支付方式</span><span>
            {{payOptions.find(i => i.id === payType).text}}
          </span>
        </div>
      </div>
    </van-popup>

    <!-- 支付 -->
    <!-- <form name="punchout_form" method="post" action="https://openapi.alipay.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=WFqDuBYWUwudDitYN7kBdsup5WaKkWeeAthO0c7kWkTPBLgYvF0khs5B3RUXuLMujBQKankBwEHvlSqQtyp0e5KEatLcohL5qIcJz%2BX8HQALTPfbujKT5tyh1W44PRPhrO5rjBkvKCtVmcimEMI59TB4gOKL4vgrsEt5kklsPlJChANYm6xBb1e%2FO6eBhbtjnLmSa8rkTBi8vzK32ucwcd%2BwAyCpzpdHlTioURQewY0yAWD%2B9ZYy4PjPWMHPjJyapefKzZAn83GmEDM2y%2BV4Rpd1L0t0AYRQ2jEMDy%2FQNfokc%2BwnMdNj3O2eo%2BUl6PcTO92wnX6ofVwGyUSHBmDnMg%3D%3D&notify_url=http%3A%2F%2Fwangtao.utools.club%2Fapi%2Fapp%2Fpay%2FwxRechargeNotify&version=1.0&app_id=2021002115684225&sign_type=RSA2&timestamp=2020-12-20+18%3A23%3A03&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=JSON">
      <input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;2020122001392103355&quot;,&quot;product_code&quot;:&quot;QUICK_MSECURITY_PAY&quot;,&quot;subject&quot;:&quot;%E6%B5%8B%E8%AF%95&quot;,&quot;total_amount&quot;:&quot;0.01&quot;}">
      <input type="submit" value="立即支付" style="display:none" >
    </form> -->
  </div>
</template>

<script>
import { getTourDetailById, getBusDetailById, createTourCarOrder } from '@/api'
import { Image, RadioGroup, Radio, Popup } from 'vant'
// import { isEmpty } from 'lodash'
import { Form, Field, Picker } from '@/components/Form'

export default {
  components: {
    'van-image': Image,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-popup': Popup,
    'custom-form': Form,
    'custom-field': Field,
    'custom-picker': Picker
  },
  data: () => ({
    // 当前页面类型: ['tour', 'car']
    mode: '',
    form: {},
    week: [
      { id: 0, label: '周日' },
      { id: 1, label: '周一' },
      { id: 2, label: '周二' },
      { id: 3, label: '周三' },
      { id: 4, label: '周四' },
      { id: 5, label: '周五' },
      { id: 6, label: '周六' }
    ],
    record: {},
    payType: 1,
    // 支付方式
    payOptions: [
      { id: 1, icon: require('@/assets/icons/pay/alipay.png'), text: '支付宝' },
      { id: 2, icon: require('@/assets/icons/pay/wechat.png'), text: '微信' }
    ],
    // 展示明细
    showDetail: false
  }),
  computed: {
    isTour () {
      return this.mode === 'tour'
    },
    totalShadowStyle () {
      return this.showDetail ? '' : 'box-shadow: 0px -5px 10px 0px rgba(38, 38, 38, 0.06)'
    },
    toggleButtonArrow () {
      return 'transition: all 0.3s;' + this.showDetail ? 'transform: rotateZ(180)' : ''
    }
  },
  methods: {
    // 请求数据
    async handleReq () {
      const res = this.isTour
        ? await getTourDetailById(this.id)
        : await getBusDetailById(this.id)
      this.record = res.data.data
    },
    // 处理支付
    async handleBuy () {
      const err = this.$refs.form.validate()
      if (err.length) return
      const payType = this.payType
      const type = this.isTour ? 1 : 2
      const typeId = this.record.id
      const data = { ...this.form, type, payType, typeId }
      const res = await createTourCarOrder(data)
      if (res.data.status === 200) {
        payType === 1 ? this.aliPay(res) : this.wexinPay(res)
      } else {
        this.$toast.fail({ message: res.data.msg })
      }
    },
    // 支付宝支付
    aliPay (res) {
      const form = res.data.data.data
      const div = document.createElement('div')
      div.innerHTML = form
      document.body.appendChild(div)
      document.forms[0].submit()
    },
    // 微信支付
    wexinPay (res) {
      this.$toast.loading({ message: '微信支付' })
      const url = res.data.data.data
      window.location.replace(url)
    }
  },
  created () {
    const { type, id } = this.$route.query
    this.mode = type
    this.id = id
    this.handleReq()
  },
  mounted () {
    // this.$dialog.alert({
    //   message: '支付宝支付：跳转购买成功页面，微信支付：跳转购买失败页面'
    // })
  }
}
</script>

<style lang="scss" scoped>
.header{
  margin: .22rem .15rem 0 .15rem;
  @include flex();

  &-info{
    margin-left: .11rem;
    height: .90rem;
    @include flex (space-between, flex-start, column);
  }
  &-title{
    @include font (.16rem, $main-text, bold);
  }
  &-detail{
    @include font (.12rem, $tip-text);
  }
}

.main-title{
  margin: .20rem .15rem .10rem .15rem;
  @include font (.18rem, $main-text, bold);
}

.radio-container{
  margin-bottom: .9rem;

  // 选项
  .radio-item{
    height: .60rem;
    margin: 0 .15rem;
    border-bottom: solid 1px $normal-text;
    @include flex (space-between, center);

    img{
      width: 0.22rem;
      height: 0.22rem;
      margin-right: .10rem;
    }

    &-label{
      flex: 1;
      @include font (.16rem, $main-text);
    }
  }
}

.total{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100000;
  background-color: #fff;
  padding: .10rem .11rem .20rem .15rem;
  box-sizing: border-box;
  // box-shadow: 0px -5px 10px 0px rgba(38, 38, 38, 0.06);
  transition: all 0.2s;
  @include flex (space-between, center);

  &-tip{
    @include font (.12rem, $tip-text);
  }
  &-price{
    @include font (.18rem, $sub-color);

    &::before{
      content: '￥';
      font-size: .12rem;
      margin-right: -2px;
    }
  }
  .pay-button{
    width: 1.18rem;
    height: .44rem;
    line-height: .44rem;
    text-align: center;
    border-radius: .22rem;
    background: linear-gradient(135deg, #FFCD00 0%, #FFAE20 100%);
    box-shadow: 0px 6px 10px -4px rgba(255, 174, 32, 0.5);
    @include font (.16rem, #fff);
  }
}

.toggle-detail-button{
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: .40rem;
  margin-left: .06rem;
  @include font (.12rem, $aid-green-color);
}

.detail{
  padding: 0 .15rem;
  padding-bottom: .74rem;

  &-title{
    margin-top: .20rem;
    margin-bottom: .10rem;
    @include font (.17rem, $main-text, bold);
  }

  &-item{
    margin-bottom: .20rem;
    @include flex (space-between, center);
    @include font (.16rem, $main-text);

    .label{
      color: $tip-text;
    }
  }
}
</style>
