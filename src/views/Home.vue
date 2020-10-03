<template>
  <div class="container">

    <!-- 导航栏 -->
    <van-nav-bar
      title="拼车之家"
      fixed
      placeholder
      :border="false"
      @click-left="handleChooseCity"
    >
      <template #left>
        重庆 · 渝北区<van-icon name="arrow" color="#262626" />
      </template>
    </van-nav-bar>

    <!-- <van-pull-refresh v-model="refresh" @refresh="handleListRefresh"> -->

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
    <search-card />

    <!-- 快捷路线 -->
    <quick-line />

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
    >
      <carpool-order v-for="(item, index) in list" :key="index" />
    </van-list>

    <!-- </van-pull-refresh> -->

  </div>
</template>

<script>
import { NavBar, Icon, DropdownMenu, DropdownItem, List, Toast } from 'vant'
import mainNavConfig from '@/configs/homeMainNav'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import CarpoolOrder from '@/components/CarpoolOrder'

export default {
  name: 'Home',
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-list': List,
    // 'van-pull-refresh': PullRefresh,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'search-card': SearchCard,
    'quick-line': QuickLine,
    'carpool-order': CarpoolOrder
  },
  data: () => ({
    mainNavConfig,
    refresh: false,
    list: [],
    total: 0,
    loading: false,
    finished: false,
    error: false,
    areaValue: 0,
    areaOptions: [
      { text: '全城', value: 0 },
      { text: '江北区', value: 1 },
      { text: '渝中区', value: 3 },
      { text: '南岸区', value: 4 },
      { text: '沙坪坝区', value: 5 }
    ],
    timeValue: 0,
    timeOptions: [
      { text: '全天', value: 0 },
      { text: '上午', value: 1 },
      { text: '中午', value: 2 },
      { text: '下午', value: 3 },
      { text: '晚上', value: 4 }
    ],
    priceValue: 0,
    priceOptions: [
      { text: '不限车价', value: 0 },
      { text: '100元以下', value: 1 },
      { text: '100-300元', value: 2 },
      { text: '300-500元', value: 3 },
      { text: '500-1000元', value: 4 },
      { text: '1000元以上', value: 5 }
    ],
    seatValue: 0,
    seatOptions: [
      { text: '不限座位', value: 0 },
      { text: '靠窗', value: 1 },
      { text: '前排', value: 2 },
      { text: '后排', value: 3 }
    ]
  }),
  methods: {
    // 点击选择城市
    handleChooseCity () {
      console.log('choose city')
    },
    // 列表刷新
    handleListRefresh () {
      setTimeout(() => {
        this.refresh = false
        Toast('刷新成功')
      }, 2000)
    },
    // 列表加载
    handleListLoad () {
      setTimeout(() => {
        if (this.total >= 16) {
          this.loading = false
          this.finished = true
          return
        }

        this.list.push(...new Array(4).fill(1))
        this.total += 4
        console.log('触发')
        this.loading = false
      }, 2000)
    }
  },
  mounted: function () {
    this.list.push(...new Array(4).fill(1))
    this.total = 4
  }
}
</script>

<style lang="scss" scoped>
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
