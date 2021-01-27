<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="我是站长"
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

export default {
  data: () => ({
    info: {},
    count: null,
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
      },
      {
        icon: require('@/assets/icons/mine/manage.png'),
        title: '副站长管理',
        path: '/common/manage/subsite'
      },
      {
        icon: require('@/assets/icons/mine/manage.png'),
        title: '群主管理',
        path: '/common/manage/groupmaster'
      }
    ]
  }),
  methods: {
    // 获取区域信息
    async handleReqCode () {
      const res = await getStationCode()
      this.info = res.data.data
      const name = this.info.name
      const config = this.menuList[1]
      this.$set(this.menuList, 1, { ...config, title: name + '站首页链接' })
    },
    // 获取发布数量
    async handleReqCount () {
      const res = await getFreePublishTime()
      const count = res.data.data.freeTime
      const config = this.menuList[3]
      this.count = count
      this.$set(this.menuList, 3, { ...config, content: '余 ' + count })
    },
    handleLink (path) {
      if (path || !isEmpty(path)) {
        const { code, name, shortName } = this.info
        this.$router.push({ path, query: { code, addr: name, alias: shortName } })
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
