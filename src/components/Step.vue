<template>
  <div class="step-container">
    <div class="step">
      <div class="step-item" v-for="(item, index) in steps" :key="index">
        <div :class="`step-item-title${current >= index ? '-active' : ''}`">{{item}}</div>
        <div :class="`step-item-icon${current >= index ? '-active' : ''}`">{{index + 1}}</div>
      </div>
    </div>
    <div class="step-line">
      <span
        v-for="(el, idx) in steps"
        :key="idx"
        :class="`${current >= idx ? 'active-line' : ''}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    steps: ['提交申请', '添加客服微信']
  })
}
</script>

<style lang="scss" scoped>
.step-container{
  margin: 0 .15rem;
  position: relative;
}
.step{
  @include flex (space-between, center);

  &-item{
    @include flex (center, center, column);
    @include font (.14rem, $tip-text);

    &-title{
      margin-bottom: .10rem;

      &-active{
        @extend .step-item-title;
        color: $main-text;
      }
    }

    &-icon{
      width: .20rem;
      height: .20rem;
      line-height: .20rem;
      border-radius: 50%;
      text-align: center;
      font-size: .12rem;
      background-color: #EEF2FB;

      &-active{
        @extend .step-item-icon;
        background-color: $main-color;
        color: $main-text;
      }
    }
  }

  &-line{
    width: 2.75rem;
    position: absolute;
    bottom: .10rem;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);
    @include flex ($align: center);

    span{
      flex: 1;
      display: inline-block;
      height: .02rem;
      background-color: #EEF2FB;
    }
    .active-line{
      background-color: $main-color;
    }
  }
}
</style>
