<template>
  <transition name="van-fade">
    <div v-show="show" id="__OVERLAY" class="overlay" @click="handleClose">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose (e) {
      if (e.target.id === '__OVERLAY') {
        this.$emit('change', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay{
  width: 100vw;
  height: 100vh;
  background: rgba(38, 38, 38, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
