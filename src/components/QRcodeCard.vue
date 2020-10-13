<template>
  <div class="card" :style="center ? 'margin:0 auto' : ''">
    <group-item :record="record" :type="type" />

    <!-- 二维码图片 -->
    <div class="QR-code"></div>

    <!-- 提示说明 -->
    <div class="tip">
      <p v-for="(text, index) in tips" :key="index" v-html="text"></p>
    </div>
  </div>
</template>

<script>
import GroupItem from '@/components/GroupItem'

export default {
  components: {
    'group-item': GroupItem
  },
  props: {
    center: {
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'group'
    },
    tips: Array
  }
}
</script>

<style lang="scss" scoped>
.card{
  width: 3.4rem;
  padding: .20rem 0 .15rem 0;
  box-sizing: border-box;
  border-radius: .10rem;
  background-color: #fff;

  .QR-code{
    width: 2.8rem;
    height: 2.8rem;
    margin: 0 auto .15rem auto;
    background-color: $light-color;
    border-radius: .06rem;
  }

  .tip{
    @include font (.12rem, $tip-text);
    text-align: center;
  }
}
</style>
