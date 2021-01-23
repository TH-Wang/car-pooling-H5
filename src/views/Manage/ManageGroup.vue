<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的管理"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <van-tabs
      :active="active"
      @change="(idx) => {active = idx}"
      color="#262626"
      title-inactive-color="#BFBFBF"
      title-active-color="#262626"
      background="#ffffff"
      line-width="52px"
      line-height="2px">
      <van-tab
        v-for="(title, value) in tabs"
        :key="value"
        class="van-tab-wrapper"
        :title="title"
      />
    </van-tabs>

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="暂无数据，请点击重试" />
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
        :record="item">
        <template v-if="active > 0" #right>
          <mini-button v-if="active === 1" @click="handleShare">分享</mini-button>
          <mini-button v-else @click="handleApply">申请</mini-button>
        </template>
      </group-item>
    </van-list>
  </div>
</template>

<script>
import { Tabs, Tab, List } from 'vant'
import { cloneDeep } from 'lodash'
import { queryGroupByUser } from '@/api'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'group-item': GroupItem,
    'mini-button': MiniButton
  },
  data: () => ({
    active: 0,
    tabs: { 0: '管理', 1: '分享', 2: '申请奖励' },
    list: []
  }),
  computed: {
    shareList () {
      return cloneDeep(this.list).reverse().map(item => {
        item.name = '渝北拼车3群'
        return item
      })
    }
  },
  methods: {
    reqApi: queryGroupByUser,
    resDataHandler (res) {
      this.account = res.data.data.account
      const data = res.data.data
      return { list: data, total: data.length }
    },
    handleShare () {
      console.log('[分享群]')
    },
    handleApply () {
      console.log('[申请奖励]')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-tab-wrapper{
  padding-top: .20rem;
  border-top: solid 1px $light-color;
}
</style>
