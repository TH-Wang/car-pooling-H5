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
    <div class="background"></div>

    <!-- 占位符 -->
    <div style="height: .12rem" />

    <!-- 搜索卡片 -->
    <search-card useStore @search="handleSearchOrder" />

    <!-- 占位符 -->
    <div style="height: .1rem" />

    <!-- 快捷路线 -->
    <quick-line
      :dataSource="quickList"
      :query="query"
      @retry="handleRetryQuick"
    />

    <!-- 公告栏 -->
    <notice-bar v-model="showNotice" />

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
    >
      <work-order :list="list" type="carpool" />
      <!-- <carpool-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
        @click="handleLinkDetail($event, item.pprId)"
      >
        <template #button>
          <mini-button
            color="yellow"
            :orderId="item.id"
            @click="handleLinkDetail($event, item.pprId)"
          >立即预订</mini-button>
        </template>
      </carpool-order> -->
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { List } from 'vant'
import { cloneDeep } from 'lodash'
import { OrderFilter } from '@/components/Filter/index.js'
import NavBarSearch from '@/components/NavBarSearch'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import WorkOrder from '@/components/WorkOrder'
// import CarpoolOrder from '@/components/OrderItem/Carpool'
// import MiniButton from '@/components/MiniButton'
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
    'work-order': WorkOrder
    // 'carpool-order': CarpoolOrder,
    // 'mini-button': MiniButton
  },
  data: () => ({
    needQuick: true,
    publishType: 1,
    showNotice: true
  }),
  computed: {
    ...mapState(['position', 'search']),
    ...mapGetters(['location', 'countyName', 'identity']),
    // 搜索路线时传递的参数
    query () {
      const publishType = this.publishType
      return { workType: 'carpool', publishType, orderType: 1 }
    }
  },
  methods: {
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      // 车单类型
      const publishType = this.publishType
      // 当前地区
      const cityname = this.countyName
      return {
        cityname,
        orderType: 1, // 1-车主发布 2-乘客发布
        publishType
      }
    },
    // 请求快捷路线时，自动调用该函数，获取请求参数
    getRequestQuickDatas () {
      const publishType = this.publishType
      // const { city, county } = this.position
      // const addrName = publishType === 3 ? city.name : county.name
      const addrName = this.countyName
      return { startPage: 1, orderType: 1, pageSize: 10, publishType, addrName }
    },
    // 按起止地点找车
    handleSearchOrder ({ startAddrAll, endAddrAll }) {
      const params = cloneDeep(this.query)
      const query = {
        ...params,
        publishType: '1,2,3',
        startAddrAll,
        endAddrAll
      }
      this.$router.push({ path: '/common/searchline/list', query })
    },
    handleClickSearch () {
      this.$router.push('/common/city?guide=search')
    },
    // 进入详情页面
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    }
  },
  created () {
    this.publishType = parseInt(this.$route.query.type)
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
