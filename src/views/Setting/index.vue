<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的订单"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 头像 -->
    <div class="avatar-container">
      <div class="avatar">
        <van-image width=".60rem" height=".60rem" round fit="cover" />
        <div class="avatar-title">头像</div>
      </div>
      <div class="avatar-right">
        <span class="cell-text">修改头像</span><van-icon name="arrow"/>
      </div>
    </div>

    <!-- 修改昵称 -->
    <div class="cell" @click="handleSetNickName">
      <div class="cell-left">
        <img src="@/assets/icons/setting/smile.png" alt="">修改昵称
      </div>
      <div class="cell-right">
        <span class="cell-text">设置昵称</span><van-icon name="arrow"/>
      </div>
    </div>

    <!-- 修改手机号 -->
    <div class="cell" @click="$router.push('/common/phone/modify')">
      <div class="cell-left">
        <img src="@/assets/icons/setting/phone.png" alt="">修改手机号
      </div>
      <div class="cell-right">
        <span class="cell-text">修改手机号</span><van-icon name="arrow"/>
      </div>
    </div>

    <!-- 身份证认证 -->
    <div class="cell" @click="handleSetNickName">
      <div class="cell-left">
        <img src="@/assets/icons/setting/idcard.png" alt="">身份证认证
      </div>
      <div class="cell-right">
        <span class="cell-text-main">已认证</span><van-icon name="arrow"/>
      </div>
    </div>

    <!-- 驾驶证认证 -->
    <div class="cell" @click="handleSetNickName">
      <div class="cell-left">
        <img src="@/assets/icons/setting/card.png" alt="">驾驶证认证
      </div>
      <div class="cell-right">
        <span class="cell-text-main">已认证</span><van-icon name="arrow"/>
      </div>
    </div>

    <!-- 车辆认证 -->
    <div class="cell" @click="handleSetNickName">
      <div class="cell-left">
        <img src="@/assets/icons/setting/car.png" alt="">车辆认证
      </div>
      <div class="cell-right">
        <span class="cell-text">添加车辆</span><van-icon name="arrow"/>
      </div>
    </div>

    <!-- 投诉建议 -->
    <div class="cell" @click="handleSetNickName">
      <div class="cell-left">
        <img src="@/assets/icons/setting/suggest.png" alt="">投诉建议
      </div>
      <div class="cell-right">
        <van-icon name="arrow"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'

export default {
  components: {
    'van-image': Image
  },
  methods: {
    handleSetNickName () {
      console.log('设置昵称')
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container{
  height: 1rem;
  padding: 0 .15rem;
  box-sizing: border-box;
  @include flex (space-between, center);
  border-bottom: solid 1px #f5f5f5;

  .avatar{
    @include flex ($align: center);
  }

  .avatar-title{
    margin-left: .14rem;
    @include font (.17rem, #000000, bold);
  }

  .avatar-right{
    @include font (.12rem, $tip-text);
  }
}

.cell-text{
  margin-right: .05rem;
  display: inline-block;
  vertical-align: text-bottom;

  &-main{
    @extend .cell-text;
    color: $main-text;
  }
}

.cell{
  height: .60rem;
  margin: 0 .15rem;
  @include flex (space-between, center);
  border-bottom: solid 1px #f5f5f5;

  &-left{
    @include font (.14rem, $main-text);

    img{
      width: 0.2rem;
      height: 0.2rem;
      margin-right: .06rem;
      vertical-align: middle;
    }
  }

  &-right{
    @include font (.12rem, $tip-text);
  }
}
</style>
