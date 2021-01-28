<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="消息" fixed placeholder :border="false" />

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry" class="empty-container">
      <van-empty :description="emptyDesc" />
    </div>

    <!-- 主体容器 -->
    <van-pull-refresh v-else v-model="refresh" @refresh="handlePullRefresh">
      <!-- 消息列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        @load="handleListLoad"
      >
        <message-item
          v-for="(item, index) in list"
          :key="index"
          :record="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import moment from 'moment'
import { PullRefresh, List } from 'vant'
import { queryUserMessage } from '@/api'
import ListMixin from '@/mixins/list-mixin'
import MessageItem from '@/components/MessageItem/index'

export default {
  name: 'Notify',
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [ListMixin],
  components: {
    'van-pull-refresh': PullRefresh,
    'van-list': List,
    'message-item': MessageItem
  },
  data: () => ({
    notReqOnMounted: true,
    messageType: {
      1: '订单通知',
      2: '拼车通知'
    }
  }),
  computed: {
    emptyDesc () {
      return this.$store.state.user.token ? '空空如也~' : '登录后即可查看'
    }
  },
  methods: {
    // 自定义请求api，详见 list-mixin
    reqApi: queryUserMessage,
    // 跳转详情
    handleLink (e, orderId) {
      this.$router.push({ path: '/common/notify/detail', query: { orderId } })
    },
    // 转换时间函数
    notifyTime (time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    },
    // 消息类型
    getTitle (type) {
      return this.messageType[type]
    }
  },
  mounted: async function () {
    if (!this.$store.state.user.token) return
    this.$toast.loading({ message: '加载中', duration: 10000 })
    await this.handleListLoad()
    this.$toast.clear()
  }
}
</script>

<style lang="scss" scoped>
.empty-container{
  width: 100%;
  position: fixed;
  top: 50%;
  transform: translateY(-80%);
}

.notify-container{
  margin: .20rem 0;
  padding: 0 .15rem;
  box-sizing: border-box;

  .time{
    @include font (.12rem, $tip-text);
    margin-bottom: .10rem;
    text-align: center;
  }

  .card{
    width: 100%;
    padding: .10rem .10rem .20rem .15rem;
    box-sizing: border-box;
    border-radius: .05rem;
    background-color: $light-color;

    &-header{
      @include flex ($align: center);
      @include font (.14rem, $main-text, bold);

      img{
        width: 0.2rem;
        height: 0.2rem;
        margin-right: .10rem;
        flex-shrink: 0;
      }
    }

    &-content{
      @include font (.14rem, $tip-text);
      margin: .06rem 0 .16rem 0;
      padding-left: .30rem;
    }

    &-link{
      @include font (.12rem, $main-color);
      margin-left: .30rem;
      padding-bottom: 3px;
      display: inline-block;
      border-bottom: solid 1px $main-color;
    }
  }
}
</style>
