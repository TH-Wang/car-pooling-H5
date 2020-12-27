<template>
  <div class="tabbar">
    <div
      v-for="(item, index) in tabbarConfig"
      :key="index"
    >
      <!-- 中间按钮 -->
      <div
        v-if="item.middle"
        class="tabbar-item"
        @click="handleChangeTabbar($event, {path: item.path, index})">
        <div class="middle"><van-icon name="plus"/></div>
      </div>

      <!-- 普通tabbar -->
      <div
        v-else
        class="tabbar-item"
        @click="handleChangeTabbar($event, {path: item.path, index})">
        <img :src="tabbarId === index ? item.activeIcon : item.icon" alt="">
        <span :class="`title${tabbarId === index ? '-active' : ''}`">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
import { throttle } from 'lodash'
import tabbarConfig from '@/configs/tabbar'
import EventBus from '@/utils/eventBus'
import { mapState } from 'vuex'
// import confirmLogin from '@/utils/confirmLogin'

const iconFile = name => require(`@/assets/icons/index/${name}.png`)
const iconConfig = {
  refresh: iconFile('refresh'),
  home: iconFile('home-active')
}

// 距离顶部多少时，首页显示刷新图标
const limit = 300

export default {
  components: {
    'van-icon': Icon
  },
  data: () => ({
    tabbarConfig,
    scrollTop: 0
  }),
  computed: {
    ...mapState(['user']),
    tabbarId () {
      return this.$store.state.tabbar.tabbarId
    }
  },
  methods: {
    async handleChangeTabbar (e, { index, path }) {
      // 如果是点击刷新，触发首页刷新
      if (this.tabbarId === 0 && index === 0 && this.scrollTop > limit) {
        window.scrollTo(0, 0)
        EventBus.$emit('home-refresh')
      }
      // 如果点击的是发布，并且没有登录
      console.log(index)
      if (index === 2 && !this.user.token) {
        this.$dialog.confirm({
          message: '尊敬的用户，您还未登录，登录后即可发布拼车信息',
          confirmButtonText: '立即登录',
          cancelButtonText: '稍后再等'
        }).then(() => {
          this.$router.push('/common/login')
        })
        return
      }
      this.$store.commit('changeTabbar', { index, path })
      this.$router.push({ path })
    },
    // 监听页面滚动事件
    handleWatchScroll: throttle(function (e) {
      // 如果不是首页，则直接返回
      if (this.tabbarId !== 0) return
      // 判断是否距离顶部200px，处理对应的图标
      const scrollTop = e ? e.srcElement.scrollingElement.scrollTop : document.body.scrollTop
      const iconName = scrollTop > limit ? 'refresh' : 'home'
      const newConfig = Object.assign(
        tabbarConfig[0],
        { activeIcon: iconConfig[iconName] }
      )
      this.tabbarConfig.splice(0, 1, newConfig)
      this.scrollTop = scrollTop
    }, 300)
  },
  created () {
    window.addEventListener('scroll', this.handleWatchScroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleWatchScroll, false)
  },
  watch: {
    tabbarId: function (newVal) {
      if (newVal === 0) this.handleWatchScroll()
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar{
  width: 100%;
  height: 55px;
  background: white;
  box-shadow: 0 0px 15px 0 rgba($color: #000000, $alpha: 0.08);
  position: fixed;
  bottom: 0;
  z-index: 1001;
  @include flex (space-around, center);

  &-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
      width: 24px;
      height: 24px;
      margin-bottom: 2px;
    }

    .title{
      @include font (10px, $tip-text);
    }

    .title-active{
      @extend .title;
      color: $main-text;
    }

    // 中间图标
    .middle{
      width: 45px;
      height: 45px;
      border-radius: 50%;
      transform: translateY(-2px);
      background-color: $main-color;
      box-shadow: 0 0 12px 0 rgba($color: $main-color, $alpha: 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      @include font (28px, #fff, bold);
    }
  }
}
</style>
