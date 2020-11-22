<template>
  <div class="page-container">
    <!-- 顶部 -->
    <div class="header">
      <div class="header-info">
        <!-- 头像 -->
        <van-image :src="user.info.headimg" width="40px" height="40px" fit="cover" round/>
        <div class="header-info-detail">
          <!-- 用户名 -->
          <div class="header-info-phone">{{user.info.username}}</div>
          <div class="header-info-text">
            我的信用分
            <span style="margin-right: 5px">{{account.info.credit}}</span>
            <van-icon class="question" name="question-o" />
          </div>
        </div>
      </div>
      <!-- 身份认证标签 -->
      <div class="header-tag">
        <div v-if="getConfirm('idnumstatus')" class="header-tag-item-green">身份证认证</div>
        <div v-else class="header-tag-item-gray">未身份认证</div>
        <div v-if="getConfirm('carstatus')" class="header-tag-item-blue">车主认证</div>
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
          @click="$router.push(item.path)"
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

    <!-- 预约订单轮播 -->
    <van-swipe indicator-color="#FFCD00" @change="handleSwipeChange">
      <!-- 每一项 -->
      <van-swipe-item
        v-for="(item, index) in list"
        :key="index"
      >
        <!-- 预约订单 -->
        <hitchhike-order
          :record="item"
          type="driver"
        >
          <!-- 预约按钮 -->
          <template #button>
            <mini-button
              color="yellow"
              :orderId="item.id"
              :menu="orderMenu"
              :menuVisible="menuVisibleId === item.id"
              @click="handleClickReserve"
              @cancel="handleOrderCancel"
            >确认预约</mini-button>
          </template>
        </hitchhike-order>
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
        @click="$router.push(item.path)"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Image, Swipe, SwipeItem } from 'vant'
import { isEmpty } from 'lodash'
import { selectAccountInfo } from '@/api'
import OverageCard from '@/components/OverageCard'
import HitchhikeOrder from '@/components/OrderItem/Hitchhike'
import MiniButton from '@/components/MiniButton'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'
import Affix from '@/components/Affix'

export default {
  mixins: [ButtonMenuMixin],
  components: {
    'van-image': Image,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'overage-card': OverageCard,
    'hitchhike-order': HitchhikeOrder,
    'mini-button': MiniButton,
    affix: Affix
  },
  data: () => ({
    headerIcons: [
      { icon: 'upload', path: '/common/my/share' },
      { icon: 'setting', path: '/common/setting' },
      { icon: 'service', path: '' }
    ],
    list: [],
    menuVisibleId: null,
    orderMenu: [
      { type: 'cancel', text: '取消预约' },
      { type: 'report', text: '举报' }
    ],
    swipeCurrent: 0,
    menuList: [
      {
        icon: require('@/assets/icons/mine/travel.png'),
        path: '/common/my/trip',
        title: '我的行程'
      },
      {
        icon: require('@/assets/icons/mine/order.png'),
        path: '/common/my/order',
        title: '我的订单'
      },
      {
        icon: require('@/assets/icons/mine/group.png'),
        path: '/common/group/master',
        title: '我是群主'
      },
      {
        icon: require('@/assets/icons/mine/master.png'),
        path: '/common/site/master',
        title: '我是站长'
      },
      {
        icon: require('@/assets/icons/mine/master.png'),
        path: '/common/site/submaster',
        title: '我是副站长'
      }
    ]
  }),
  computed: {
    ...mapState(['user', 'account'])
  },
  methods: {
    // 请求我的预约（前三个）
    reqList () {
      const data = new Array(3).fill({}).map((e, idx) => ({ id: `${Date.now()}-${idx}` }))
      this.list.push(...data)
      // console.log(this.list)
    },
    async reqAccount () {
      // 如果已请求到账户信息，则不再进行多余的请求
      if (!isEmpty(this.account.info)) return
      const res = await selectAccountInfo()
      this.$store.commit('setAccountInfo', res.data.data)
    },
    // 身份判断
    getConfirm (type) {
      return this.account.info[type] === 'YES'
    },
    handlePay () {
      console.log('[支付欠费]')
    },
    handleClickReserve (e) {
      console.log('[点击预约]')
      this.menuVisibleId = this.menuVisibleId === e.id ? null : e.id
    },
    // 取消预约
    handleOrderCancel (e) {
      console.log('[弹出取消菜单]', e)
      // this.$refs.cancelLayer.show()
    },
    // swipe切换
    handleSwipeChange (index) {
      this.swipeCurrent = index
    }
  },
  mounted () {
    this.reqList()
    this.reqAccount()
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  overflow-x: hidden;
}

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
