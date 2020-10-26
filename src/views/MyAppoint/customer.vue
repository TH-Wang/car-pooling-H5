<template>
  <div :style="show ? 'padding-top: 40px;' : ''">
    <van-notice-bar
      v-if="show"
      left-icon="volume-o"
      text="没有合适车辆？马上预约！"
      class="notice-bar"
    >
      <template #right-icon>
        <span class="btn" @click="$router.push('/common/appoint')">马上预约</span>
        <van-icon name="cross" class="close" @click="show = false"/>
      </template>
    </van-notice-bar>

    <!-- 预约订单 -->
    <hitchhike-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      type="driver"
    >
      <!-- 预约按钮 -->
      <template #button>
        <mini-button
          color="yellow"
          :orderId="item.id"
          :menu="orderMenu"
          :menuVisible="menuVisibleId === item.id"
          @click="handleClickReserve"
          @cancel="handleOrderCancel"
        >确认预约</mini-button>
      </template>
    </hitchhike-order>
  </div>
</template>

<script>
import { NoticeBar } from 'vant'
import HitchhikeOrder from '@/components/OrderItem/Hitchhike'
import MiniButton from '@/components/MiniButton'
import ButtonMenuMixin from '@/mixins/button-menu-mixin'

export default {
  mixins: [ButtonMenuMixin],
  components: {
    'van-notice-bar': NoticeBar,
    'hitchhike-order': HitchhikeOrder,
    'mini-button': MiniButton
  },
  data: () => ({
    // 显示公告栏
    show: true,
    list: new Array(3).fill({}).map((e, idx) => ({ id: `${Date.now()}-${idx}` })),
    menuVisibleId: null,
    orderMenu: [
      { type: 'cancel', text: '取消预约' },
      { type: 'report', text: '举报' }
    ]
  }),
  methods: {
    handleClickReserve (e) {
      console.log('[点击预约]')
      this.menuVisibleId = this.menuVisibleId === e.id ? null : e.id
    },
    // 取消预约
    handleOrderCancel (e) {
      console.log('[弹出取消菜单]', e)
      // this.$refs.cancelLayer.show()
    }
  }
}
</script>

<style lang="scss" scoped>
// 顶部通知栏
.notice-bar{
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
  top: 90px;
  left: 0;
}

.btn{
  height: 100%;
  display: flex;
  align-items: center;
}
.close{
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
</style>
