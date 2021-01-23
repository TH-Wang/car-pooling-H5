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
        <van-icon name="cross" class="close" @click="$emit('change', false)"/>
      </template>
    </van-notice-bar>
  </transition>
</template>

<script>
import { NoticeBar, Icon } from 'vant'
import { mapState } from 'vuex'

export default {
  components: {
    'van-icon': Icon,
    'van-notice-bar': NoticeBar
  },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom'
    },
    limit: {
      type: String,
      default: '0'
    }
  },
  computed: {
    ...mapState(['user']),
    positionStyle () {
      return `${this.position}: ${this.limit}`
    }
  },
  methods: {
    handleRelease () {
      // 判断是否登录
      if (!this.user.token) {
        this.$dialog.confirm({
          message: '尊敬的用户，您还未登录，登录后即可发布预约信息',
          confirmButtonText: '立即登录',
          cancelButtonText: '稍后再登'
        }).then(() => {
          this.$router.push('/common/login')
        })
        return
      }
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
  z-index: 9;
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
