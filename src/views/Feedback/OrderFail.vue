<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="预定"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.replace('/home')"
    />

    <van-notice-bar
      v-if="show"
      left-icon="volume-o"
      text="没有合适车辆？马上预约！"
      class="notice-bar"
    >
      <template #right-icon>
        <span class="btn" @click="$router.push('/common/appoint')">马上预约</span>
        <van-icon name="cross" class="close" @click="show = false"/>
      </template>
    </van-notice-bar>

    <!-- 反馈图标 -->
    <feedback type="fail" title="预定失败" />

    <!-- 搜索框 -->
    <search-card
      v-model="addr"
      style="margin-top: .23rem"
      type="icon-right"
    />

    <!-- 热门路线 -->
    <quick-line style="padding-bottom: .20rem" title="热门路线" tagColor="green" />
  </div>
</template>

<script>
import { NoticeBar } from 'vant'
import Feedback from '@/components/Feedback'
import SearchCard from '@/components/SearchCard'
import QuickLine from '@/components/QuickLine'

export default {
  components: {
    'van-notice-bar': NoticeBar,
    feedback: Feedback,
    'search-card': SearchCard,
    'quick-line': QuickLine
  },
  data: () => ({
    addr: {
      startAddr: null,
      endAddr: null
    },
    show: true
  }),
  mounted () {
    const { msg, startAddr, endAddr } = this.$route.params
    this.addr = { startAddr, endAddr }
    this.$dialog.alert({
      message: '对不起！' + msg
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
