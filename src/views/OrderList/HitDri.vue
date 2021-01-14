<template>
  <div>
    <!-- 搜索卡片 -->
    <div class="search-card-wrap">
      <search-card useStore @search="handleSearchOrder" />
    </div>

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
    ><work-order :list="list" type="hitDri" />
      <!-- 订单 -->
      <!-- <hitchhike-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
        color="yellow"
        showCar showLineDetail
        @click="handleLinkDetail($event, item.pprId)"
      >
        <template #button>
          <mini-button
            color="yellow"
            :orderId="item.id"
            @click="handleLinkDetail($event, item.pprId)"
          >立即预订</mini-button>
        </template>
      </hitchhike-order> -->
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { List } from 'vant'
import SearchCard from '@/components/SearchCard'
import { OrderFilter } from '@/components/Filter/index.js'
import WorkOrder from '@/components/WorkOrder'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ButtonMenuMixin, ListMixin],
  components: {
    'van-list': List,
    'search-card': SearchCard,
    'order-filter': OrderFilter,
    'work-order': WorkOrder
  },
  computed: {
    ...mapState(['position', 'search']),
    ...mapGetters(['countyName'])
  },
  methods: {
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      const cityname = this.countyName
      return {
        cityname,
        orderType: 1, // 1-车主发布 2-乘客发布
        publishType: 4
      }
    },
    // 请求快捷路线时，自动调用该函数，获取请求参数
    getRequestQuickDatas () {
      return { startPage: 1, pageSize: 10 }
    },
    // 按起止地点找车
    handleSearchOrder ({ startAddrAll, endAddrAll }) {
      const query = {
        workType: 'hitDri',
        publishType: 4,
        // 1车主发布，2乘客发布
        orderType: 1,
        startAddrAll,
        endAddrAll
      }
      this.$router.push({ path: '/common/searchline/list', query })
    },
    // 进入订单详情
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-card-wrap{
  padding: .10rem 0;
  border-top: solid 1px rgba($color: #fff, $alpha: 0.6);
}
</style>
