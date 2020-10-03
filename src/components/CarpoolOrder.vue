<template>
  <div class="container">

    <!-- 顶部主要信息 -->
    <div class="header">
      <!-- 时间 -->
      <div class="time">
        <div class="time-num">08:00</div>
        <div class="time-text">今天</div>
      </div>
      <!-- 主要信息 -->
      <div class="header-main">
        <div class="line-text">
          <div class="start">重庆北站</div>
          <img class="arrow" src="../assets/icons/line-arrow.png" alt="">
          <div class="end">重庆西站</div>
        </div>
        <div class="car-info">
          <div class="car-info-item">
            <img src="../assets/icons/order/car.png" alt="">
            <span>奔驰E300l</span>
          </div>
          <div class="car-info-item">
            <img src="../assets/icons/order/location.png" alt="">
            <span>2.5km</span>
          </div>
          <div class="car-info-item">
            <img src="../assets/icons/order/line.png" alt="">
            <span>95%</span>
          </div>
        </div>
      </div>
      <!-- 价格 -->
      <div class="price"><span>￥</span>60</div>
    </div>

    <!-- 详细内容 -->
    <div class="content">
      <div class="content-item">
        <span>途径点</span>重庆北站 - 紫金山地铁站 - 人民路红十字会 - 二七地铁站 - 重庆一中 - 医学院地铁站 - 京广路 - 崇山路 - 新城区路口 - 体育路 - 中兴路 - 体育村 - 重庆西站
      </div>
      <div class="content-item">
        <span>备注</span>重庆北站到重庆西站顺路可带4人，顺路上下，预定电话确认下
      </div>
    </div>

    <!-- 用户信息及操作按钮 -->
    <div class="user">
      <!-- 用户信息 -->
      <div class="user-info">
        <div class="avatar"></div>
        <div class="name ellipsis">杨女士</div>
        <div class="social">
          <img src="../assets/icons/order/like.png" alt="">
          <span>1920</span>
        </div>
        <div class="social">
          <img src="../assets/icons/order/dislike.png" alt="">
          <span>10</span>
        </div>
      </div>
      <!-- 拼单操作 -->
      <div class="book-order">
        <div class="seat"><span>余座</span><span class="num-yellow">3</span></div>
        <div class="handle-button">立即预定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
// 使用订单底部用户栏样式
@import '@/assets/scss/common.scss';

.container{
  padding: 0 .15rem;
  margin-bottom: .10rem;
  background-color: #fff;

  &:active{
    background-color: #f9f9f9;
  }

  // 顶部主要信息
  .header{
    padding: .24rem 0 .20rem 0;
    display: flex;
    align-items: flex-start;

    // 时间
    .time{
      flex-shrink: 0;
      padding: 0 .10rem;
      margin-right: .10rem;
      text-align: right;
      border-right: dashed 1px $normal-text;

      &-num{
        font-size: .24rem;
        color: $main-text;
        font-weight: bold;
      }

      &-text{
        margin-top: .03rem;
        font-size: .12rem;
        color: $tip-text;
      }
    }

    // 主要信息
    &-main{
      flex: 1;

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
          margin: 0 .10rem;
        }

        div{
          // max-width: 30%;
        }
      }

      // 辅助信息
      .car-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: .08rem;

        &-item{
          display: flex;
          align-items: center;

          img{
            width: .13rem;
            margin-right: .05rem;
          }

          span{
            font-size: .12rem;
            color: $tip-text;
            text-align: left;
          }
        }
      }
    }

    // 价格
    .price{
      flex-shrink: 0;
      font-size: .24rem;
      color: $sub-color;
      font-weight: bold;
      // font-family: PingFangSC-Light, sans-serif;
      margin-left: .20rem;

      // 人民币符号
      span{
        font-size: .2rem;
        font-family: '等线';
        margin-right: -0.02rem;
      }
    }
  }

  // 详细信息
  .content{
    padding-left: .93rem;
    font-size: .12rem;
    color: $sub-text;
    text-align: left;
    border-bottom: dashed 1px $normal-text;

    &-item{
      padding-bottom: .15rem;
    }

    span{
      padding-right: .08rem;
      margin-right: .05rem;
      color: $main-text;
      font-weight: bold;
      position: relative;

      &:after{
        content: '';
        height: .12rem;
        width: 1px;
        background-color: $tip-text;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
