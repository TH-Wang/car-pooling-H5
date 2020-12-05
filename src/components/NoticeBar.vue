<template>
  <transition name="van-fade">
    <van-notice-bar
      v-if="show"
      left-icon="volume-o"
      text="没有合适车辆？马上预约！"
      class="container"
      :style="positionStyle"
    >
      <template #right-icon>
        <span class="btn" @click="handleRelease">马上预约</span>
        <van-icon name="cross" class="close" @click="show = false"/>
      </template>
    </van-notice-bar>
  </transition>
</template>

<script>
import { NoticeBar, Icon } from 'vant'

export default {
  components: {
    'van-icon': Icon,
    'van-notice-bar': NoticeBar
  },
  props: {
    position: {
      type: String,
      default: 'bottom'
    },
    limit: {
      type: String,
      default: '0'
    }
  },
  data: () => ({
    show: true
  }),
  computed: {
    positionStyle () {
      return `${this.position}: ${this.limit}`
    }
  },
  methods: {
    handleRelease () {
      this.$router.push('/release')
      this.$store.commit('changeTabsId', { type: 'release', index: 1 })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  z-index: 10;
}

.btn{
  height: 100%;
  display: flex;
  align-items: center;
}
.close{
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
</style>
