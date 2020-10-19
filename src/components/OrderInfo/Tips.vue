<template>
  <div class="tips" :style="`text-align: ${align}`">
    <p v-for="(item, index) in tips" :key="index" v-html="item"></p>
  </div>
</template>

<script>
export default {
  props: {
    tips: Array,
    align: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style lang="scss" scoped>
.tips{
  @include font (.12rem, $sub-text);
  padding: 0 .15rem;
  margin-top: .20rem;
  margin-bottom: .20rem;
  line-height: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  text-align: left;

  .yellow{
    color: $main-color;
  }
}
</style>
