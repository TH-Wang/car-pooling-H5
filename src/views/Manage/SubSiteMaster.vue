<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="我是副站长"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 菜单列表 -->
    <div class="cell">
      <div
        class="cell-item"
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleLink(item.path)"
      >
        <img :src="item.icon" alt="">
        <span>{{item.title}}</span>
        <div>{{item.content}}</div>
        <van-icon name="arrow" color="#E8E8E8" size=".12rem"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getStationCode, getFreePublishTime } from '@/api'
import { isEmpty } from 'lodash'
import { mapState } from 'vuex'

export default {
  data: () => ({
    info: null,
    menuList: [
      {
        icon: require('@/assets/icons/mine/order.png'),
        title: '我的收益',
        content: '',
        path: '/common/my/income'
      },
      {
        icon: require('@/assets/icons/mine/link.png'),
        title: '首页链接',
        path: '/common/my/homelink'
      },
      {
        icon: require('@/assets/icons/mine/query.png'),
        title: '拼车查询',
        path: '/common/site/select'
      },
      {
        icon: require('@/assets/icons/mine/add.png'),
        title: '拼车发布',
        content: '余'
      }
    ]
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async handleReqCode () {
      const res = await getStationCode()
      this.info = res.data.data
      const name = this.user.info.username
      const config = this.menuList[1]
      this.$set(this.menuList, 1, { ...config, title: name + '的首页链接' })
    },
    // 获取发布数量
    async handleReqCount () {
      const res = await getFreePublishTime()
      const count = res.data.data.freeTime
      const integral = res.data.data.integral
      const config1 = this.menuList[0]
      const config2 = this.menuList[3]
      this.count = count
      this.integral = integral
      this.$set(this.menuList, 0, { ...config1, content: integral })
      this.$set(this.menuList, 3, { ...config2, content: '余 ' + count })
    },
    handleLink (path) {
      if (path || !isEmpty(path)) {
        const { code, name, shortName } = this.info
        this.$router.push({
          path,
          query: {
            code,
            addr: name,
            alias: shortName,
            type: 'subSite'
          }
        })
      }
    }
  },
  created () {
    this.handleReqCode()
    this.handleReqCount()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/cell.scss';
</style>
