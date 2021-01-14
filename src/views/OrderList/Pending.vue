<template>
  <div class="transparent-nav-page">
    <!-- 搜索框导航栏 -->
    <nav-bar-search :mode="navbarMode" button @click-search="handleClickSearch">
      <template #right>
        <span class="nav-position-text"
          @click="$router.push('/common/city')"
        >{{location}}</span>
      </template>
    </nav-bar-search>

    <!-- 背景 -->
    <div class="background">
    </div>

    <!-- 占位符 -->
    <div style="height: .12rem" />

    <!-- 搜索卡片 -->
    <search-card
      useStore
      button-text="寻找乘客"
      button-color="green"
      @search="handleSearchOrder"
    />

    <!-- 占位符 -->
    <div style="height: .1rem" />

    <!-- 快捷路线 -->
    <quick-line
      :dataSource="quickList"
      tagColor="green"
      :query="query"
      @retry="handleRetryQuick"
    />

    <!-- 公告栏 -->
    <!-- <notice-bar @reserve="handleClickReserve" /> -->

    <!-- 筛选菜单 -->
    <order-filter @change="handleFilterChange" />

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无推荐，请点击重试" />
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
    ><work-order :list="list" type="pending" />
      <!-- <pending-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
        @click="handleLinkDetail($event, item.pprId)"
      >
        <template #button>
          <driver-reserve-button :record="item" />
        </template>
      </pending-order> -->
    </van-list>

    <!-- 取消预约弹出层 -->
    <cancel-reserve-layer ref="cancelLayer" @submit="handleCancelSubmit" />
  </div>
</template>

<script>
// import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import { List } from 'vant'
import { cloneDeep } from 'lodash'
import { queryPassengerOrders, getNewPassengerCommonRoute } from '@/api'
import { OrderFilter } from '@/components/Filter/index.js'
import NavBarSearch from '@/components/NavBarSearch'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import WorkOrder from '@/components/WorkOrder'
import CancelReserveLayer from '@/components/Layer/CancelReserve'
import NavbarMixin from '@/mixins/navbar-mixin'
import ListMixin from '@/mixins/list-mixin'

export default {
  // NavbarMixin 负责导航栏状态变化
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [NavbarMixin, ListMixin],
  components: {
    'van-list': List,
    'order-filter': OrderFilter,
    'nav-bar-search': NavBarSearch,
    'search-card': SearchCard,
    'quick-line': QuickLine,
    'work-order': WorkOrder,
    'cancel-reserve-layer': CancelReserveLayer
  },
  data: () => ({
    menuVisibleId: null,
    menu: [{ type: 'cancel', text: '取消预约' }],
    needQuick: true
  }),
  computed: {
    ...mapState(['position', 'search']),
    ...mapGetters(['location', 'countyName', 'identity']),
    // 搜索路线时传递的参数
    query () {
      return {
        workType: 'pending',
        showAll: 0
      }
    }
  },
  methods: {
    // 自定义请求函数
    reqApi: queryPassengerOrders,
    getRequestDatas () {
      const cityname = this.countyName
      return { publishType: '1,2,3', cityname }
    },
    // 自定义快捷路线请求函数
    reqQuickApi: getNewPassengerCommonRoute,
    // 请求快捷路线时，自动调用该函数，获取请求参数
    getRequestQuickDatas () {
      const addrName = this.countyName
      return { startPage: 1, orderType: 2, publishType: '1,2,3', pageSize: 10, addrName }
    },
    // 按起止地点找车
    handleSearchOrder ({ startAddrAll, endAddrAll }) {
      const params = cloneDeep(this.query)
      const query = {
        ...params,
        startAddrAll,
        endAddrAll
      }
      this.$router.push({ path: '/common/searchline/list', query })
    },
    // 进入详情页面
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    },
    handleClickSearch () {
      this.$router.push('/common/city?guide=search')
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
