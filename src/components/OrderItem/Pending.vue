<template>
  <div class="container">

    <!-- 顶部主要信息 -->
    <div class="header">
      <!-- 主要信息 -->
      <div class="header-main">
        <div class="time-num">08:00</div>
        <div class="time-text">/ 今天</div>
        <div class="car-info-item">
          <img src="@/assets/icons/order/location.png" alt="">
          <span>2.5km</span>
        </div>
        <div class="car-info-item">
          <img src="@/assets/icons/order/line.png" alt="">
          <span>95%</span>
        </div>
      </div>
      <!-- 价格 -->
      <div class="price"><span>￥</span>60</div>
    </div>

    <!-- 详细信息 -->
    <div class="content">
      <!-- 路线信息 -->
      <div class="line-info">
        <span class="start">起</span>
        <span>重庆北站阳光花园小区</span>
      </div>
      <div class="line-info gap">
        <span class="end">终</span>
        <span>重庆西站春天小学</span>
      </div>
      <!-- 途径点 -->
      <div v-if="hasWay" class="detail">
        <span>途径点</span> | 重庆北站 - 紫金山地铁站 - 人民路红十字会 - 二七地铁站 - 重庆一中 - 医学院地铁站 - 京广路 - 崇山路 - 新城区路口 - 体育路 - 中兴路 - 体育村 - 重庆西站
      </div>
      <!-- 备注 -->
      <div class="detail">
        <span>备注</span> | 周六周日不上班
      </div>
    </div>

    <!-- 用户信息及操作按钮 -->
    <div class="user">
      <!-- 用户信息 -->
      <div class="user-info">
        <div class="avatar"></div>
        <div class="name ellipsis">杨女士</div>
        <div class="social">
          <img src="@/assets/icons/order/like.png" alt="">
          <span>1920</span>
        </div>
        <div class="social">
          <img src="@/assets/icons/order/dislike.png" alt="">
          <span>10</span>
        </div>
      </div>
      <!-- 拼单操作 -->
      <div class="book-order">
        <div class="seat"><span>人数</span><span class="num-green">3</span></div>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    hasWay: {
      type: Boolean,
      drfault: false
    }
  }
}
</script>

<style lang="scss" scoped>
// 使用订单底部用户栏样式
@import '@/assets/scss/user.scss';

.container{
  padding: 0 .15rem;
  margin-bottom: .10rem;
  background-color: #fff;

  // 顶部主要信息
  .header{
    padding: .20rem 0 .05rem 0;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: .12rem;
    color: $tip-text;

    // 订单信息
    .header-main{
      flex: 1;
      display: flex;
      align-items: baseline;
      justify-content: flex-start;

      .time-num{
        font-size: .24rem;
        color: $main-text;
        font-weight: bold;
        margin-right: .05rem;
      }

      .car-info-item{
        display: flex;
        align-items: baseline;
        margin-left: .15rem;

        img{
          width: .12rem;
        }

        span{
          margin-left: .03rem;
        }
      }
    }

    // 车价
    .price{
      flex-shrink: 0;
      font-size: .24rem;
      font-weight: bold;
      color: $aid-green-color;

      span{
        font-size: .2rem;
        font-family: '等线';
        margin-right: -0.02rem;
      }
    }
  }

  // 详细信息
  .content{
    padding: .10rem 0;
    border-top: dashed 1px $normal-text;
    border-bottom: dashed 1px $normal-text;

    // 路线信息
    .line-info{
      font-size: .16rem;
      color: $main-text;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      // 起止点文字图标
      .text-icon{
        margin-right: .05rem;
        width: .17rem;
        height: .17rem;
        font-size: .10rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: '等线';
        font-weight: 100;
        border-radius: 50%;
      }

      .start{
        @extend .text-icon;
        background-color: $main-color;
      }

      .end{
        @extend .text-icon;
        background-color: $aid-blue-color;
      }
    }

    // 间隔
    .gap{
      margin-top: .03rem;
    }

    // 途径点和备注
    .detail{
      font-size: .12rem;
      line-height: .22rem;
      color: $sub-text;
      margin-top: .12rem;
      text-align: left;
      letter-spacing: 0.8px;

      span{
        color: $main-text;
        font-weight: bold;
      }
    }
  }
}
</style>
