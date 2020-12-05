<template>
  <div>
    <van-pull-refresh v-model="refresh" @refresh="handlePullRefresh">
    <van-empty description="暂无行程" v-if="list.length === 0" />
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
      >
        <trip-item
          v-for="item in list"
          :key="item.id"
          :record="item"
          :show-remove="manage"
          @click="handleLinkDetail($event, item.id)"
          @action="openAction(item)"
        />
      </van-list>
    </van-pull-refresh>

    <!-- 操作菜单 -->
    <van-action-sheet
      v-model="showAction"
      :actions="actions"
      cancel-text="取消"
      @cancel="showAction = false"
      @select="handleAction"
    />
  </div>
</template>

<script>
import { PullRefresh, List, ActionSheet } from 'vant'
import { queryAllJourney } from '@/api'
import TripItem from './TripItem'
import ListMixin from '@/mixins/list-mixin'

export default {
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [ListMixin],
  components: {
    'van-pull-refresh': PullRefresh,
    'van-list': List,
    'van-action-sheet': ActionSheet,
    'trip-item': TripItem
  },
  props: {
    manage: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    pageSize: 20,
    showAction: false,
    actions: [{ name: '分享', subname: '分享给你的小伙伴' },
      { name: '删除', color: '#ee0a24' }],
    actionType: {
      1: [
        { name: '分享', subname: '分享给你的小伙伴' },
        { name: '删除', color: '#ee0a24' }
      ]
    },
    processed: {}
  }),
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
    // 弹出操作菜单
    openAction (record) {
      console.log(record)
      this.showAction = true
    },
    // 处理用户操作
    handleAction (e) {
      console.log(e.detail)
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
