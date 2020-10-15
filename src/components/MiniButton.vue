<template>
  <!--
      className = MINI_BUTTON_MENU_SAFENODE: 下拉菜单的安全node节点
      详见 list-mixin 的 mouted
  -->
  <div class="button-container">
    <!-- 按钮主体 -->
    <div
      :class="`button-${color} MINI_BUTTON_MENU_SAFENODE`"
      @click="$emit('click', {id: orderId})"
    >

      <!-- 按钮文本内容 -->
      <slot></slot>

      <!-- 下拉箭头 -->
      <van-icon
        v-if="showMenu"
        name="arrow-down"
        size="0.12rem"
        class="MINI_BUTTON_MENU_SAFENODE"
        style="margin-left: .05rem"
      />
    </div>

    <!-- 操作菜单 -->
    <transition name="slide">
      <div v-if="showMenu" v-show="menuVisible" class="handle-menu">
        <div
          class="meun-item MINI_BUTTON_MENU_SAFENODE"
          v-for="(item, index) in menu"
          :key="index"
          @click="$emit(item.type, {id: orderId})"
        >
          <img v-if="item.type === 'cancel'" src="../assets/icons/order/cancel-emoji.png" />
          <img v-else-if="item.type === 'report'" src="../assets/icons/order/report-emoji.png" />
          {{item.text}}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: {
    'van-icon': Icon
  },
  props: {
    orderId: {
      type: [String, Number]
    },
    // ['yellow', 'green', 'blue']
    color: {
      type: String,
      default: 'yellow'
    },
    menu: {
      type: Array,
      default: () => ([])
    },
    menuVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showMenu () {
      return this.menu && this.menu.length > 0
    }
  },
  methods: {
    handleClick (e) {
      if (!this.showMenu) {
      } else this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss" scoped>
// 下拉菜单切换动画
.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}
.slide-enter, .slide-leave-to {
  transform: translateY(.1rem);
  opacity: 0;
}

.button-container{
  position: relative;

  // 按钮主体
  .button{
    padding: 0 .12rem;
    height: .30rem;
    border-radius: .10rem;
    color: white;
    font-size: .16rem;
    font-family: PingFangSC-Regular, sans-serif;
    @include flex (center, center)
  }

  // 黄色主题
  .button-yellow{
    @extend .button;
    background: linear-gradient(135deg, #FFCD00 0%, #FFAE20 100%);
    box-shadow: 0px 6px 10px -4px rgba(255, 174, 32, 0.5);
  }

  // 绿色主题
  .button-green{
    @extend .button;
    background: linear-gradient(135deg, #36E5AD 0%, #0AD593 100%);
    box-shadow: 0px 6px 10px -4px #05DD98;
  }

  // 蓝色主题
  .button-blue{
    @extend .button;
    background: #00AEFF;
    box-shadow: 0px 6px 10px -4px #00AEFF;
  }

  // 操作下拉菜单
  .handle-menu{
    width: 1.10rem;
    background: #FFFFFF;
    box-shadow: 0px 2px 10px 4px rgba(38, 38, 38, 0.06);
    border-radius: 2px;
    position: absolute;
    bottom: -0.1rem;
    right: 0;
    transform: translateY(100%);

    // 三角形
    &:before{
      content: '';
      display: block;
      width: 0;
      height: 0;
      border: solid .05rem transparent;
      border-bottom: solid .05rem #ffffff;
      position: absolute;
      top: -0.1rem;
      right: .15rem;
    }

    // 菜单项
    .meun-item{
      padding-left: .1rem;
      width: 100%;
      height: .35rem;
      font-size: .14rem;
      color: $main-text;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img{
        width: 0.2rem;
        height: 0.2rem;
        margin-right: .1rem;
      }
    }
  }
}
</style>
