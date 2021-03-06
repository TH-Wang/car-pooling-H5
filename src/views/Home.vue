<template>
  <div class="container">

    <!-- 导航栏 -->
    <van-nav-bar
      title="拼车之家"
      fixed
      placeholder
      :border="false"
      @click-left="handleSelectCity"
      @click-right="$router.push('/common/service')"
    >
      <template #left>
        <span class="nav-position-text">{{location}}</span>
        <van-icon name="arrow" color="#262626" size=".15px" />
      </template>
      <template #right>
        <van-icon name="service" />
      </template>
    </van-nav-bar>

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
    <search-card
      buttonColor="yellow"
      buttonText="寻找车主"
      useStore
      @search="handleSearchOrder"
    />

    <!-- 快捷路线 -->
    <quick-line
      :dataSource="quickList"
      :query="query"
      @retry="handleRetryQuick"
      @link-more="$router.push('/common/quick/list')"
    />

    <!-- 筛选菜单 -->
    <order-filter v-model="filters" @change="handleFilterChange" />

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
      <!-- <home-order :list="list" @link="handleLinkDetail" @reserve="handleLinkReserve" /> -->
      <work-order :list="list" type="carpool"  />
    </van-list>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { NavBar, Icon, List } from 'vant'
import { cloneDeep } from 'lodash'
// import { getCar, getLatestSearch } from '@/api'
import { getLatestSearch } from '@/api'
import EventBus from '@/utils/eventBus'
import { OrderFilter } from '@/components/Filter/index.js'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import WorkOrder from '@/components/WorkOrder'
import ListMixin from '@/mixins/list-mixin'
import mainNavConfig from '@/configs/homeMainNav'

export default {
  name: 'Home',
  mixins: [ListMixin],
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-list': List,
    'order-filter': OrderFilter,
    'search-card': SearchCard,
    'quick-line': QuickLine,
    'work-order': WorkOrder
  },
  data: () => ({
    mainNavConfig,
    // 存储起止点信息
    addr: {
      start: '',
      end: ''
    },
    needQuick: true,
    notReqOnMounted: true
  }),
  computed: {
    // 全局存储城市区县数据
    ...mapState(['user', 'position', 'search', 'station']),
    ...mapGetters(['identity', 'location', 'unGeoLocation']),
    buttonColor () {
      return this.identity === 0 ? 'yellow' : 'green'
    },
    buttonText () {
      return this.identity === 0 ? '寻找车主' : '寻找乘客'
    },
    // 搜索路线时传递的参数
    query () {
      return { workType: 'carpool', orderType: 1, publishType: '1,2,3' }
    }
  },
  methods: {
    // reqApi (data) {
    //   return this.identity === 0 ? getCar(data) : queryPassengerOrders(data)
    // },
    // reqApi: getCar,
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      // if (this.identity === 1) return { showAll: 0 }
      // // 通过身份判断发布类型，1-车主发布 2-乘客发布
      // const orderType = this.identity === 0 ? 1 : 2
      // 获取当前区域code
      // const { code } = this.position.county
      const { lon, lat } = this.position.selected.county
      const data = {
        orderType: 1,
        publishType: '1,2,3',
        startAddrLon: lon,
        startAddrLat: lat
      }
      if (this.station.name) data.cityname = this.station.name
      return data
    },
    // 请求快捷路线时，自动调用该函数，获取请求参数
    getRequestQuickDatas () {
      const addrName = this.position.selected.county.name
      return { startPage: 1, orderType: 1, pageSize: 10, publishType: '1,2,3', addrName }
    },
    // 请求用户上次搜索起止点
    async reqLatestSearch () {
      if (this.user.token) {
        const res = await getLatestSearch()
        const info = res.data.data
        if (!info) return
        // 设置起点
        this.$store.commit('setSearchAddr', {
          type: 'startAddr',
          value: {
            pname: info.startpname,
            cityname: info.startcityname,
            adname: info.startadname,
            township: info.starttownship,
            name: info.startAddr,
            location: { lng: info.startAddrLon, lat: info.startAddrLat }
          }
        })
        // 设置终点
        this.$store.commit('setSearchAddr', {
          type: 'endAddr',
          value: {
            pname: info.endpname,
            cityname: info.endcityname,
            adname: info.endadname,
            township: info.endtownship,
            name: info.endAddr,
            location: { lng: info.endAddrLon, lat: info.endAddrLat }
          }
        })
      }
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
    // 点击选择城市
    handleSelectCity () {
      this.$router.push('/common/city')
    },
    // 进入详情页面
    handleLinkDetail (id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    },
    handleLinkReserve (id) {
      this.$router.push({ path: '/common/reserve', query: { id } })
    }
  },
  created () {
    // 如果是站长首页
    const station = this.$route.query.station
    if (station) {
      this.$store.commit('setStationInfo', station)
      this.$store.commit('setPositionSelect', {
        type: 'city',
        value: { name: '', shortName: '' }
      })
      this.$store.commit('setPositionSelect', {
        type: 'county',
        value: { name: station, shortName: station }
      })
    }
    // 请求数据
    this.handleListLoad()
    this.handleQuickListLoad()
    this.reqLatestSearch()
    // if (this.identity === 0) {
    //   this.handleQuickListLoad()
    // }
    // 监听首页刷新事件
    EventBus.$on('home-refresh', async () => {
      console.log('监听到home-refresh')
      this.$toast.loading({ message: '正在刷新', duration: 10000 })
      await this.handlePullRefresh()
      this.$toast.clear()
    })
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
