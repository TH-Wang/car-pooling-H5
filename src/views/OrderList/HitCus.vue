<template>
  <div>
    <!-- 搜索卡片 -->
    <div class="search-card-wrap">
      <search-card
        useStore
        button-text="寻找乘客"
        button-color="green"
        @search="handleSearchOrder"
      />
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
    ><work-order :list="list" type="hitCus" />
      <!-- 订单 -->
      <!-- <hitchhike-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
        color="green"
      >
        <template #button>
          <mini-button
            color="green"
            :orderId="item.id"
            :menu="menu"
            :menuVisible="menuVisibleId === item.id"
            @click="handleClickReserve"
            @cancel="handleOrderCancel"
          >
            <van-icon style="margin-right: .05rem" size=".18rem" name="phone" />预约
          </mini-button>
        </template>
      </hitchhike-order> -->
    </van-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { List } from 'vant'
import { queryPassengerOrders } from '@/api'
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
    ...mapState(['position', 'search'])
  },
  methods: {
    // 车主找人api
    reqApi: queryPassengerOrders,
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      const cityname = this.position.county.name
      return {
        cityname,
        // orderType: 2, // 1-车主发布 2-乘客发布
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
        workType: 'hitCus',
        publishType: 4,
        // 1车主发布，2乘客发布
        // orderType: 2,
        startAddrAll,
        endAddrAll
      }
      this.$router.push({ path: '/common/searchline/list', query })
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
