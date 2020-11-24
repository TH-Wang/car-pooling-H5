<template>
  <div>
    <van-empty description="暂无行程" v-if="list.length === 0" />
    <van-pull-refresh v-else v-model="refresh" @refresh="handlePullRefresh">
      <!-- 拼单列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        @load="handleListLoad"
        class="list-container"
      >
        <trip-item
          v-for="item in list"
          :key="item.id"
          :record="item"
          :show-remove="manage"
          @click="handleLinkDetail($event, item.id)"
          @remove="handleRemove(item.id)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List } from 'vant'
import { queryAllJourney } from '@/api'
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
    reqApi: queryAllJourney,
    // 返回主要参数
    getRequestDatas () {
      return { journeyType: 1 }
    },
    // 自定义处理返回值
    resDataHandler (res) {
      const { rows, total } = res.data
      return { list: rows, total }
    },
    // 查看行程详情
    handleLinkDetail (e, id) {
      this.$router.push({
        path: '/common/tripinfo/driver',
        query: { id }
      })
    }
  }
}
</script>
