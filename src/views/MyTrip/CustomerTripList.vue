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
          @remove="handleRemove(item.orderId)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List } from 'vant'
import { selectMyJourney, deleteJourneyById } from '@/api'
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
    // 查看行程详情
    handleLinkDetail (e, id) {
      this.$router.push({ path: '/common/tripinfo/customer', query: { id } })
    },
    // 删除行程
    async handleRemove (id) {
      try {
        await this.$dialog.confirm({ message: '是否删除该条行程？' })
        const res = await deleteJourneyById({ id, journeyType: 2 })
        if (res.data.status === 200) {
          this.$toast.success('删除成功')
          this.handleDeleteItem(id)
        } else {
          this.$toast.fail('删除失败\n请稍后再试')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 从列表中删除某个元素
    handleDeleteItem (id) {
      const index = this.list.findIndex(i => i.orderId === id)
      this.list.splice(index, 1)
    }
  }
}
</script>
