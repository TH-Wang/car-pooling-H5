<template>
  <div
    :class="`button-${color}${gradient ? '-gradient' : ''}`"
    :style="`width: ${width};${center ? 'margin: 0 auto' :''}`"
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
    gradient: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.button{
  // margin: 0 auto;
  width: 3.15rem;
  height: 0.50rem;
  line-height: 0.50rem;
  border-radius: 0.05rem;
  text-align: center;
  color: white;
  font-size: 0.16rem;
  transition: all 0.1s;

  &:active{
    opacity: 0.6;
  }

  &-yellow{
    @extend .button;
    background-color: $main-color;

    &-gradient{
      @extend .button;
      background: linear-gradient(90deg, #FFCD00 0%, #FFAE20 100%);
    }
  }

  &-blue{
    @extend .button;
    background-color: $aid-blue-color;
  }

  &-green{
    @extend .button;
    background-color: $aid-green-color;
  }
}
</style>
