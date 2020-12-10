<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="途径点" fixed
      placeholder left-arrow :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 已选择的途径点列表 -->
    <div class="tip-title">已选择途径点</div>
    <div v-for="(item, index) in release.passPointList" :key="item.id" class="index-cell">
      <span>{{index+1}} {{item.name}}</span>
      <van-icon name="cross" color="#DADADA" @click="handleRemovePoint(index)" />
    </div>
    <div class="add-button" @click="handleOpenSearch">添加途径点...</div>

    <!-- 确认按钮 -->
    <main-button
      width="3.15rem" style="margin-top:.3rem"
      center @click="$router.go(-1)"
    >保存</main-button>

    <!-- 搜索面板 -->
    <transition name="van-slide-up">
      <place-search
        v-show="searchVisible"
        ref="placeSearch"
        @search="handleAddPoint"
        @close="searchVisible = false"
      />
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import PlaceSearch from '@/components/PlaceSearch'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'place-search': PlaceSearch,
    'main-button': MainButton
  },
  data: () => ({
    searchVisible: false
  }),
  computed: {
    ...mapState(['release'])
  },
  methods: {
    ...mapMutations(['updatePassPoint']),
    // 打开搜索面板
    handleOpenSearch () {
      this.$refs.placeSearch.clear()
      this.searchVisible = true
    },
    // 添加途径点
    handleAddPoint (record) {
      const added = this.release.passPointList.find(i => i.id === record.id)
      if (added) {
        this.$toast({ message: '该地点已添加' })
        return
      }
      this.updatePassPoint({ type: 'add', record })
    },
    // 删除途径点
    handleRemovePoint (index) {
      this.updatePassPoint({ type: 'remove', index })
    }
  }
}
</script>

<style lang="scss" scoped>
.tip-title{
  @include font (.14rem, $sub-text);
  padding-left: .15rem;
  box-sizing: border-box;
  margin: .20rem 0 .05rem;
}

.index{
  text-align: left;

  &::-webkit-scrollbar{
    display: none;
  }

  &-anchor{
    background-color: $light-color;
  }

  &-cell{
    padding: 0 .15rem;
    height: .48rem;
    line-height: .48rem;
    box-sizing: border-box;
    background-color: $light-color;
    @include font (.16rem, $main-text);
    @include flex (space-between, center);

    &:active{
      background-color: #f5f5f5;
    }
  }
}

.add-button{
  padding: 0 .15rem;
  height: .48rem;
  line-height: .48rem;
  box-sizing: border-box;
  background-color: $light-color;
  @include font (.16rem, $main-color);
}
</style>
