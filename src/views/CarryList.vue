<template>
  <div class="transparent-nav-page">
    <!-- 搜索框导航栏 -->
    <nav-bar-search :mode="navbarMode" button @click-search="handleClickSearch">
      <template #right>定位城市</template>
    </nav-bar-search>

    <!-- 背景 -->
    <div class="background"></div>

    <van-tabs
      v-model="tabId"
      color="#fff"
      title-inactive-color="#fafafa"
      title-active-color="#fff"
      background="transparent"
      line-width="52px"
      line-height="2px"
      animated
    >
      <van-tab title="车主信息">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card />
        </div>

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
          <!-- 订单 -->
          <carry-order
            v-for="(item, index) in list"
            :key="index"
            :record="item"
            type="customer"
            @click="handleLinkDetail"
          >
            <!-- 预约按钮 -->
            <template #button>
              <mini-button
                color="yellow"
                :orderId="item.id"
                @click="handleClickOrderButton"
              >立即预订</mini-button>
            </template>
          </carry-order>
        </van-list>

      </van-tab>
      <van-tab title="乘客信息">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card />
        </div>

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
          <!-- 订单 -->
          <carry-order
            v-for="(item, index) in list"
            :key="index"
            :record="item"
            type="driver"
          >
            <!-- 预约按钮 -->
            <template #button>
              <mini-button
                color="green"
                :orderId="item.id"
                :menu="menu"
                :menuVisible="menuVisibleId === item.id"
                @click="handleClickReserve"
                @cancel="handleOrderCancel"
              >
                <van-icon style="margin-right: .05rem" size=".18rem" name="phone" />预约
              </mini-button>
            </template>
          </carry-order>
        </van-list>
      </van-tab>
    </van-tabs>

    <!-- 取消预约弹出层 -->
    <cancel-reserve-layer ref="cancelLayer" @submit="handleCancelSubmit" />
  </div>
</template>

<script>
import { Tabs, Tab, DropdownMenu, DropdownItem, List, Icon } from 'vant'
import NavBarSearch from '@/components/NavBarSearch'
import SearchCard from '@/components/SearchCard'
import CarryOrder from '@/components/Order/Carry'
import MiniButton from '@/components/MiniButton'
import CancelReserveLayer from '@/components/Layer/CancelReserve'
import NavbarMixin from '@/mixins/navbar-mixin'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'
import ListMixin from '@/mixins/list-mixin'

export default {
  // NavbarMixin 负责导航栏状态变化
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [NavbarMixin, ButtonMenuMixin, ListMixin],
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'van-icon': Icon,
    'van-list': List,
    'nav-bar-search': NavBarSearch,
    'search-card': SearchCard,
    'carry-order': CarryOrder,
    'mini-button': MiniButton,
    'cancel-reserve-layer': CancelReserveLayer
  },
  data: () => ({
    url: '',
    tabId: 0,
    menuVisibleId: null,
    menu: [{ type: 'cancel', text: '取消预约' }]
  }),
  methods: {
    handleClickSearch () {
      console.log('click search')
    },
    handleClickReserve (e) {
      console.log('[点击预约]')
      this.menuVisibleId = this.menuVisibleId === e.id ? null : e.id
    },
    // 点击订单
    handleLinkDetail (e) {
      this.$router.push({ path: '/common/order/detail', query: { id: e.id } })
    },
    // 点击订单按钮
    handleClickOrderButton (e) {
      console.log('[点击mini按钮]', e)
    },
    // 取消预约
    handleOrderCancel (e) {
      console.log('[弹出取消菜单]', e)
      this.$refs.cancelLayer.show()
    },
    // 提交取消预约事件
    handleCancelSubmit (e) {
      console.log('[取消预约]', e)
      const _this_ = this
      // 隐藏选项菜单
      this.$refs.cancelLayer.hidden()
      setTimeout(() => {
        _this_.$toast.success('取消成功')
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';

.search-card-wrap{
  margin: .10rem 0;
}
</style>
