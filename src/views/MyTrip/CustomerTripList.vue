<template>
  <div>
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无行程，点击刷新" />
    </div>
    <van-pull-refresh v-else v-model="refresh" @refresh="handlePullRefresh">
      <!-- 拼单列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        offset="100"
        @load="handleListLoad"
        class="list-container"
      >
        <trip-item
          v-for="item in list"
          :key="item.id"
          :record="item"
          :show-remove="manage"
          @click="handleLinkDetail($event, item.orderId)"
          @remove="handleRemove(item.id)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List } from 'vant'
import { selectMyJourney } from '@/api'
import TripItem from './TripItem'
import ListMixin from '@/mixins/list-mixin'

export default {
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [ListMixin],
  components: {
    'van-pull-refresh': PullRefresh,
    'van-list': List,
    'trip-item': TripItem
  },
  props: {
    manage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 请求api函数
    reqApi: selectMyJourney,
    // // 自定义处理返回值
    // resDataHandler (res) {
    //   const { data, total } = res.data
    //   return { list: data, total }
    // },
    // 查看行程详情
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/tripinfo/customer', query: { id } })
    }
  }
}
</script>
