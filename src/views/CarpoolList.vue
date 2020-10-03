<template>
  <div>
    <!-- 搜索框导航栏 -->
    <nav-bar-search :mode="navbarMode" button @click-search="handleClickSearch">
      <template #right>定位城市</template>
    </nav-bar-search>

    <!-- 背景 -->
    <div class="background">
      <!-- 搜索卡片 -->
      <search-card />
    </div>

    <!-- 占位符 -->
    <div style="height: 66px" />

    <!-- 快捷路线 -->
    <quick-line />

    <!-- 公告栏 -->
    <notice-bar @reserve="handleClickReserve" />

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
      <carpool-order v-for="(item, index) in list" :key="index" />
    </van-list>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List } from 'vant'
import NavBarSearch from '@/components/NavBarSearch'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import CarpoolOrder from '@/components/CarpoolOrder'
import NoticeBar from '@/components/NoticeBar'
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
    'notice-bar': NoticeBar,
    'nav-bar-search': NavBarSearch,
    'search-card': SearchCard,
    'quick-line': QuickLine,
    'carpool-order': CarpoolOrder
  },
  data: () => ({
    url: ''
  }),
  methods: {
    handleClickSearch () {
      console.log('click search')
    },
    handleClickReserve () {
      console.log('[点击预约]')
    }
  },
  created () {
    const type = this.$route.query.type
    switch (type) {
      case 'short': this.url = '/short'; return
      case 'cities': this.url = '/cities'; return
      case 'province': this.url = '/province'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss'
</style>
