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
        {{getPosition()}}<van-icon name="arrow" color="#262626" size=".15px" />
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
      :buttonColor="buttonColor"
      :buttonText="buttonText"
      useStore
      @search="handleSearchOrder"
    />

    <!-- 快捷路线 -->
    <quick-line
      :dataSource="quickList"
      @retry="handleRetryQuick"
      @link-more="$router.push('/common/quick/list')"
    />

    <!-- 筛选菜单 -->
    <order-filter v-model="filters" @change="handleFilterChange" />

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
    ><home-order :list="list" @link="handleLinkDetail" @reserve="handleLinkReserve" />
    </van-list>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { NavBar, Icon, List } from 'vant'
import { isEmpty } from 'lodash'
import { getCar, queryPassengerOrders } from '@/api'
import { OrderFilter } from '@/components/Filter/index.js'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import HomeOrder from '@/components/HomeOrder'
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
    'home-order': HomeOrder
  },
  data: () => ({
    mainNavConfig,
    // 存储起止点信息
    addr: {
      start: '',
      end: ''
    },
    needQuick: true
  }),
  computed: {
    // 全局存储城市区县数据
    ...mapState(['user', 'position', 'search']),
    ...mapGetters(['identity', 'location']),
    buttonColor () {
      return this.identity === 0 ? 'yellow' : 'green'
    },
    buttonText () {
      return this.identity === 0 ? '寻找车主' : '寻找乘客'
    }
  },
  methods: {
    reqApi (data) {
      return this.identity === 0 ? getCar(data) : queryPassengerOrders(data)
    },
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      if (this.identity === 1) return {}
      // 通过身份判断发布类型，1-车主发布 2-乘客发布
      const orderType = this.identity === 0 ? 1 : 2
      return { orderType, publishType: 1 }
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
        startAddr: startAddr.name,
        endAddr: endAddr.name
      }
      this.$router.push({ path: '/common/searchline/list', query })
    },
    // 显示当前定位城市
    getPosition () {
      if (isEmpty(this.position.city) && isEmpty(this.position.county)) {
        return '请选择城市'
      } else {
        return this.location
      }
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
  created: async function () {
    if (isEmpty(this.position.city) && isEmpty(this.position.county)) {
      await this.$dialog.alert({
        title: '位置信息',
        message: '请先选择城市，然后向您推荐当地的拼单信息!'
      })
      this.$router.push('/common/city')
    }
  },
  activated () {
    console.log('Home activated')
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
