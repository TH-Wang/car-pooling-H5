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
      line-height="2px"
    >
      <van-tab class="van-tab-wrapper" title="管理">
        <!-- 群列表 -->
        <group-item
          v-for="item in list"
          :key="item.id"
          :record="item"
        />
      </van-tab>
      <van-tab class="van-tab-wrapper" title="分享">
        <!-- 群列表 -->
        <group-item
          v-for="item in shareList"
          :key="item.id"
          :record="item"
        >
          <template #right>
            <mini-button @click="handleShare">分享</mini-button>
          </template>
        </group-item>
      </van-tab>
      <van-tab class="van-tab-wrapper" title="申请奖励">
        <!-- 群列表 -->
        <group-item
          v-for="item in list"
          :key="item.id"
          :record="item"
        >
          <template #right>
            <mini-button @click="handleApply">申请</mini-button>
          </template>
        </group-item>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import { cloneDeep } from 'lodash'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'group-item': GroupItem,
    'mini-button': MiniButton
  },
  data: () => ({
    active: 0,
    list: [
      { id: 0, type: 0, name: '直通车6群', people: 334 },
      { id: 1, type: 1, name: '直通车6群', people: 334 },
      { id: 2, type: 1, name: '直通车6群', people: 334 }
    ]
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
