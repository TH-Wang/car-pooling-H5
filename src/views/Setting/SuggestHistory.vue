<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="历史记录"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 列表 -->
    <div class="list">
      <div class="time">2020-7-13 10:47</div>
      <div class="info">
        <div class="info-header">
          <img src="@/assets/icons/suggest/suggest-1.png" alt="">
          <div class="info-title">我要申诉</div>
        </div>
        <div class="info-content">这里是申诉的问题描述内容</div>
        <div class="info-img-box">
          <van-image class="info-image" width=".90rem" height=".70rem" fit="cover"/>
          <van-image class="info-image" width=".90rem" height=".70rem" fit="cover"/>
          <van-image class="info-image" width=".90rem" height=".70rem" fit="cover"/>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="time">2020-7-13 10:47</div>
      <div class="info">
        <div class="info-header">
          <img src="@/assets/icons/suggest/suggest-2.png" alt="">
          <div class="info-title">我要投诉</div>
        </div>
        <div class="info-content">这里是申诉的问题描述内容</div>
        <div class="info-img-box">
          <van-image class="info-image" width=".90rem" height=".70rem" fit="cover"/>
          <van-image class="info-image" width=".90rem" height=".70rem" fit="cover"/>
          <van-image class="info-image" width=".90rem" height=".70rem" fit="cover"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'

export default {
  components: {
    'van-image': Image
  }
}
</script>

<style lang="scss" scoped>
.list{
  margin: .20rem auto;
  width: 3.45rem;

  .time{
    @include font (.12rem, $tip-text);
    margin-bottom: .10rem;
    text-align: center;
  }

  .info{
    border-radius: .05rem;
    background-color: $light-color;
    padding: .10rem .10rem .15rem .15rem;
    box-sizing: border-box;

    &-header{
      margin-bottom: .06rem;
      @include flex ($align: center);

      img{
        width: .20rem;
        height: 0.2rem;
      }
    }

    &-title{
      margin-left: .10rem;
      @include font (.14rem, $main-text, bold);
    }

    &-content{
      padding-left: .30rem;
      box-sizing: border-box;
      @include font (.14rem, $tip-text);
      margin-bottom: .15rem;
    }

    &-img-box{
      padding-left: .30rem;
      box-sizing: border-box;
      @include flex (space-between, center)
    }

    &-image{
      border-radius: .02rem;
    }
  }
}
</style>
