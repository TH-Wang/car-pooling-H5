<template>
  <div
    :class="`button-${color}-${type}`"
    :style="Style"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '3.15rem'
    },
    color: {
      type: String,
      default: 'yellow'
    },
    // 填充样式: {'fill': '填充', 'gradient': '渐变', 'hollow': '镂空'}
    type: {
      type: String,
      default: 'fill'
    },
    // 文本是否加粗
    bold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    Style () {
      return `
        width: ${this.width};
        font-weight: ${this.bold ? 'bold' : '400'};
        ${this.center ? 'margin: 0 auto' : ''}
      `
    }
  }
}
</script>

<style lang="scss" scoped>
.button{
  width: 3.15rem;
  height: 0.50rem;
  line-height: 0.50rem;
  border-radius: 0.05rem;
  text-align: center;
  color: white;
  font-size: 0.16rem;
  transition: all 0.1s;
  box-sizing: border-box;

  &:active{
    opacity: 0.6;
  }

  // 黄色按钮
  &-yellow{
    @extend .button;
    background-color: $main-color;

    &-fill{
      @extend .button-yellow;
    }

    &-gradient{
      @extend .button;
      background: linear-gradient(90deg, #FFCD00 0%, #FFAE20 100%);
    }

    &-hollow{
      @extend .button;
      background-color: transparent;
      border: solid 1px $main-color;
      color: $main-color;
    }
  }

  &-blue{
    @extend .button;
    background-color: $aid-blue-color;

    &-fill{
      @extend .button-blue;
    }
  }

  &-green{
    @extend .button;
    background-color: $aid-green-color;

    &-fill{
      @extend .button-green;
    }
  }

  // 灰色按钮
  &-gray{
    @extend .button;
    background-color: $normal-text;

    &-hollow{
      @extend .button;
      border: solid 1px $tip-text;
      color: $tip-text;
    }
  }
}
</style>
