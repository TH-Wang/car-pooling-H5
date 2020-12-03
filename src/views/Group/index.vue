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
        <span @click="$router.push('/common/city')">{{location}}</span>
        <van-icon name="arrow" />
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

    <!-- 如果群列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="未搜索到附近的拼车群" />
    </div>
    <!-- 群列表 -->
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="handleListLoad"
      class="list-container"
    >
      <group-item
        v-for="item in list"
        :key="item.id"
        :record="item"
        @click="handleLink($event, item.id)"
      > <template #right>
          <mini-button>
            <span :class="priceClass(item.price)">{{priceText(item.price)}}</span>
          </mini-button>
        </template>
      </group-item>
    </van-list>

    <!-- 固定按钮 -->
    <affix
      icon="group"
      :content="affixContent"
      @click="$router.push('/common/settle/group')"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { List } from 'vant'
import { selectGroup } from '@/api'
import NavBarSearch from '@/components/NavBarSearch'
import ScrollTabs from '@/components/ScrollTabs'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'
import Affix from '@/components/Affix'
import ListMixin from '@/mixins/list-mixin'
import { priceClass, priceText } from './utils'

export default {
  name: 'Group',
  mixins: [ListMixin],
  components: {
    'nav-bar-search': NavBarSearch,
    'scroll-tabs': ScrollTabs,
    'van-list': List,
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
    affixContent: ''
  }),
  computed: {
    ...mapState(['user']),
    ...mapGetters(['location'])
  },
  methods: {
    // 请求拼车群列表的api函数
    reqApi: selectGroup,
    // 自己处理返回值
    resDataHandler (res) {
      const { rows, total } = res.data
      return { list: rows, total }
    },
    // 价格的前缀样式
    priceClass,
    // 价格的前缀样式
    priceText,
    handleLink (e, id) {
      this.$router.push({ path: '/common/group/detail', query: { id } })
    }
  },
  created () {
    this.affixContent = this.user.info.group === 'YES'
      ? '入驻新群'
      : '我是群主 我要入驻'
  }
}
</script>

<style lang="scss" scoped>

.price-prefix::before{
  content: '￥';
  margin-right: -2px;
  font-size: .15rem;
}

.banner{
  width: 3.45rem;
  height: .88rem;
  margin: 0 auto;
  margin-top: .15rem;
  background-color: #f7f7f7;
  border-radius: .05rem;
}
</style>
