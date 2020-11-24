<template>
  <div class="transparent-nav-page">
    <!-- 搜索框导航栏 -->
    <nav-bar-search :mode="navbarMode" button @click-search="handleClickSearch">
      <template #right>{{location}}</template>
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
      @retry="handleRetryQuick"
      @link-more="$router.push('/common/quick/list')"
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
    >
      <pending-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
        @click="handleLinkDetail"
      >
        <template #button>
          <mini-button
            color="green"
            :orderId="item.id"
            :menu="menu"
            :menuVisible="menuVisibleId === item.id"
            @click="handleLinkDetail"
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
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import { List, Icon } from 'vant'
import { isEmpty } from 'lodash'
import { OrderFilter } from '@/components/Filter/index.js'
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
    'order-filter': OrderFilter,
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
    menu: [{ type: 'cancel', text: '取消预约' }],
    needQuick: true
  }),
  computed: {
    ...mapState(['position', 'search']),
    ...mapGetters(['location'])
  },
  methods: {
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      // 地区id
      const county = isEmpty(this.position.county)
        ? this.position.city.code
        : this.position.county.code
      // 今天日期
      const today = moment().format('YYYY-MM-DD 00:00:00')
      return {
        county,
        startTime: today,
        orderType: 2, // 1-车主发布 2-乘客发布
        publishType: 1
      }
    },
    // 请求快捷路线时，自动调用该函数，获取请求参数
    getRequestQuickDatas () {
      return { startPage: 1, pageSize: 10 }
    },
    // 按起止地点找车
    handleSearchOrder () {
      const _this_ = this
      const { startAddr, endAddr } = this.search
      const query = {
        publishType: 1,
        // 1车主发布，2乘客发布
        orderType: _this_.identity === 0 ? 1 : 2,
        startAddr,
        endAddr
      }
      this.$router.push({ path: '/common/searchline/list', query })
    },
    // 进入详情页面
    handleLinkDetail (record) {
      this.$router.push({ name: 'OrderDetail', params: { record } })
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
