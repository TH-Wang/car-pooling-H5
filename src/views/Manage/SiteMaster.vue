<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="我是群主"
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
        @click="$router.push(item.path)"
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
export default {
  data: () => ({
    menuList: [
      {
        icon: require('@/assets/icons/mine/order.png'),
        title: '我的收益',
        content: '100',
        path: '/common/my/income'
      },
      {
        icon: require('@/assets/icons/mine/link.png'),
        title: '渝北区站首页链接',
        path: ''
      },
      {
        icon: require('@/assets/icons/mine/query.png'),
        title: '拼车查询',
        path: ''
      },
      {
        icon: require('@/assets/icons/mine/add.png'),
        title: '拼车发布',
        content: '余 423',
        path: ''
      },
      {
        icon: require('@/assets/icons/mine/manage.png'),
        title: '副站长管理',
        path: ''
      },
      {
        icon: require('@/assets/icons/mine/manage.png'),
        title: '群主管理',
        path: ''
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/cell.scss';
</style>
