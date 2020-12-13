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
          :key="city.code"
          :class="`grid-item${city.code === activeHotCity ? '-active' : ''}`"
          @click="handleCityChange(city.code)"
        >{{city.name}}</div>
      </div>
    </div>

    <div class="header">
      <span class="title">快捷路线</span>
    </div>

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无快捷路线，可点击重试" />
    </div>
    <!-- 快捷路线 -->
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
      <line-card
        class="list-item"
        v-for="item in list"
        :key="item.id"
        :record="item"
        common
        @click="handleSearch($event, item)"
      />
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { List } from 'vant'
import { cloneDeep, isEmpty } from 'lodash'
import { getCommonRoute, queryPositionForCounty } from '@/api'
import LineCard from '@/components/LineCard'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'line-card': LineCard
  },
  data: () => ({
    query: {},
    list: [],
    activeHotCity: null
    // pageSize: 20
  }),
  computed: {
    ...mapState(['position']),
    ...mapGetters(['location']),
    hotCities () {
      return this.position.countyList.slice(0, 9)
    },
    addrName () {
      const selectCity = this.hotCities.find(i => i.code === this.activeHotCity)
      return selectCity ? selectCity.name : ''
    }
  },
  methods: {
    reqApi: getCommonRoute,
    // 主要的请求参数
    getRequestDatas () {
      const addrName = this.activeHotCity === null
        ? this.position.city.name
        : this.addrName
      const publishType = parseInt(this.query.publishType)
      const data = { publishType }
      if (!isEmpty(addrName)) data.addrName = addrName
      return data
    },
    // 获取城市列表
    async handleRequestCity () {
      if (this.position.countyList.length === 0) {
        const res = await queryPositionForCounty(this.position.city.code)
        this.$store.commit('setCountyList', res.data.data)
        // this.activeHotCity = res.data.data[0].code
      }
    },
    // 搜索快捷路线的拼车单
    handleSearch (e, record) {
      const params = cloneDeep(this.query)
      if ('publishType' in params) delete params.publishType
      const { startAddr, endAddr } = record
      console.log(params)
      const query = {
        startAddr,
        endAddr,
        ...params
      }
      this.$router.push({ path: '/common/searchline/list', query })
    },
    // 选择的热门城市发生变化
    handleCityChange (code) {
      if (this.activeHotCity === code) this.activeHotCity = null
      else this.activeHotCity = code
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
    console.log(this.query)
    // this.handleListLoad()
    this.handleRequestCity()
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

// 标题
.header{
  padding: 0.15rem 0.15rem 0 0.15rem;
  @include font (.18rem, $main-text, bold);
}

.list-item{
  display: inline-flex;
  vertical-align: middle;
}
</style>
