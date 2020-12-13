<template>
  <div class="container">
    <!-- 标题 -->
    <div class="header">
      <span class="title">{{title}}</span>
      <span v-if="showLink" class="header-tip">当前线路拼接信息</span>
      <span v-if="showLink" class="more-btn" @click="handleLinkMore">查看更多</span>
    </div>

    <!-- 如果列表数据为空 -->
    <div v-if="dataSource.length === 0" @click="$emit('retry')">
      <van-empty description="暂无快捷路线，可点击重试" />
    </div>
    <!-- 列表 -->
    <div class="list-container" v-else>
      <line-card
        class="list-item"
        v-for="item in dataSource"
        :key="item.id"
        :record="item"
        :tagColor="tagColor"
        common
        @click="handleClick($event, item)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import LineCard from './LineCard'

export default {
  components: {
    'line-card': LineCard
  },
  props: {
    // 数据列表
    dataSource: {
      type: Array,
      default: () => ([])
    },
    query: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: '快捷路线'
    },
    // ['yellow', 'green']
    tagColor: {
      type: String,
      default: 'yellow'
    },
    // 展示tip和链接按钮
    showLink: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['identity'])
  },
  methods: {
    // 搜索快捷路线的拼车单
    handleClick (e, record) {
      const params = cloneDeep(this.query)
      if ('publishType' in params) delete params.publishType
      const { pname, cityname, startAddr, startAddrAll, endAddr, endAddrAll, startLon, startLat, endLon, endLat } = record
      const query = {
        pname,
        cityname,
        startAddr,
        startAddrAll,
        endAddr,
        endAddrAll,
        startAddrLon: startLon,
        startAddrLat: startLat,
        endAddrLon: endLon,
        endAddrLat: endLat,
        ...params
      }
      this.$router.push({ path: '/common/searchline/list', query })
    },
    // 点击查看更多
    handleLinkMore () {
      const { query } = this
      this.$router.push({
        path: '/common/quick/list',
        query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 顶部标题
.header{
  padding: 0.15rem 0.15rem 0 0.15rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.12rem;

  .title{
    flex-shrink: 0;
    font-size: 0.18rem;
    font-weight: bold;
    margin-right: 0.05rem;
    color: $main-text;
  }

  &-tip{
    flex: 1;
    color: $tip-text;
    text-align: left;
  }

  .more-btn{
    color: $main-color;
  }
}

// 列表
.list-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
