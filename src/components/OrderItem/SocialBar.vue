<template>
  <div class="user-info">
    <!-- 头像 -->
    <div class="avatar">
      <van-image :src="record.headimg" width="100%" height="100%" fit="cover" round />
    </div>
    <div class="name ellipsis">{{record.userName}}</div>
    <div class="social">
      <img src="@/assets/icons/order/like.png" alt="">
      <span>{{record.isLike}}</span>
    </div>
    <div class="social">
      <img src="@/assets/icons/order/dislike.png" alt="">
      <span>{{record.isNotLike}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
// 使用订单底部用户栏样式
@import '@/assets/scss/user.scss';
</style>
