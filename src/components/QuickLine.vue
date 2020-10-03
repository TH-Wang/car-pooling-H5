<template>
  <div class="container">
    <!-- 标题 -->
    <div class="header">
      <span class="title">快捷线路</span>
      <span class="tip">当前线路拼接信息</span>
      <span class="more-btn">查看更多</span>
    </div>
    <!-- 列表 -->
    <div class="list-container">
      <line-card tag="504" :tagColor="tagColor" common class="list-item" />
      <line-card tag="2304" :tagColor="tagColor" common class="list-item" />
      <line-card tag="471" :tagColor="tagColor" common class="list-item" />
      <line-card tag="471" :tagColor="tagColor" class="list-item" />
      <line-card tag="504" :tagColor="tagColor" class="list-item" />
      <line-card tag="" :tagColor="tagColor" class="list-item" />
      <line-card :tagColor="tagColor" class="list-item" />
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
    // ['yellow', 'green']
    tagColor: {
      type: String,
      default: 'yellow'
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

  .tip{
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
