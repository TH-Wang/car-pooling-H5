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
    <div class="header">
      <div class="header-item"><span>一级分销人数</span><p>1000</p></div>
      <div class="header-item"><span>二级分销人数</span><p>1000</p></div>
      <div class="header-item"><span>三级推广人数</span><p>1000</p></div>
    </div>

    <div class="title">我的邀请</div>

    <!-- 邀请列表 -->
    <div class="history" v-for="(item, index) in list" :key="index">
      <!-- <van-image width=".30rem" height=".30rem" fit="cover" round  /> -->
      <div class="avatar"></div>
      <span>圆脸橙</span>
    </div>
  </div>
</template>

<script>
// import { Image } from 'vant'

export default {
  components: {
    // 'van-image': Image
  },
  data: () => ({
    list: new Array(5).fill('')
  })
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
  margin: 0 .15rem;
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
  }

  span{
    @include font (.14rem, $main-text);
    margin-left: .15rem;
  }
}
</style>
