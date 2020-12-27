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
        <!-- 消息 -->
        <div
          class="notify-container"
          v-for="(item, index) in list"
          :key="index"
        >
          <!-- 时间 -->
          <div class="time">{{notifyTime(item.time)}}</div>
          <!-- 详情卡片 -->
          <div class="card" @click="handleLink($event, item.orderId)">
            <div class="card-header">
              <img src="@/assets/icons/notify.png" alt="">
              <span>拼车通知</span>
            </div>
            <div class="card-content">{{item.message}}</div>
            <div class="card-link">查看订单详情</div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import moment from 'moment'
import { PullRefresh, List } from 'vant'
import { queryUserMessage } from '@/api'
import ListMixin from '@/mixins/list-mixin'

export default {
  name: 'Notify',
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [ListMixin],
  components: {
    'van-pull-refresh': PullRefresh,
    'van-list': List
  },
  data: () => ({
    notReqOnMounted: true
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
    }
  },
  mounted () {
    if (!this.$store.state.user.token) return
    this.handleListLoad()
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
