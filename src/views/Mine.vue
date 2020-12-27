<template>
  <!-- 如果未登录 -->
  <div v-if="!user.token">
    <van-nav-bar title="个人中心" />
    <!-- 未登录则显示登录按钮 -->
    <van-empty
      :image="require('@/assets/images/empty-login.png')"
      description="登录后即可查看您的预约和行程等信息">
      <div
        class="login-button"
        @click="$router.push('/common/login')">登录/注册</div>
    </van-empty>
  </div>
  <!-- 登录后展示内容 -->
  <div v-else class="page-container">
    <!-- 顶部 -->
    <div class="header" @click="$router.push('/common/setting')">
      <div class="header-info">
        <!-- 头像 -->
        <van-image :src="user.info.headimg" width="40px" height="40px" fit="cover" round/>
        <div class="header-info-detail">
          <!-- 用户名 -->
          <div class="header-info-phone">{{user.info.username}}</div>
          <div class="header-info-text">
            我的信用分
            <span style="margin-right: 5px">{{account.info.faithfulValue}}</span>
            <van-icon
              class="question"
              name="question-o"
              @click.stop="$router.push('/common/description?type=credit')"
            />
          </div>
        </div>
      </div>
      <!-- 身份认证标签 -->
      <div class="header-tag">
        <div v-if="getConfirm('idnumstatus')" class="header-tag-item-green">身份证认证</div>
        <div v-else class="header-tag-item-gray">未身份认证</div>
        <div v-if="getConfirm('car')" class="header-tag-item-blue">车主认证</div>
        <div v-if="getConfirm('group')" class="header-tag-item-yellow">群主认证</div>
        <div v-if="getConfirm('etc')" class="header-tag-item-red">站长认证</div>
        <div v-if="getConfirm('viceAdministrator')" class="header-tag-item-red">副站长认证</div>
      </div>
      <!-- 右上角按钮 -->
      <div class="header-icon">
        <img
          v-for="(item, index) in headerIcons"
          :key="index"
          :src="require(`@/assets/icons/navbar/${item.icon}.png`)"
          alt=""
          @click.stop="$router.push(item.path)"
        >
      </div>
    </div>

    <!-- 钱包卡片 -->
    <overage-card
      title="钱包余额（元）"
      :number="account.info.totalPrice"
      :hasButton="account.info.totalPrice < 0"
      @click="$router.push('/common/my/wallet')"
      @click-button="handlePay"
    />

    <!-- 我的预约 -->
    <div class="reserve">
      <span class="title">我的预约</span>
      <span class="tip">请在十分钟内确认</span>
      <span class="link" @click="$router.push('/common/my/appoint')">查看更多</span>
    </div>

    <!-- 预约为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty :description="identity === 0 ? '暂无预约，点击刷新' : '暂无乘客预约，点击刷新'" />
    </div>
    <!-- 预约订单轮播 -->
    <van-swipe indicator-color="#FFCD00" @change="handleSwipeChange">
      <!-- 每一项 -->
      <van-swipe-item
        v-for="(item, index) in list"
        :key="index"
      ><pending-order
          :record="item"
          type="driver"
          :color="buttonColor"
        ><template #button>
          <confirm-button
            :color="buttonColor"
            :status="item.status"
            :identity="identity === 0 ? 'customer' : 'driver'"
            @confirm="handleOrderConfirm($event, item.orderId)"
            @cancel="handleOrderCancel($event, item.orderId)"
            @report="handleOrderReport($event, item.orderId)"
          /></template>
        </pending-order>
      </van-swipe-item>
      <!-- 指示器 -->
      <template #indicator>
        <div class="custom-indicator">
          <div
            v-for="(item, index) in list"
            :key="index"
            :class="swipeCurrent===index?'custom-indicator-item-active':'custom-indicator-item'"
          />
        </div>
      </template>
    </van-swipe>

    <!-- 占位符 -->
    <div style="height:.10rem;background-color:#FAFAFA"></div>

    <!-- 菜单列表 -->
    <div class="menu">
      <div
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        v-show="item.show"
        @click="handleLink(item.path)"
      >
        <img :src="item.icon" alt="">
        <span>{{item.title}}</span>
        <van-icon name="arrow" color="#E8E8E8" size=".12rem"/>
      </div>
    </div>

    <!-- 固定按钮 -->
    <affix
      icon="master"
      content="申请站长"
      @click="$router.push('/common/settle/site/tips')"
    />

    <!-- 退订弹窗 -->
    <refund-order-layer v-model="showRefund" @submit="handleRefund" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
// import store from '@/store'
import { Image, Swipe, SwipeItem } from 'vant'
import { isEmpty } from 'lodash'
import {
  selectAccountInfo,
  getOrdering,
  confirmOrder,
  driverOrder
} from '@/api'
import OverageCard from '@/components/OverageCard'
import PendingOrder from '@/components/OrderItem/Pending'
import ConfirmButton from '@/components/ConfirmButton'
// import MiniButton from '@/components/MiniButton'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'
import Affix from '@/components/Affix'
import RefundOrderLayer from '@/components/Layer/RefundOrder'

export default {
  name: 'Mine',
  mixins: [ButtonMenuMixin],
  components: {
    'van-image': Image,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'overage-card': OverageCard,
    'pending-order': PendingOrder,
    'confirm-button': ConfirmButton,
    // 'mini-button': MiniButton,
    affix: Affix,
    'refund-order-layer': RefundOrderLayer
  },
  data: () => ({
    headerIcons: [
      { icon: 'upload', path: '/common/my/share' },
      { icon: 'setting', path: '/common/setting' },
      { icon: 'service', path: '' }
    ],
    list: [],
    swipeCurrent: 0,
    menuList: {
      trip: {
        icon: require('@/assets/icons/mine/travel.png'),
        path: '/common/my/trip',
        title: '我的行程',
        show: true
      },
      order: {
        icon: require('@/assets/icons/mine/order.png'),
        path: '/common/my/order',
        title: '我的订单',
        show: true
      },
      group: {
        icon: require('@/assets/icons/mine/group.png'),
        path: '/common/group/master',
        title: '我是群主',
        show: false
      },
      etc: {
        icon: require('@/assets/icons/mine/master.png'),
        path: '/common/site/master',
        title: '我是站长',
        show: false
      },
      viceAdministrator: {
        icon: require('@/assets/icons/mine/master.png'),
        path: '/common/site/submaster',
        title: '我是副站长',
        show: false
      }
    },
    // 需要退订的订单id
    cancelOrderId: null,
    showRefund: false
  }),
  computed: {
    ...mapState(['user', 'account']),
    ...mapGetters(['identity']),
    buttonColor () {
      return this.identity === 0 ? 'yellow' : 'green'
    }
  },
  methods: {
    // 请求我的预约
    async reqList () {
      if (this.identity === 0) {
        // 我是乘客，查询我的预约订单
        const res = await getOrdering({
          startPage: 1,
          pageSize: 5
        })
        if (res.data.status !== 200) return
        this.list = res.data.data.list.map(item => {
          item.seatNum = item.orderNum
          return item
        })
      } else {
        // 我是司机，查询乘客预约我的订单
        const res = await driverOrder({
          startPage: 1,
          pageSize: 5
        })
        if (res.data.status !== 200) return
        this.list = res.data.data.list.map(item => {
          item.startTime = item.passengerStartTime
          item.seatNum = item.orderNum
          return item
        })
        this.reqAccount()
      }
    },
    // 刷新预约订单信息
    async handleRetry () {
      this.$toast.loading({
        message: '加载中...',
        duration: 10000
      })
      await this.reqList()
      this.$toast.clear()
    },
    // 请求账户信息
    async reqAccount () {
      // 如果已请求到账户信息，则不再进行多余的请求
      if (!isEmpty(this.account.info)) return
      const res = await selectAccountInfo()
      this.$store.commit('setAccountInfo', res.data.data)
      this.$store.commit('setUserInfo', res.data.data)

      // 身份判断
      // const { group, etc, viceAdministrator } = res.data.data
      // this.menuList.group.show = group === 'YES'
      // this.menuList.etc.show = etc === 'YES'
      // this.menuList.viceAdministrator.show = viceAdministrator === 'YES'
    },
    // 身份判断
    getConfirm (type) {
      // 验证车主认证
      if (type === 'car') {
        const { driverlicensestatus, carstatus } = this.user.info
        return driverlicensestatus === 'YES' && carstatus === 'YES'
      } else {
        // 其他认证
        return this.user.info[type] === 'YES'
      }
    },
    handlePay () {
      console.log('[支付欠费]')
    },
    handleClickReserve (e) {
      console.log('[点击预约]')
      this.menuVisibleId = this.menuVisibleId === e.id ? null : e.id
    },
    // 跳转列表详情页
    handleLink (path) {
      if (!this.user.token) {
        this.$router.push('/common/login')
      } else this.$router.push(path)
    },
    // 确认订单
    async handleOrderConfirm (status, orderId) {
      // const userId = this.user.info.id
      const res = await confirmOrder({ orderId, status })
      if (res.data.msg === '成功') {
        this.$toast.success('已确认')
      } else {
        this.$toast.fail('确认失败，请稍后再试')
      }
      this.reqList()
    },
    // 司机取消预约
    async handleOrderCancel (status, orderId) {
      if (this.identity === 0) {
        this.cancelOrderId = orderId
        this.showRefund = true
        return
      }
      // 发送请求
      this.handleReqCancel({ orderId, status })
    },
    // 乘客退订
    async handleRefund (reason) {
      // 判断是乘客取消还是司机取消
      const status = this.identity === 0 ? 4 : 3
      const orderId = this.cancelOrderId
      const data = { status, orderId, ...reason }
      this.handleReqCancel(data)
    },
    // 发送退订或预约的请求
    async handleReqCancel (data) {
      this.$toast.loading({ message: '请求中', duration: 10000 })
      const res = await confirmOrder(data)
      this.$toast.clear()
      if (res.data.msg === '成功') {
        this.$toast.success('取消成功')
      } else {
        this.$toast.fail('取消失败\n请稍后重试')
      }
      this.showRefund = false
      this.reqList()
    },
    // 举报订单
    handleOrderReport () {
      console.log('举报订单')
    },
    // swipe切换
    handleSwipeChange (index) {
      this.swipeCurrent = index
    }
  },
  mounted: async function () {
    if (!this.user.token) return
    console.log('已登录')
    setTimeout(async () => {
      await this.reqList()
    }, 200)
    // await this.reqAccount()
  }
  // beforeRouteEnter (to, from, next) {
  //   if (from.path === '/common/login' && store.state.user.token) {
  //     window.location.reload()
  //   }
  //   next()
  // }
}
</script>

<style lang="scss" scoped>
.page-container{
  overflow-x: hidden;
}

// 登录按钮
.login-guide{
  padding: .2rem .15rem;
}
.login-button{
  width: 1.2rem;
  height: .4rem;
  line-height: .4rem;
  border-radius: .4rem;
  margin: 0 auto;
  @include font(.16rem, #FFFFFF);
  text-align: center;
  background: linear-gradient(135deg, #FFCD00 0%, #FFAE20 100%);
  box-shadow: 0px 6px 10px -4px rgba(255, 174, 32, 0.5);
}

// 顶部信息
.header{
  padding: 15px;
  padding-top: 20px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px 0px rgba(38, 38, 38, 0.06);

  &-info{
    height: 40px;
    @include flex ($align: center);
    position: relative;

    &-avatar{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: $normal-text;
    }

    &-detail{
      height: 100%;
      margin-left: 10px;
      @include flex (space-between, flex-start, column);
    }

    &-phone{
      @include font (17px, #000000, bold);
    }
    &-text{
      @include font (12px, $tip-text);

      span{
        color: $main-color;
        margin-right: 5px;
      }

      .question{ color: $main-text; transform: translateY(2px); }
    }
  }

  &-tag{
    margin: 8px 0 0 52px;

    &-item{
      display: inline-block;
      padding: 0 4px;
      color: #fff;
      font-size: 11px;
      margin-right: 10px;
      border-radius: 2px;

      &-gray{
        @extend .header-tag-item;
        background-color: $tip-text;
      }

      &-green{
        @extend .header-tag-item;
        background-color: $aid-green-color;
      }

      &-blue{
        @extend .header-tag-item;
        background-color: $aid-blue-color;
      }

      &-red{
        @extend .header-tag-item;
        background-color: #FF6A20;
      }

      &-yellow{
        @extend .header-tag-item;
        background-color: $sub-color;
      }
    }
  }

  &-icon{
    position: absolute;
    top: 15px;
    right: 15px;

    img{
      width: 24px;
      height: 24px;
    }

    img + img {
      margin-left: 9px;
    }
  }
}

// 我的预约
.reserve{
  padding: 0 .15rem;
  box-sizing: border-box;
  @include flex (space-between, baseline);

  .title{
    flex-shrink: 0;
    @include font (.18rem, $main-text, bold);
  }
  .tip{
    flex: 1;
    margin: 0 .05rem;
    @include font (.12rem, $tip-text);
  }
  .link{
    flex-shrink: 0;
    @include font (.14rem, $main-color);
  }
}

// 自定义指示器
.custom-indicator{
  @include flex (center, center);
  padding-bottom: .14rem;

  &-item{
    width: .04rem;
    height: .03rem;
    border-radius: .01rem;
    background-color: $normal-text;
    transition: all 0.2s;

    & + &{
      margin-left: .04rem;
    }

    &-active{
      @extend .custom-indicator-item;
      width: .11rem;
      background-color: $main-color;
    }
  }
}

// 菜单列表
.menu{
  margin-bottom: 1rem;
  padding: 0 .15rem;
  box-sizing: border-box;

  &-item{
    height: .60rem;
    border-bottom: solid 1px $light-color;
    @include flex (space-between, center);

    img{
      flex-shrink: 0;
      width: .20rem;
      height: .20rem;
    }

    span{
      flex: 1;
      margin: 0 .06rem;
      @include font (.14rem, $main-text);
    }
  }
}
</style>
