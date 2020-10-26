<template>
  <div class="transparent-nav-page">
    <!-- 搜索框导航栏 -->
    <nav-bar-search :mode="navbarMode" button @click-search="handleClickSearch">
      <template #right>定位城市</template>
    </nav-bar-search>

    <!-- 背景 -->
    <div class="background">
    </div>

    <!-- 占位符 -->
    <div style="height: .12rem" />

    <!-- 搜索卡片 -->
    <search-card button-text="寻找乘客" button-color="green" />

    <!-- 占位符 -->
    <div style="height: .1rem" />

    <!-- 快捷路线 -->
    <quick-line tagColor="green" />

    <!-- 公告栏 -->
    <!-- <notice-bar @reserve="handleClickReserve" /> -->

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
      <pending-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
      >
        <template #button>
          <mini-button
            color="green"
            :orderId="item.id"
            :menu="menu"
            :menuVisible="menuVisibleId === item.id"
            @click="handleClickOrderButton"
            @cancel="handleOrderCancel"
          >
            <van-icon style="margin-right: .05rem" size=".18rem" name="phone" />预约
          </mini-button>
        </template>
      </pending-order>
    </van-list>

    <!-- 取消预约弹出层 -->
    <cancel-reserve-layer ref="cancelLayer" @submit="handleCancelSubmit" />
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List, Icon } from 'vant'
import NavBarSearch from '@/components/NavBarSearch'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import PendingOrder from '@/components/OrderItem/Pending'
import MiniButton from '@/components/MiniButton'
// import NoticeBar from '@/components/NoticeBar'
import CancelReserveLayer from '@/components/Layer/CancelReserve'
import NavbarMixin from '@/mixins/navbar-mixin'
import ListMixin from '@/mixins/list-mixin'

export default {
  // NavbarMixin 负责导航栏状态变化
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [NavbarMixin, ListMixin],
  components: {
    'van-list': List,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'van-icon': Icon,
    // 'notice-bar': NoticeBar,
    'nav-bar-search': NavBarSearch,
    'search-card': SearchCard,
    'quick-line': QuickLine,
    'pending-order': PendingOrder,
    'mini-button': MiniButton,
    'cancel-reserve-layer': CancelReserveLayer
  },
  data: () => ({
    url: '',
    menuVisibleId: null,
    menu: [{ type: 'cancel', text: '取消预约' }]
  }),
  methods: {
    handleClickSearch () {
      console.log('click search')
    },
    handleClickReserve () {
      console.log('[点击预约]')
    },
    // 点击订单按钮
    handleClickOrderButton (e) {
      console.log('[点击mini按钮]', e)
      this.menuVisibleId = this.menuVisibleId === e.id ? null : e.id
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
@import '@/assets/scss/common.scss'
</style>
