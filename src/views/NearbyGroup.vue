<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav-bar-search mode="dark" button>
      <template #right>
        重庆 · 渝北区 <van-icon name="arrow-down" />
      </template>
    </nav-bar-search>

    <!-- 占位符 -->
    <div style="height: 50px"></div>

    <!-- 顶部标题 -->
    <div class="header">
      <img class="header-icon" src="@/assets/icons/location.png" alt="">
      <div class="header-title">附近的群</div>
      <div class="header-link">查看更多</div>
    </div>

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
  </div>
</template>

<script>
import { Icon } from 'vant'
import NavBarSearch from '@/components/NavBarSearch'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'

export default {
  components: {
    'van-icon': Icon,
    'nav-bar-search': NavBarSearch,
    'group-item': GroupItem,
    'mini-button': MiniButton
  },
  data: () => ({
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
.header{
  @include flex (space-between, center);
  padding: .20rem .15rem;

  &-icon{
    width: 0.2rem;
    height: 0.2rem;
  }

  &-title{
    flex: 1;
    @include font (.18rem, $main-text, bold);
    margin: 0 .1rem;
  }

  &-link{
    @include font (.12rem, $main-color);
    margin-bottom: -0.03rem;
  }
}

.price-prefix::before{
  content: '￥';
  margin-right: -2px;
  font-size: .15rem;
}
</style>
