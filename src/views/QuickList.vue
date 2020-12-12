<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="快捷路线"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 当前定位城市 -->
    <div class="current-city">
      当前定位城市·区域 <span>{{location}}</span>
    </div>

    <!-- 热门城市 -->
    <div class="hot-cities">
      <div class="hot-cities-title">热门城市</div>
      <div class="hot-cities-grid">
        <div
          v-for="city in hotCities"
          :key="city.id"
          :class="`grid-item${city.id === activeHotCity ? '-active' : ''}`"
          @click="handleCityChange"
        >{{city.name}}</div>
      </div>
    </div>

    <!-- 快捷路线 -->
    <quick-line :dataSource="list" :query="query" :show-link="false" @retry="handleRetry" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCommonRoute } from '@/api'
import QuickLine from '@/components/QuickLine'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin],
  components: {
    'quick-line': QuickLine
  },
  data: () => ({
    query: {},
    list: [],
    activeHotCity: 1,
    hotCities: [
      { id: 0, name: '渝中区' },
      { id: 1, name: '渝北区' },
      { id: 2, name: '江北区' },
      { id: 3, name: '沙坪坝区' },
      { id: 4, name: '南岸区' },
      { id: 5, name: '大渡口区' },
      { id: 6, name: '北碚区' },
      { id: 7, name: '巴南区' },
      { id: 8, name: '江津区' }
    ]
  }),
  computed: {
    ...mapGetters(['location']),
    addrName () {
      return this.hotCities.find(i => i.id === this.activeHotCity).name
    }
  },
  methods: {
    reqApi: getCommonRoute,
    // 主要的请求参数
    getRequestDatas () {
      const publishType = this.query.publishType
      const addrName = this.addrName
      return { publishType, addrName }
    },
    // 选择的热门城市发生变化
    handleCityChange (id) {
      this.activeHotCity = id
      this.handlePullRefresh()
    },
    // 点击重试
    async handleRetry () {
      this.$toast.loading({ message: '加载中', duration: 10000 })
      await this.handlePullRefresh()
      this.$toast.clear()
    }
  },
  created () {
    this.query = this.$route.query
    this.handleListLoad()
  }
}
</script>

<style lang="scss" scoped>
// 当前定位城市
.current-city{
  text-align: left;
  padding: .20rem .15rem;
  @include font (.14rem, $sub-text);

  span{
    color: $main-text;
    font-weight: bold;
  }
}

// 热门城市
.hot-cities{
  padding: .05rem .15rem .15rem .15rem;

  &-title{
    text-align: left;
    margin-bottom: .10rem;
    @include font (.18rem, #333333, bold);
  }

  &-grid{
    display: grid;
    grid-template-columns: repeat(3, .94rem);
    grid-template-rows: repeat(3, .34rem);
    grid-gap: .13rem;

    .grid-item{
      display: flex;
      justify-content: center;
      align-items: center;
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
}
</style>
