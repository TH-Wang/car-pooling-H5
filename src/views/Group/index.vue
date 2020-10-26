<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav-bar-search
      mode="dark"
      button
      :backIcon="false"
      @click-search="$router.push('/common/group/search')"
    >
      <template #left>
        重庆 · 渝北区 <van-icon name="arrow" />
      </template>
      <template #right>
        <van-icon name="service" size=".18rem" />
      </template>
    </nav-bar-search>

    <!-- 占位符 -->
    <div style="height:50px"></div>

    <!-- banner -->
    <div class="banner"></div>

    <!-- tabs -->
    <scroll-tabs :tabs="tabs" v-model="tabsId" />

    <!-- 群列表 -->
    <group-item
      v-for="item in list"
      :key="item.id"
      :record="item"
      @click="handleLink"
    >
      <template #right>
        <mini-button>
          <span :class="item.price==='免费'?'':'price-prefix'">{{item.price}}</span>
        </mini-button>
      </template>
    </group-item>

    <!-- 固定按钮 -->
    <affix
      icon="group"
      content="我是群主 我要入驻"
      @click="$router.push('/common/settle/group')"
    />
  </div>
</template>

<script>
import NavBarSearch from '@/components/NavBarSearch'
import ScrollTabs from '@/components/ScrollTabs'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'
import Affix from '@/components/Affix'

export default {
  components: {
    'nav-bar-search': NavBarSearch,
    'scroll-tabs': ScrollTabs,
    'group-item': GroupItem,
    'mini-button': MiniButton,
    affix: Affix
  },
  data: () => ({
    tabsId: 0,
    tabs: [
      { id: 0, title: '附近拼车群' },
      { id: 1, title: '最新拼车群' },
      { id: 2, title: '专线拼车群' },
      { id: 3, title: '创建拼车群' },
      { id: 4, title: '创建拼车群' }
    ],
    list: [
      { id: 0, type: 0, name: '直通车6群', people: 334, price: '5.00' },
      { id: 1, type: 1, name: '直通车6群', people: 334, price: '5.00' },
      { id: 2, type: 1, name: '直通车6群', people: 334, price: '免费' }
    ]
  }),
  methods: {
    handleLink ({ id }) {
      this.$router.push({ path: '/common/group/detail', query: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>

.banner{
  width: 3.45rem;
  height: .88rem;
  margin: 0 auto;
  margin-top: .15rem;
  background-color: #f7f7f7;
  border-radius: .05rem;
}
</style>
