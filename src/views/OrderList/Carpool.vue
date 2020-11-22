<template>
  <div class="transparent-nav-page">
    <!-- 搜索框导航栏 -->
    <nav-bar-search :mode="navbarMode" button @click-search="handleClickSearch">
      <template #right>定位城市</template>
    </nav-bar-search>

    <!-- 背景 -->
    <div class="background"></div>

    <!-- 占位符 -->
    <div style="height: .12rem" />

    <!-- 搜索卡片 -->
    <search-card />

    <!-- 占位符 -->
    <div style="height: .1rem" />

    <!-- 快捷路线 -->
    <quick-line
      :dataSource="quickList"
      @retry="handleRetryQuick"
      @link-more="$router.push('/common/quick/list')"
    />

    <!-- 公告栏 -->
    <notice-bar @reserve="handleClickReserve" />

    <!-- 筛选菜单 -->
    <order-filter @change="handleFilterChange" />

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无订单，请点击重试" />
    </div>
    <!-- 拼单列表 -->
    <van-list
      v-else
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
        :record="item"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { List } from 'vant'
import { isEmpty } from 'lodash'
import { OrderFilter } from '@/components/Filter/index.js'
import NavBarSearch from '@/components/NavBarSearch'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import CarpoolOrder from '@/components/OrderItem/Carpool'
import MiniButton from '@/components/MiniButton'
import NoticeBar from '@/components/NoticeBar'
import NavbarMixin from '@/mixins/navbar-mixin'
import ListMixin from '@/mixins/list-mixin'

export default {
  // NavbarMixin 负责导航栏状态变化
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [NavbarMixin, ListMixin],
  components: {
    'van-list': List,
    'order-filter': OrderFilter,
    'notice-bar': NoticeBar,
    'nav-bar-search': NavBarSearch,
    'search-card': SearchCard,
    'quick-line': QuickLine,
    'carpool-order': CarpoolOrder,
    'mini-button': MiniButton
  },
  data: () => ({
    needQuick: true
  }),
  computed: {
    ...mapState(['position'])
  },
  methods: {
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      // 地区id
      const county = isEmpty(this.position.county)
        ? this.position.city.code
        : this.position.county.code
      return {
        county,
        orderType: 1, // 1-车主发布 2-乘客发布
        publishType: 1
      }
    },
    // 请求快捷路线时，自动调用该函数，获取请求参数
    getRequestQuickDatas () {
      return { startPage: 1, pageSize: 10 }
    },
    handleClickSearch () {
      console.log('click search')
    },
    handleClickReserve () {
      this.$router.push('/common/appoint')
    },
    // 点击订单
    handleLinkDetail (e) {
      this.$router.push({ path: '/common/order/detail', query: { id: e.id } })
    },
    // 点击订单按钮
    handleClickOrderButton (e) {
      console.log('[点击mini按钮]', e)
    }
  },
  created () {
    const type = this.$route.query.type
    switch (type) {
      case 'short': this.url = '/short'; return
      case 'cities': this.url = '/cities'; return
      case 'province': this.url = '/province'
    }
  },
  mounted () {
    // this.$dialog.confirm({
    //   title: '提示',
    //   message: '请确认 <b class="dialog-message-active">157 2020 0123</b>\n能联系到您',
    //   confirmButtonText: '确认在用',
    //   cancelButtonText: '修改手机号'
    // })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
</style>
