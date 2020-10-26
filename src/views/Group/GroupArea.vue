<template>
  <div>
    <!-- 搜索框导航栏 -->
    <nav-bar-search mode="dark"/>

    <!-- 顶部地区显示栏 -->
    <div class="area">
      <div class="area-title">
        <span>重庆</span>
        <van-icon class="icon" name="arrow" size=".12rem" color="#BFBFBF" />
        <span>重庆</span>
        <van-icon class="icon" name="arrow" size=".12rem" color="#BFBFBF" />
        <span>渝北区</span>
      </div>
      <div class="switch-button">切换</div>
    </div>

    <!-- 群列表 -->
    <group-item
      v-for="item in list"
      :key="item.id"
      :record="item"
      @click="$router.push('/common/group/detail')"
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
import NavBarSearch from '@/components/NavBarSearch'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'

export default {
  components: {
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
  })
}
</script>

<style lang="scss" scoped>
.area{
  margin-top: 46px;
  padding: .20rem .15rem;
  box-sizing: border-box;
  @include flex($align: center);

  &-title{
    flex: 1;
    margin-right: .20rem;
    @include font (.18rem, $main-text, bold);
    @include flex ($align: center);

    .icon{
      margin: 0 .10rem;
    }
  }

  .switch-button{
    flex-shrink: 0;
    @include font (.12rem, $main-color);
  }
}
</style>
