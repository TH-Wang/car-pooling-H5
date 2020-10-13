<template>
  <div :class="`nav-bar theme-${mode}`">
    <!-- 返回箭头 -->
    <van-icon v-if="backIcon" class="icon" name="arrow-left" @click="handleGoBack" />

    <!-- 左侧slot -->
    <div class="left-slot" @click="$emit('click-left')">
      <slot name="left" />
    </div>

    <!-- 搜索框 -->
    <div class="search" @click="$emit('click-search')">
      <van-icon class="search-icon" name="search" />
      <div class="input-box">
        <span v-if="button">搜索城市名称查询</span>
        <input
          v-else
          type="text"
          placeholder="请输入城市名称查询"
          @input="handleSearchInput"
        />
      </div>
    </div>

    <!-- 当前地址 -->
    <div class=".right-slot" @click="$emit('click-right')">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: {
    'van-icon': Icon
  },
  props: {
    backIcon: {
      type: Boolean,
      default: true
    },
    button: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    // ['light', 'dark']
    mode: {
      type: String,
      default: 'light'
    }
  },
  methods: {
    // 返回上一页
    handleGoBack () {
      this.$router.go(-1)
    },
    // 搜索事件
    handleSearchInput (e) {
      this.$emit('search', { value: e.target.value })
    }
  }
}
</script>

<style lang="scss" scoped>
// 主题色
.theme-light{
  color: #fff;
  background-color: transparent;

  .search{
    background-color: rgba(250, 250, 250, .5);
  }
}
.theme-dark{
  color: #262626;
  background-color: #fff;
  box-shadow: 0 0 15px 0 rgba(50, 50, 50, 0.05);

  .search{
    background-color: rgba(250, 250, 250, 1);
  }
}

.nav-bar{
  width: 100vw;
  height: 50px;
  padding: 0 .15rem 0 .12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: all 0.2s;

  .icon{
    font-size: 22px;
    flex-shrink: 0;
  }

  .search{
    flex: 1;
    height: 36px;
    border-radius: 5px;
    padding: 0 13px;
    margin: 0 15px 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-icon{
      flex-shrink: 0;
      font-size: 16px;
    }

    .input-box{
      flex: 1;
      font-size: 14px;
      padding-left: 6px;
      text-align: left;

      input{
        width: 100%;
        display: block;
        height: 36px;
        line-height: 36px;
        border: none;
        background-color: transparent;
      }
    }
  }

  .left-slot, .right-slot{
    flex-shrink: 0;
    @include flex ($align: center);
    font-size: .15rem;
  }
}
</style>
