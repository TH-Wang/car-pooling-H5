<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="line-text">
          <div class="start ellipsis">重庆北站</div>
          <img class="arrow" src="@/assets/icons/line-arrow.png" alt="">
          <div class="end ellipsis">重庆西站</div>
        </div>
      </template>
    </van-nav-bar>

    <!-- 过滤下拉菜单 -->
    <order-filter />

    <!-- 拼单列表 -->
    <van-list
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
        @click="handleLinkDetail"
      >
        <template #button>
          <mini-button
            color="yellow"
            :orderId="item.id"
            @click="handleClickOrderButton"
          >立即预订</mini-button>
        </template>
      </carpool-order>
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant'
import { OrderFilter } from '@/components/Filter/index.js'
import CarpoolOrder from '@/components/OrderItem/Carpool'
import ListMixin from '@/mixins/list-mixin'
import MiniButton from '@/components/MiniButton'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'order-filter': OrderFilter,
    'carpool-order': CarpoolOrder,
    'mini-button': MiniButton
  },
  methods: {
    // 进入详情页面
    handleLinkDetail () {
      this.$router.push('/common/order/detail')
    },
    // 点击订单按钮
    handleClickOrderButton (e) {
      console.log('[点击mini按钮]', e)
    }
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
