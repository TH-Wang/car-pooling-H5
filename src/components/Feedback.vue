<template>
  <div class="feedback">
    <van-icon
      :name="type === 'success' ? 'checked' : 'clear'"
      size=".65rem"
      :color="type === 'success' ? '#0AD593' : '#FF6A20'"
    />
    <div class="title">{{title}}</div>
    <div class="tip" v-html="tip"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 类型：['success', 'fail']
    type: {
      type: String,
      default: 'success'
    },
    title: String,
    tip: String
  }
}
</script>

<style lang="scss" scoped>
.feedback{
  padding-top: .30rem;
  @include flex (center, center, column);

  .title{
    margin-top: .20rem;
    @include font (.20rem, $main-text, bold);
  }

  .tip{
    margin-top: .12rem;
    @include font (.14rem, $sub-text, bold);
  }
}
</style>
