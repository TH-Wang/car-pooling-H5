<template>
  <div class="container">

    <!-- 导航栏 -->
    <van-nav-bar title="拼车之家" fixed placeholder :border="false">
      <template #left>
        重庆 · 渝北区
      </template>
    </van-nav-bar>

    <!-- banner -->
    <div class="banner"></div>

    <!-- 主要导航区 -->
    <div class="main-nav">
      <div
        class="main-nav-item"
        v-for="(item, index) in mainNavConfig"
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
    <carpool-order />
    <carpool-order />
    <carpool-order />
    <carpool-order />
  </div>
</template>

<script>
import { NavBar, DropdownMenu, DropdownItem } from 'vant'
import mainNavConfig from '@/configs/homeMainNav'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'
import CarpoolOrder from '@/components/CarpoolOrder'

export default {
  name: 'Home',
  components: {
    'van-nav-bar': NavBar,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'search-card': SearchCard,
    'quick-line': QuickLine,
    'carpool-order': CarpoolOrder
  },
  data: () => ({
    mainNavConfig,
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
  })
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

</style>
