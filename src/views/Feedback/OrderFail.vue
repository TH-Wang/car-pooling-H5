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
      useStore
      style="margin-top: .23rem"
      type="icon-right"
    />

    <!-- 热门路线 -->
    <quick-line
      style="padding-bottom: .20rem"
      title="热门路线"
      :dataSource="quickList"
      :query="query"
      @retry="handleRetryQuick"
    />
  </div>
</template>

<script>
import { NoticeBar } from 'vant'
import { getCommonRoute } from '@/api'
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
    show: true,
    quickList: [],
    query: { workType: 'carpool', orderType: 1, publishType: '1,2,3' }
  }),
  methods: {
    async handleReqQuick () {
      const addrName = this.position.county.name
      const data = {
        startPage: 1,
        orderType: 1,
        pageSize: 10,
        publishType: '1,2,3',
        addrName
      }
      const res = await getCommonRoute(data)
      this.quickList = res.data.data
    },
    async handleRetryQuick () {
      this.$toast.loading({
        message: '加载中',
        duration: 10000
      })
      await this.handleReqQuick()
      this.$toast.clear()
    }
  },
  mounted () {
    const { msg, startAddr, endAddr } = this.$route.params
    this.addr = { startAddr, endAddr }
    this.$dialog.alert({
      message: '对不起！' + msg
    })
    this.handleReqQuick()
  }
}
</script>

<style lang="scss" scoped>

</style>
