<template>
  <div class="user-info">
    <!-- 头像 -->
    <div class="avatar">
      <van-image :src="record.headimg" width="100%" height="100%" fit="cover" round />
    </div>
    <div class="name ellipsis">{{record.userName || record.username}}</div>
    <!-- 点赞 -->
    <div class="social" v-if="showLike">
      <img v-if="record.isDo === 1" src="@/assets/icons/order/like-active.png" @click.stop="$emit('like', 0)">
      <img v-else src="@/assets/icons/order/like.png" @click.stop="$emit('like', 1)">
      <span>{{record.isLike}}</span>
    </div>
    <!-- 踩 -->
    <div class="social" v-if="showLike">
      <img v-if="record.isDo === 2" src="@/assets/icons/order/dislike-active.png" alt="" @click.stop="$emit('like', 0)">
      <img v-else src="@/assets/icons/order/dislike.png" alt="" @click.stop="$emit('like', 2)">
      <span>{{record.isNotLike}}</span>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'

export default {
  components: {
    'van-image': Image
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    showLike: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
// 使用订单底部用户栏样式
@import '@/assets/scss/user.scss';
</style>
