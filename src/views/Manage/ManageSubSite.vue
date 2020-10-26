<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="副站长管理"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 顶部标题栏 -->
    <div class="header">
      <span>副站长名称</span>
      <span>收益占比</span>
      <span>发布条数</span>
      <span>发布功能</span>
    </div>

    <!-- 列表 -->
    <manage-item
      v-for="item in list"
      :key="item.id"
      :record="item"
      v-model="item.canuse"
      @change="handleChange($event, item.id)"
    />
  </div>
</template>

<script>
import ManageItem from '@/components/ManageItem'

export default {
  components: {
    'manage-item': ManageItem
  },
  data: () => ({
    list: []
  }),
  methods: {
    handleChange (value, id) {
      console.log(`副站长${id}的权限发生变化：${value}`)
    }
  },
  mounted () {
    const arr = []
    for (let i = 0; i < 5; i++) {
      arr.push({ id: i, name: '圆脸橙', percent: '5%', published: 7, canuse: true })
    }
    this.list = arr
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: .38rem;
  padding: 0 .15rem;
  box-sizing: border-box;
  background-color: $light-color;
  @include font (.14rem, $sub-text);
  @include flex (space-between, center);
}
</style>
