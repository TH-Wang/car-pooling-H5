<template>
  <div class="container">
    <!-- 上方搜索栏 -->
    <div class="search-box">
      <!-- 指示图标 -->
      <div class="guide-box">
        <img class="point" src="../assets/icons/start-point.png" alt="">
        <img class="switch" src="../assets/icons/switch.png" alt="">
        <img class="point" src="../assets/icons/end-point.png" alt="">
      </div>
      <!-- 地址显示栏 -->
      <div class="address-box">
        <!-- 起始点 -->
        <div class="address-bar dotted-border">
          <span class="address-bar-city">重庆</span>
          <span class="address-bar-detail">江北区建新北路观音桥步行街</span>
          <van-switch
            v-model="startSwtich"
            active-color="#FFCD00"
            size="0.16rem"
          />
        </div>
        <!-- 目的地 -->
        <div class="address-bar">
          <span class="address-bar-city default">你要去哪儿</span>
          <span class="address-bar-detail default">地址/街道/酒店/景点</span>
          <van-switch
            v-model="startSwtich"
            active-color="#FFCD00"
            size="0.16rem"
          />
        </div>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="button" v-if="hasButton">
      <main-button width="100%">寻找车主</main-button>
    </div>
  </div>
</template>

<script>
import { Switch } from 'vant'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-switch': Switch,
    'main-button': MainButton
  },
  props: {
    hasButton: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    startSwtich: false
  })
}
</script>

<style lang="scss" scoped>
.container{
  width: 3.45rem;
  margin: 0 auto;
  padding: 0 .18rem;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);
  box-sizing: border-box;
  border-radius: 0.05rem;
  background-color: #fff;

  // 上方搜索容器
  .search-box{
    display: flex;
    align-items: center;

    // 指示图标容器
    .guide-box{
      flex-shrink: 0;
      padding: 0rem 0.12rem 0rem 0.05rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .point{
        width: 0.14rem;
        height: 0.14rem;
      }

      .switch{
        width: 0.18rem;
        height: 0.18rem;
        margin: 0.12rem 0;
      }
    }

    // 地址栏容器
    .address-box{
      flex: 1;

      .address-bar{
        height: 0.55rem;
        display: flex;
        align-items: center;
        font-size: 0.14rem;
        color: $main-text;
        font-weight: bold;

        &-city{
          flex-shrink: 0;
          margin-right: 0.12rem;
        }

        &-detail{
          flex: 1;
          margin-right: 0.08rem;
          text-align: left;
        }

        // placeholder
        .default{
          color: $tip-text;
          font-weight: 400;
        }
      }

      // 虚线边框
      .dotted-border{
        border-bottom: dashed 1px $normal-text;
      }
    }
  }

  // 按钮
  .button{
    padding-bottom: .15rem;
  }
}

</style>
