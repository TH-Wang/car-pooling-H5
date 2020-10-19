<template>
  <div class="tabbar">
    <router-link
      v-for="(item, index) in tabbarConfig"
      :key="index"
      :to="item.path"
    >
      <!-- 中间按钮 -->
      <div v-if="item.middle" class="tabbar-item" @click="handleChangeTabbar($event, index)">
        <div class="middle"><van-icon name="plus"/></div>
      </div>

      <!-- 普通tabbar -->
      <div v-else class="tabbar-item" @click="handleChangeTabbar($event, index)">
        <img :src="tabbarId === index ? item.activeIcon : item.icon" alt="">
        <span :class="`title${tabbarId === index ? '-active' : ''}`">{{item.title}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { Icon } from 'vant'
import tabbarConfig from '@/configs/tabbar'

export default {
  components: {
    'van-icon': Icon
  },
  data: () => ({
    tabbarConfig
  }),
  computed: {
    tabbarId () {
      return this.$store.state.tabbar.tabbarId
    }
  },
  methods: {
    handleChangeTabbar (e, idx) {
      this.$store.commit('changeTabbar', idx)
    }
  },
  beforeRouteUpdate: function (to, from, next) {
    console.log(to)
  }
}
</script>

<style lang="scss" scoped>
.tabbar{
  width: 100%;
  height: 55px;
  background: white;
  box-shadow: 0 0px 15px 0 rgba($color: #000000, $alpha: 0.08);
  position: fixed;
  bottom: 0;
  z-index: 999999;
  @include flex (space-around, center);

  &-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
      width: 24px;
      height: 24px;
      margin-bottom: 2px;
    }

    .title{
      @include font (10px, $tip-text);
    }

    .title-active{
      @extend .title;
      color: $main-text;
    }

    // 中间图标
    .middle{
      width: 45px;
      height: 45px;
      border-radius: 50%;
      transform: translateY(-2px);
      background-color: $main-color;
      box-shadow: 0 0 12px 0 rgba($color: $main-color, $alpha: 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      @include font (28px, #fff, bold);
    }
  }
}
</style>
