<template>
  <div class="container" :style="`height: ${height}`">
    <!-- 左侧导航栏 -->
    <div class="scroll-nav-bar">
      <div
        v-for="(item, index) in list"
        :key="item.title + index"
        :class="`scroll-nav-item${active === index ? '-active' : ''}`"
        @click="handleClickNavBar($event, index)"
      >{{item.title}}</div>
    </div>
    <!-- 右侧列表 -->
    <div id="container" ref="container" class="scroll-body">
      <div
        v-for="(item, index) in list"
        :key="item.title + index"
        :ref="`${scrollKey}${index}`"
        class="scroll-body-item"
      >
        <!-- 标题 -->
        <div
          class="scroll-body-title"
        >{{item.title}}</div>
        <slot :list="item.list"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle, sortedIndex } from 'lodash'

export default {
  props: {
    list: Array,
    height: {
      type: String,
      default: '100%'
    },
    scrollKey: {
      type: String,
      default: 'body'
    }
  },
  data: () => ({
    active: 0,
    scrollTopList: [],
    scrolling: false,
    timer: null
  }),
  methods: {
    // 点击左侧导航栏
    handleClickNavBar (e, idx) {
      this.active = idx
      this.scrolling = true
      this.$refs.container.scrollTo(0, this.scrollTopList[this.active])
      setTimeout(() => {
        this.scrolling = false
      }, 200)
    },
    // 监听容器滚动
    handleScroll: throttle(function (e) {
      if (this.scrollTopList.length > 0 && !this.scrolling) {
        const now = e.target.scrollTop
        const active = sortedIndex(this.scrollTopList, now)
        this.active = active < 0 ? 0 : active - 1
      }
    }, 300)
  },
  mounted () {
    this.$refs.container.addEventListener('scroll', this.handleScroll, false)
  },
  updated () {
    // 获取所有元素离容器顶部的距离
    if (this.scrollTopList.length === 0) {
      const len = this.list.length
      const parentOffsetTop = this.$refs.container.offsetTop
      for (let i = 0; i < len; i++) {
        const itemDOM = this.$refs[`${this.scrollKey}${i}`][0]
        this.scrollTopList.push(itemDOM.offsetTop - parentOffsetTop)
      }
      console.log(this.scrollTopList)
    }
  },
  beforeDestroy () {
    this.$refs.container.removeEventListener('scroll', this.handleScroll, false)
  }
}
</script>

<style lang="scss" scoped>
.container{
  @include flex ();

  .scroll-nav-bar{
    flex-shrink: 0;
    width: 1.05rem;
    height: 100%;
    overflow-y: scroll;
    background-color: #f5f5f5;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar{
      display: none;
    }
  }
  .scroll-nav-item{
    height: .50rem;
    padding: 0 .10rem;
    box-sizing: border-box;
    text-align: center;
    @include flex (center, center);
    @include font (.13rem, $main-text);

    &-active{
      @extend .scroll-nav-item;
      @include font (.15rem, $main-color, bold);
      background-color: #fff;
    }
  }

  .scroll-body{
    flex: 1;
    height: 100%;
    overflow-y: scroll;

    &-title{
      height: .36rem;
      line-height: .36rem;
      padding-left: .15rem;
      background-color: #fff;
      @include font (.15rem, $main-text);
      position: sticky;
      top: 0;
      right: 0;
      z-index: 5;
    }
  }
}
</style>
