<template>
  <div class="transparent-nav-page">
    <!-- 搜索框导航栏 -->
    <nav-bar-search :mode="navbarMode" button @click-search="handleClickSearch">
      <template #right>定位城市</template>
    </nav-bar-search>

    <!-- 背景 -->
    <div class="background"></div>

    <van-tabs
      v-model="tabId"
      color="#fff"
      title-inactive-color="#fafafa"
      title-active-color="#fff"
      background="transparent"
      line-width="52px"
      line-height="2px"
    >
      <van-tab title="车主信息">

        <carry-dri />

      </van-tab>
      <van-tab title="乘客信息">

        <carry-cus />

      </van-tab>
    </van-tabs>

    <!-- 取消预约弹出层 -->
    <cancel-reserve-layer ref="cancelLayer" @submit="handleCancelSubmit" />
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import CarryDri from './CarryDri'
import CarryCus from './CarryCus'
import NavBarSearch from '@/components/NavBarSearch'
import CancelReserveLayer from '@/components/Layer/CancelReserve'
import NavbarMixin from '@/mixins/navbar-mixin'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'

export default {
  // NavbarMixin 负责导航栏状态变化
  // ListMixin 负责筛选，以及列表动态加载
  mixins: [NavbarMixin, ButtonMenuMixin],
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'nav-bar-search': NavBarSearch,
    'carry-dri': CarryDri,
    'carry-cus': CarryCus,
    'cancel-reserve-layer': CancelReserveLayer
  },
  data: () => ({
    tabId: 0
  }),
  methods: {
    handleClickSearch () {
      console.log('click search')
    },
    // 取消预约
    handleOrderCancel (e) {
      console.log('[弹出取消菜单]', e)
      this.$refs.cancelLayer.show()
    },
    // 提交取消预约事件
    handleCancelSubmit (e) {
      console.log('[取消预约]', e)
      const _this_ = this
      // 隐藏选项菜单
      this.$refs.cancelLayer.hidden()
      setTimeout(() => {
        _this_.$toast.success('取消成功')
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';

.search-card-wrap{
  padding-top: .10rem;
  margin-bottom: .10rem;
  border-top: solid 1px rgba($color: #fff, $alpha: 0.6);
}
</style>
