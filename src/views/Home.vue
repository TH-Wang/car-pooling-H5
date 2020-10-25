<template>
  <div class="container">

    <!-- 导航栏 -->
    <van-nav-bar
      title="拼车之家"
      fixed
      placeholder
      :border="false"
      @click-left="handleSelectCity"
    >
      <template #left>
        重庆 · 渝北区<van-icon name="arrow" color="#262626" size=".15px" />
      </template>
    </van-nav-bar>

    <!-- <van-pull-refresh v-model="refresh" @refresh="handleListRefresh"> -->

    <!-- banner -->
    <div class="banner"></div>

    <!-- 主要导航区 -->
    <div class="main-nav">
      <div
        class="main-nav-item"
        v-for="(item, index) in mainNavConfig"
        @click="$router.push(item.path)"
        :key="index">
        <img class="icon" :src="item.icon" alt="">
        <div class="title">{{item.title}}</div>
      </div>
    </div>

    <!-- 搜索卡片 -->
    <search-card />

    <!-- 快捷路线 -->
    <quick-line @link-more="$router.push('/common/quick/list')" />

    <!-- 筛选菜单 -->
    <van-dropdown-menu class="dropdown" active-color="#FFCD00">
      <van-dropdown-item v-model="areaValue" :options="areaOptions" />
      <van-dropdown-item v-model="timeValue" :options="timeOptions" />
      <van-dropdown-item v-model="priceValue" :options="priceOptions" />
      <van-dropdown-item v-model="seatValue" :options="seatOptions" />
    </van-dropdown-menu>

    <!-- 拼单列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="handleListLoad"
      class="list-container"
    >
      <carpool-order
        v-for="(item, index) in list"
        :key="index"
        @click="handleLinkDetail"
      >
        <template #button>
          <mini-button
            color="yellow"
            :orderId="item.id"
            @click="handleClickOrderButton"
          >立即预订</mini-button>
        </template>
      </carpool-order>
    </van-list>

    <!-- </van-pull-refresh> -->

  </div>
</template>

<script>
import { NavBar, Icon, DropdownMenu, DropdownItem, List, Toast } from 'vant'
import mainNavConfig from '@/configs/homeMainNav'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import CarpoolOrder from '@/components/OrderItem/Carpool'
import ListMixin from '@/mixins/list-mixin'
import MiniButton from '@/components/MiniButton'

export default {
  name: 'Home',
  mixins: [ListMixin],
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-list': List,
    // 'van-pull-refresh': PullRefresh,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'search-card': SearchCard,
    'quick-line': QuickLine,
    'carpool-order': CarpoolOrder,
    'mini-button': MiniButton
  },
  data: () => ({
    url: '/index',
    mainNavConfig
  }),
  methods: {
    // 点击选择城市
    handleSelectCity () {
      this.$router.push('/common/city')
    },
    // 列表刷新
    handleListRefresh () {
      setTimeout(() => {
        this.refresh = false
        Toast('刷新成功')
      }, 2000)
    },
    // 进入详情页面
    handleLinkDetail () {
      this.$router.push('/common/order/detail')
    },
    // 点击订单按钮
    handleClickOrderButton (e) {
      console.log('[点击mini按钮]', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';

.banner{
  width: 3.45rem;
  height: .88rem;
  margin: 0 auto;
  margin-top: .15rem;
  background-color: #f7f7f7;
  border-radius: .05rem;
}

.main-nav{
  padding: .12rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, 0.85rem);

  &-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon{
      width: .4rem;
      height: .4rem;
      margin-bottom: 5px;
    }

    .title{
      font-size: .12rem;
      color: $main-text;
    }
  }
}

.list{
  overflow: scroll
}

</style>
