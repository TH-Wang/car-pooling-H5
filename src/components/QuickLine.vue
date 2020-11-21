<template>
  <div class="container">
    <!-- 标题 -->
    <div class="header">
      <span class="title">{{title}}</span>
      <span v-if="showLink" class="header-tip">当前线路拼接信息</span>
      <span v-if="showLink" class="more-btn" @click="$emit('link-more')">查看更多</span>
    </div>

    <!-- 如果列表数据为空 -->
    <div v-if="dataSource.length === 0" @click="$emit('retry')">
      <van-empty description="暂无快捷路线，请点击重试" />
    </div>
    <!-- 列表 -->
    <div class="list-container">
      <line-card
        class="list-item"
        v-for="item in dataSource"
        :key="item.id"
        tag="504"
        :tagColor="tagColor"
        common
        @click="$router.push('/common/searchline/list')"
      />
    </div>
  </div>
</template>

<script>
import LineCard from './LineCard'

export default {
  components: {
    'line-card': LineCard
  },
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
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
    showLink: {
      type: Boolean,
      default: true
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
