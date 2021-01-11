<template>
  <div>
    <van-empty description="暂无订单信息" v-if="list.length === 0" />
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
      <goods-item
        v-for="item in list"
        :key="item.id"
        :record="item"
        button-text="进行中"
        button-type="primary"
        show-tip
        price-suffix="起"
        @click="handleLinkDetail(item.id)"
      />
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant'
import { getTourCarOrderList } from '@/api'
import ListMixin from '@/mixins/list-mixin'
import GoodsItem from '@/components/GoodsItem'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'goods-item': GoodsItem
  },
  methods: {
    reqApi: getTourCarOrderList,
    getRequestDatas () {
      return { orderType: 2 }
    },
    handleLinkDetail (id) {
      this.$router.push({ path: '/common/my/order/car', query: { id } })
    }
  }
}
</script>
