<template>
  <div class="user-info">
    <!-- 头像 -->
    <div class="avatar">
      <van-image :src="record.headimg" width="100%" height="100%" fit="cover" round />
    </div>
    <div class="name ellipsis">{{record.userName}}</div>
    <!-- 点赞 -->
    <div class="social">
      <img v-if="isDo" src="@/assets/icons/order/like-active.png" @click="$emit('like', 1)">
      <img v-else src="@/assets/icons/order/like.png" @click="$emit('like', 1)">
      <span>{{record.isLike}}</span>
    </div>
    <!-- 踩 -->
    <div class="social">
      <img src="@/assets/icons/order/dislike.png" alt="" @click="$emit('like', 2)">
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
    }
  },
  computed: {
    isDo () {
      return this.record.isDo === 1
    },
    isNotLikeIcon () {
      const name = this.record.isNotLike ? 'dislike-active' : 'dislike'
      return require(`@/assets/icons/order/${name}.png`)
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
// 使用订单底部用户栏样式
@import '@/assets/scss/user.scss';
</style>
