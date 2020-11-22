<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="消息" fixed placeholder :border="false" />

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry" class="empty-container">
      <van-empty description="空空如也~" />
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
          <div class="time">{{item.time}}</div>
          <!-- 详情卡片 -->
          <div class="card" @click="handleLink($event, index)">
            <div class="card-header">
              <img src="@/assets/icons/notify.png" alt="">
              <span>{{item.title}}</span>
            </div>
            <div class="card-content">{{item.content}}</div>
            <div class="card-link">查看订单详情</div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List } from 'vant'
import { queryUserMessage } from '@/api'
import ListMixin from '@/mixins/list-mixin'

export default {
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [ListMixin],
  components: {
    'van-pull-refresh': PullRefresh,
    'van-list': List
  },
  methods: {
    // 自定义请求api，详见 list-mixin
    reqApi: queryUserMessage,
    // 跳转详情
    handleLink (e, id) {
      this.$router.push({ path: '/common/notify/detail', query: { id } })
    }
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
