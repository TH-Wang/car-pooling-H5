<template>
  <div class="start-end">
    <div>{{start}}</div>
    <img src="@/assets/icons/line-arrow.png" alt="">
    <div>{{end}}</div>
  </div>
</template>

<script>
export default {
  props: {
    start: String,
    end: String
  }
}
</script>

<style lang="scss" scoped>
.start-end{
  width: 100%;
  @include font (.16rem, $main-text, bold);
  @include flex (flex-start, center);

  img{
    width: 0.16rem;
    height: 0.16rem;
    margin: 0 .10rem;
  }
}
</style>
