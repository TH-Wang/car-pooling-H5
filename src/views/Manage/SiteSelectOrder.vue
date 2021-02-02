<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
      :title="addr"
    >
      <!-- <template #title>
        <div class="line-text">
          <div class="start ellipsis">{{addrName.start}}</div>
          <img class="arrow" src="@/assets/icons/line-arrow.png" alt="">
          <div class="end ellipsis">{{addrName.end}}</div>
        </div>
      </template> -->
    </van-nav-bar>

    <!-- 过滤下拉菜单 -->
    <order-filter v-model="filters" @change="handleFilterChange"/>

    <!-- 如果列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="未搜索到结果~" />
    </div>
    <!-- 拼单列表 -->
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
      <carpool-order
        v-for="(item, index) in list"
        :key="index"
        :record="item"
      >
        <template #button>
          <mini-button
            color="yellow"
            :orderId="item.id"
            @click="copyToClip(item)"
          >复制</mini-button>
        </template>
      </carpool-order>
    </van-list>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { List } from 'vant'
import { getCar, getShortLinkUrl } from '@/api'
import { OrderFilter } from '@/components/Filter/index.js'
import CarpoolOrder from '@/components/OrderItem/Carpool'
import MiniButton from '@/components/MiniButton'
import ListMixin from '@/mixins/list-mixin'
import { shareip } from '@/configs/sharePort'
import copyToClip from '@/utils/copyToClip'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'order-filter': OrderFilter,
    'carpool-order': CarpoolOrder,
    'mini-button': MiniButton
  },
  data: () => ({
    dataSource: {},
    addr: ''
  }),
  computed: {
    ...mapState(['position', 'search']),
    addrName () {
      const { startAddrAll, endAddrAll } = this.dataSource
      return { start: startAddrAll, end: endAddrAll }
    }
  },
  methods: {
    reqApi: getCar,
    // 在发起请求之前会自动调用该函数，获取请求所需的主要数据（除页码、每页数量之外）
    getRequestDatas () {
      const cityname = this.addr
      const data = {
        publishType: '1,2,3',
        orderType: 1,
        cityname
      }
      return data
    },
    // 复制到剪切板
    async copyToClip (item) {
      const content = await this.getCopyContent(item)
      copyToClip(content)
    },
    // 复制内容
    async getCopyContent (item) {
      const { publish, passPointList } = item
      const { startTime, remark } = publish
      // 时间
      const formatTime = moment(startTime).format('MM月DD日 HH:mm')
      // 途径
      const passList = passPointList.filter(i => i.type === 2).map(i => i.pointName).join('-')
      // 起止点
      const startAddr = passPointList.find(i => i.type === 1).pointName
      const endAddr = passPointList.find(i => i.type === 3).pointName
      // 预约
      const link = shareip + '/common/triplink/driver?id=' + this.orderId
      const url = await getShortLinkUrl(link)
      return '【拼车】车找人\n' +
        '【路线】' + startAddr + '-' + endAddr + '\n' +
        '【途径】' + (passList || '无') + '\n' +
        '【时间】' + formatTime + '\n' +
        '【预约】' + url + '\n' +
        '【备注】' + (remark || '无')
    }
  },
  created () {
    this.addr = this.$route.query.addr
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
// 路线
.line-text{
  display: flex;
  align-items: center;
  color: $main-text;
  font-size: .16rem;
  font-weight: bold;
  text-align: left;

  .arrow{
    width: .18rem;
    margin: 0 .06rem;
  }
  .start{text-align: right;}
  .end{text-align: left;}
}
</style>
