<template>
  <div>
    <!-- 搜索卡片 -->
    <div class="search-card-wrap">
      <search-card
        useStore
        buttonText="寻找乘客"
        buttonColor="green"
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
    ><work-order :list="list" type="carryCus" />
      <!-- <carry-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
        type="customer"
        @click="handleLinkDetail($event, item.pprId)"
      >
        <template #button>
          <mini-button
            color="green"
            :orderId="item.id"
            :menu="menu"
            :menuVisible="menuVisibleId === item.id"
            @click="handleLinkDetail($event, item.pprId)"
            @cancel="handleOrderCancel"
          >
            <van-icon style="margin-right: .05rem" size=".18rem" name="phone" />预约
          </mini-button>
        </template>
      </carry-order> -->
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
import ListMixin from '@/mixins/list-mixin'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'

export default {
  mixins: [ListMixin, ButtonMenuMixin],
  components: {
    'van-list': List,
    'order-filter': OrderFilter,
    'search-card': SearchCard,
    'work-order': WorkOrder
  },
  data: () => ({
    menuVisibleId: null,
    menu: [{ type: 'cancel', text: '取消预约' }]
  }),
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
        publishType: 5 // 顺路带物
      }
    },
    // 进入订单详情
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    },
    // 取消预约
    handleOrderCancel (e, id) {
      console.log('取消预约')
    },
    // 按起止地点找车
    handleSearchOrder ({ startAddrAll, endAddrAll }) {
      const query = {
        workType: 'carryCus',
        publishType: 5,
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
