<template>
  <div class="info-item">
    <img :src="iconImage" alt="">
    <span class="label">{{label}}</span>
    <span :class="`text-${textColor}`">{{content}}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    content: [String, Number],
    // 内容的字体颜色: ['default', 'yellow']
    textColor: {
      type: String,
      default: 'default'
    },
    iconType: {
      type: String,
      default: 'user'
    }
  },
  computed: {
    iconImage () {
      return require(`@/assets/icons/order-field/${this.iconType}.png`)
    }
  }
}
</script>

<style lang="scss" scoped>
.info-item{
  @include font (.16rem, $tip-text, bold);
  text-align: left;
  margin: .15rem .20rem;
  font-family: PingFangSC-Medium, PingFang SC;

  &:last-child{
    margin-bottom: .20rem;
  }

  img{
    width: 0.2rem;
    height: 0.2rem;
    margin-right: .15rem;
    vertical-align: text-top;
  }

  .label{
    width: .66rem;
    margin-right: .15rem;
    @include textJustify;
  }

  .text{
    color: $main-text;
    line-height: .24rem;

    &-default{
      @extend .text;
    }

    &-yellow{
      @extend .text;
      color: $main-color;
    }
  }
}
</style>
