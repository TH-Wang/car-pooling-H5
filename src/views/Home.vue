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
    <search-card v-model="addr" />

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
import { NavBar, Icon, List } from 'vant'
import { isEmpty } from 'lodash'
import { OrderFilter } from '@/components/Filter/index.js'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import CarpoolOrder from '@/components/OrderItem/Carpool'
import MiniButton from '@/components/MiniButton'
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
    'carpool-order': CarpoolOrder,
    'mini-button': MiniButton
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
    // 显示当前定位城市
    getPosition () {
      if (isEmpty(this.position.city) && isEmpty(this.position.county)) {
        return '请选择城市'
      } else {
        if (isEmpty(this.position.county)) {
          return this.position.city.shortName
        } else return `${this.position.city.shortName} · ${this.position.county.shortName}`
      }
    },
    // 点击选择城市
    handleSelectCity () {
      this.$router.push('/common/city')
    },
    // 进入详情页面
    handleLinkDetail () {
      this.$router.push('/common/order/detail')
    },
    // 点击订单按钮
    handleClickOrderButton (e) {
      console.log('[点击mini按钮]', e)
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
