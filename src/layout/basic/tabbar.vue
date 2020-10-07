<template>
  <div class="tabbar">
    <div class="tabbar-item">
      <img src="@/assets/icons/index/home.png" alt="">
      <span class="title">首页</span>
    </div>
    <div class="tabbar-item">
      <img src="@/assets/icons/index/group.png" alt="">
      <span class="title">拼车群</span>
    </div>
    <div class="tabbar-item">
      <div class="middle"><van-icon name="plus"/></div>
    </div>
    <div class="tabbar-item">
      <img src="@/assets/icons/index/notify.png" alt="">
      <span class="title">消息</span>
    </div>
    <div class="tabbar-item">
      <img src="@/assets/icons/index/mine.png" alt="">
      <span class="title">我的</span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: {
    'van-icon': Icon
  }
}
</script>

<style lang="scss" scoped>
.tabbar{
  width: 100%;
  height: 55px;
  background: white;
  box-shadow: 0 0px 15px 0 rgba($color: #000000, $alpha: 0.08);
  position: fixed;
  bottom: 0;
  @include flex (space-around, center);

  &-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
      width: 24px;
      height: 24px;
      margin-bottom: 2px;
    }

    .title{
      @include font (10px, $tip-text);
    }

    .title-active{
      @extend .title;
      color: $main-text;
    }

    // 中间图标
    .middle{
      width: 45px;
      height: 45px;
      border-radius: 50%;
      transform: translateY(-2px);
      background-color: $main-color;
      box-shadow: 0 0 12px 0 rgba($color: $main-color, $alpha: 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      @include font (28px, #fff, bold);
    }
  }
}
</style>
