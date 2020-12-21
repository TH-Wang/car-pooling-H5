<template>
  <div class="transparent-nav-page">
    <!-- 搜索框导航栏 -->
    <nav-bar-search :mode="navbarMode" button @click-search="handleClickSearch">
      <template #right>
        <span @click="$router.push('/common/city')">{{location}}</span>
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
import { queryPassengerOrders } from '@/api'
import { OrderFilter } from '@/components/Filter/index.js'
import NavBarSearch from '@/components/NavBarSearch'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import WorkOrder from '@/components/WorkOrder'
// import PendingOrder from '@/components/OrderItem/Pending'
// import DriverReserveButton from '@/components/DriverReserveButton'
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
    // 'pending-order': PendingOrder,
    // 'driver-reserve-button': DriverReserveButton,
    'cancel-reserve-layer': CancelReserveLayer
  },
  data: () => ({
    menuVisibleId: null,
    menu: [{ type: 'cancel', text: '取消预约' }],
    needQuick: true
  }),
  computed: {
    ...mapState(['position', 'search']),
    ...mapGetters(['location', 'identity']),
    // 搜索路线时传递的参数
    query () {
      // const identity = this.identity
      return {
        workType: 'pending',
        // 1车主发布，2乘客发布
        // orderType: identity === 0 ? 1 : 2,
        showAll: 0
      }
    }
  },
  methods: {
    // 自定义请求函数
    reqApi: queryPassengerOrders,
    getRequestDatas () {
      return { showAll: 0 }
    },
    // 请求快捷路线时，自动调用该函数，获取请求参数
    getRequestQuickDatas () {
      const addrName = this.position.county.name
      return { startPage: 1, pageSize: 10, addrName }
    },
    // 按起止地点找车
    handleSearchOrder () {
      const _this_ = this
      const { startAddr, endAddr } = this.search
      const query = {
        ..._this_.query,
        startAddr: startAddr.name,
        endAddr: endAddr.name
      }
      this.$router.push({ path: '/common/searchline/list', query })
    },
    // 进入详情页面
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    },
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
