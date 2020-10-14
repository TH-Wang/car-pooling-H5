<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="消息" fixed placeholder :border="false" />

    <!-- 消息列表 -->
    <van-pull-refresh v-model="refresh" @refresh="handleRefresh">
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

export default {
  components: {
    'van-pull-refresh': PullRefresh,
    'van-list': List
  },
  data: () => ({
    refresh: false,
    loading: false,
    finished: false,
    error: false,
    page: 1,
    limit: 5,
    total: 13,
    list: []
  }),
  methods: {
    // 跳转详情
    handleLink (e, id) {
      this.$router.push({ path: '/common/order/detail', query: { id } })
    },
    // 下拉刷新
    handleRefresh () {
      // 清理数据
      if (this.finished) this.finished = false
      if (this.error) this.error = false
      this.page = 1
      setTimeout(() => {
        this.list = []
        // 请求数据
        this.handleListLoad()
        this.refresh = false
      }, 1000)
    },
    // 加载更多消息
    handleListLoad () {
      if (this.list.length >= this.total) {
        this.finished = true
        return
      }

      var data = new Array(this.limit).fill({
        id: `${Date.now()}${parseInt(Math.random() * 10)}`,
        title: '拼车通知',
        content: '您的拼车信息已被车主xxxx车牌号xxxxxxx接单。',
        time: '2020-7-13 10:47'
      })
      this.list.push(...data)
      this.page++
      setTimeout(() => {
        this.loading = false
        console.log(this.list)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
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
