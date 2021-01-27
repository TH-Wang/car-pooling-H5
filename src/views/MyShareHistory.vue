<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="邀请记录"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 顶部总记录 -->
    <!-- <div class="header">
      <div class="header-item"><span>一级分销人数</span><p>1000</p></div>
      <div class="header-item"><span>二级分销人数</span><p>1000</p></div>
      <div class="header-item"><span>三级推广人数</span><p>1000</p></div>
    </div> -->

    <!-- <div class="title">我的邀请</div> -->

    <!-- 邀请列表 -->
    <van-empty v-if="list.length === 0" description="暂无邀请记录，快去邀请你的好友吧" />
    <div class="history" v-for="(item, index) in list" :key="index">
      <!-- <van-image width=".30rem" height=".30rem" fit="cover" round  /> -->
      <div class="avatar">
        <van-image width="100%" height="100%" :src="item.headimg" fit="cover" />
      </div>
      <span>{{item.username}}</span>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'
import { getUserInviteList } from '@/api'

export default {
  components: {
    'van-image': Image
  },
  data: () => ({
    list: []
  }),
  methods: {
    async handleReq () {
      const res = await getUserInviteList()
      this.list = res.data.data
    }
  },
  created () {
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: .54rem;
  margin: .16rem .15rem .20rem .15rem;
  padding: .09rem .10rem;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: $light-color;
  @include flex ($align: center);

  &-item{
    flex: 1;

    span{
      @include font (.12rem, $tip-text);
    }

    p{
      @include font (.18rem, $main-text, bold);
    }
  }
}

.title{
  @include font (.18rem, $main-text, bold);
  margin: .15rem .15rem 0 .15rem;
}

.history{
  height: .60rem;
  margin: 0 .15rem;
  border-bottom: solid 1px #f5f5f5;
  @include flex ($align: center);

  .avatar{
    width: .30rem;
    height: .30rem;
    border-radius: 50%;
    background-color: $light-color;
    overflow: hidden;
  }

  span{
    @include font (.14rem, $main-text);
    margin-left: .15rem;
  }
}
</style>
