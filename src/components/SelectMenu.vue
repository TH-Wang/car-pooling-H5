<template>
    <div class="select-container">
      <!-- 显示文本 -->
      <span>{{text}}</span>
      <!-- 选择菜单 -->
      <transition name="slide">
        <div v-show="show" class="menu">
          <div
            :class="`menu-item${index === value ? '-active' : ''}`"
            v-for="(item, index) in columns"
            :key="index"
            @click="$emit('change', index)"
          >{{item}}</div>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: Number,
    columns: {
      type: Array,
      default: () => ([])
    },
    'default-index': {
      type: Number,
      default: 0
    }
  },
  computed: {
    text () {
      return this.columns[this.value]
    }
  },
  mounted () {
    this.$emit('change', this.defaultIndex)
  }
}
</script>

<style lang="scss" scoped>
// 动画
.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}
.slide-enter, .slide-leave-to {
  transform: scaleY(0);
}

// 容器
.select-container{
  position: relative;

  // 菜单
  .menu{
    position: absolute;
    top: calc(100% + 12px);
    left: -0.12rem;
    width: 2.40rem;
    z-index: 100;
    max-height: 1.76rem;
    overflow-y: scroll;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(38, 38, 38, 0.06);
    border-radius: .05rem;
    transform-origin: top;

    &::-webkit-scrollbar{
      display: none;
    }

    &-item{
      width: 100%;
      height: .44rem;
      line-height: .44rem;
      padding-left: .10rem;
      box-sizing: border-box;
    }

    &-item-active{
      @extend .menu-item;
      background-color: #EEF2FB;
    }
  }
}
</style>
