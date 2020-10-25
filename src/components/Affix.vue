<template>
  <div
    class="affix"
    ref="affix"
    :style="`bottom: ${bottom}px`"
    @click="$emit('click')"
  >
    <img :src="iconImage" alt="">
    <span>{{content}}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    content: String
  },
  data: () => ({
    bottom: 100,
    offset: 0,
    limit: 100,
    affixHeight: 0,
    viewHeight: 0,
    clientHeight: 0
  }),
  computed: {
    iconImage () {
      return require(`@/assets/icons/affix/${this.icon}.png`)
    }
  },
  methods: {
    handleTouchStart (e) {
      const clientY = e.touches[0].clientY
      const affixBtmY = this.$refs.affix.getBoundingClientRect().bottom
      this.offset = affixBtmY - clientY
      // 添加触摸移动事件和取消触摸事件
      this.$refs.affix.addEventListener('touchmove', this.handleTouchMove, false)
      this.$refs.affix.addEventListener('touchend', this.handleTouchEnd, false)
      // 取消body的默认滚动事件
      document.body.addEventListener('touchmove', this.preventDefault, { passive: false })
    },
    handleTouchMove (e) {
      // 应该移动的y方向位移
      const y = e.touches[0].clientY + this.offset
      // 可移动的范围高度
      const vh = this.viewHeight
      const limit = this.limit
      let move = 0
      if (vh < y) {
        move = limit
      } else if (y - this.affixHeight < 60) {
        move = this.clientHeight - 60 - this.affixHeight
      } else {
        move = vh - y + limit
      }
      this.bottom = move
    },
    handleTouchEnd () {
      this.$refs.affix.removeEventListener('touchmove', this.handleTouchMove, false)
      this.$refs.affix.removeEventListener('touchend', this.handleTouchEnd, false)
      // 恢复默认滚动事件
      document.body.removeEventListener('touchmove', this.preventDefault, { passive: false })
    },
    preventDefault (e) {
      e.preventDefault()
    }
  },
  mounted () {
    this.affixHeight = this.$refs.affix.getBoundingClientRect().height
    this.clientHeight = document.documentElement.clientHeight
    this.viewHeight = this.clientHeight - this.limit
    this.$refs.affix.addEventListener('touchstart', this.handleTouchStart, false)
  }
}
</script>

<style lang="scss" scoped>
.affix{
  padding: .09rem .10rem;
  border-top-left-radius: .50rem;
  border-bottom-left-radius: .50rem;
  background-color: $aid-blue-color;
  box-shadow: 0px 5px 10px 0px rgba(0, 174, 255, 0.5);
  @include flex ($align: center);
  position: fixed;
  bottom: 100px;
  right: 0;
  z-index: 99;

  img{
    width: .16rem;
    height: 0.16rem;
  }

  span{
    margin-left: .10rem;
    @include font (.14rem, #fff);
  }
}
</style>
