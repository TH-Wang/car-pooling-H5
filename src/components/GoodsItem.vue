<template>
  <div :class="`container container-${size}`" @click="$emit('click')">
    <!-- 商品图片 -->
    <van-image fill="cover" width="1.15rem" height=".90rem" />

    <!-- 商品信息 -->
    <div class="info">
      <div>
        <div class="title ellipsis-two">{{record.title}}</div>
        <div v-if="showTip" class="tip">{{record.tip}}</div>
      </div>
      <div class="footer">
        <div class="price">{{record.price}}<span class="price-suffix">{{priceSuffix}}</span>
        </div>
        <div :class="stateClass">{{buttonText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'

export default {
  components: {
    'van-image': Image
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    showTip: {
      type: Boolean,
      default: false
    },
    // 尺寸: ['default', 'small']
    size: {
      type: String,
      default: 'default'
    },
    // 价格后缀
    priceSuffix: {
      type: String,
      default: ''
    },
    // 按钮文本
    buttonText: {
      type: String,
      default: '购买'
    },
    // 按钮样式: ['primary', 'normal']
    buttonType: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    stateClass () {
      return `state--${this.size} state--${this.buttonType}`
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: .90rem;
  @include flex ($align: center);

  &-default{
    margin: .20rem .15rem;
  }
  &-small{
    margin: .17rem .15rem;
  }

  // 商品信息
  .info {
    flex: 1;
    height: 100%;
    margin-left: .11rem;
    @include flex (space-between, flex-start, column);

    // 名称
    .title{
      @include font (.16rem, $main-text, bold);
    }

    // 辅助信息
    .tip{
      @include font (.12rem, $tip-text);
      margin-top: .04rem;
    }

    // 底部信息
    .footer{
      width: 100%;
      @include flex (space-between, center);
    }

    // 价格
    .price{
      @include font (.18rem, $main-color);

      // 前缀
      &::before{
        content: '￥';
        font-size: .12rem;
        transform: translateX(2px);
        display: inline-block;
      }

      // 后缀
      &-suffix{
        @include font (.12rem, $tip-text);
        margin-left: .02rem;
      }
    }

    // 状态按钮
    .state{
      width: 0.7rem;
      height: 0.26rem;
      line-height: .26rem;
      border-radius: .10rem;
      text-align: center;
      @include font (.14rem, #fff);

      &--default{
        @extend .state;
      }

      &--small{
        width: 0.44rem;
        height: 0.25rem;
        line-height: .25rem;
        border-radius: .02rem;
        text-align: center;
        @include font (.12rem, #fff);
      }

      &--primary{
        background: linear-gradient(135deg, #FFCD00 0%, #FFAE20 100%);
        box-shadow: 0px 6px 10px -4px rgba(255, 205, 0, 0.5);
      }

      &--normal{
        background-color: $normal-text;
      }
    }
  }
}
</style>
