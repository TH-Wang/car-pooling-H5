<template>
  <div>
    <!-- 搜索框导航栏 -->
    <nav-bar-search v-model="searchValue" @change="handleSearch" mode="dark"/>

    <div class="header">已收录 4629 个高质量拼车群，覆盖全国各省市，欢迎全国各地拼车群入住本平台！</div>

    <!-- 热门群 -->
    <div class="hot-groups">
      <div class="hot-groups-title">热门群</div>
      <div class="hot-groups-list">
        <div
          v-for="item in hotGroups"
          :key="item.id"
          class="grid-item"
          @click="handleCheckHotGroup($event, item.name)"
        >{{item.name}}</div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <main-button
      class="footer"
      center
      @click="$router.push('/common/group/area')"
    >按地域找群</main-button>

    <!-- 搜索结果列表 -->
    <div class="search-list" v-show="showSearchList">
      <!-- 空状态 -->
      <van-empty
        v-if="list.length === 0"
        description="未搜索到该地区的拼车群"
      />
      <!-- 列表 -->
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        @load="handleListLoad"
        class="list-container"
      ><group-item
          v-for="item in list"
          :key="item.id"
          type="group"
          :record="item"
          @click="handleLink($event, item.id)"
        > <template #right>
            <mini-button>
              <span :class="priceClass(item.price)">{{priceText(item.price)}}</span>
            </mini-button>
          </template>
        </group-item>
      </van-list>
    </div>
  </div>
</template>

<script>
import { isEmpty, debounce } from 'lodash'
import { List } from 'vant'
import { selectGroup } from '@/api'
import NavBarSearch from '@/components/NavBarSearch'
import MainButton from '@/components/MainButton'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'
import ListMixin from '@/mixins/list-mixin'
import { priceClass, priceText } from './utils'
import { mapState } from 'vuex'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'nav-bar-search': NavBarSearch,
    'main-button': MainButton,
    'group-item': GroupItem,
    'mini-button': MiniButton
  },
  data: () => ({
    hotGroups: [
      { id: 0, name: '河南4群' },
      { id: 1, name: '北京拼车群' },
      { id: 2, name: '德州3群' },
      { id: 3, name: '深圳东莞 - 奉节 ' },
      { id: 4, name: '广西3群' },
      { id: 5, name: '西安 - 咸阳' },
      { id: 6, name: '江苏群' },
      { id: 7, name: '顺风车群' }
    ],
    searchValue: '',
    notReqOnMounted: true
  }),
  computed: {
    ...mapState(['position']),
    showSearchList () {
      return !isEmpty(this.searchValue)
    }
  },
  methods: {
    // 请求拼车群列表的api函数
    reqApi: selectGroup,
    // 返回主要的请求参数
    getRequestDatas () {
      const countyInfo = this.position.selected.county
      const keyword = this.searchValue
      return {
        lon: countyInfo.lon,
        lat: countyInfo.lat,
        keyword
      }
    },
    // 自己处理返回值
    // resDataHandler (res) {
    //   const { rows, total } = res.data
    //   return { list: rows, total }
    // },
    // 搜索事件
    handleSearch: debounce(function () {
      if (isEmpty(this.searchValue)) return
      this.handlePullRefresh()
    }, 300),
    handleCheckHotGroup (e, name) {
      this.searchValue = name
      this.handlePullRefresh()
    },
    // 价格的前缀样式
    priceClass,
    // 价格的前缀样式
    priceText,
    handleLink (e, id) {
      this.$router.push({ path: '/common/group/detail', query: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  margin: calc(46px + .20rem) .15rem .30rem .15rem;
  text-align: center;
  @include font (.14rem, $sub-text);
}
// 热门城市
.hot-groups{
  padding: .05rem .15rem .15rem .15rem;

  &-title{
    text-align: left;
    margin-bottom: .10rem;
    @include font (.18rem, #333333, bold);
  }

  &-list{
    @include flex;
    flex-wrap: wrap;
  }

  .grid-item{
    margin: 0 .13rem .13rem 0;
    height: .32rem;
    line-height: .32rem;
    padding: 0 .18rem;
    color: $sub-text;
    border-radius: 0.02rem;
    background-color: $linecard-color;
  }

  .grid-item-active{
    @extend .grid-item;
    color: #ffffff;
    background-color: $main-color;
  }
}

// 搜索列表
.search-list{
  width: 100%;
  height: calc(100vh - 50px);
  padding-top: .2rem;
  box-sizing: border-box;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 9;
  background-color: white;
}

.footer{
  position: fixed;
  bottom: .30rem;
  left: 50%;
  transform: translateX(-50%);
}

.price-prefix::before{
  content: '￥';
  margin-right: -2px;
  font-size: .15rem;
}
</style>
