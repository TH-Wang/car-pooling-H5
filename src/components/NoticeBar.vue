<template>
  <transition name="van-fade">
    <van-notice-bar
      v-if="show"
      left-icon="volume-o"
      text="没有合适车辆？马上预约！"
      class="container"
    >
      <template #right-icon>
        <span class="btn" @click="$emit('reserve')">马上预约</span>
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
  data: () => ({
    show: true
  })
}
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
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
