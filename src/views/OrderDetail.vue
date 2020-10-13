<template>
  <div class="container">

    <!-- 导航栏 -->
    <van-nav-bar
      title="出行详情"
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
      @click-right="handleBackHome"
    >
      <template #left><van-icon name="arrow-left" /></template>
      <template #right><van-icon name="wap-home" /></template>
    </van-nav-bar>

    <!-- 顶部基本信息 -->
    <div class="header">
      <!-- 提示信息、路线、订单状态 -->
      <div class="tip-box">
        <span class="tip-text">出发地点 - 到达地点</span>
        <!-- 价格 -->
        <div class="price"><span>60</span>元/座</div>
        <!-- 订单状态 -->
        <img class="state" src="@/assets/icons/order-state/doing.png" alt="">
      </div>
      <!-- 路线 -->
      <div class="line-text">
        <div>重庆北站</div>
        <img class="arrow" src="../assets/icons/line-arrow.png" alt="">
        <div>重庆西站</div>
      </div>
      <!-- 时间、座位 -->
      <div class="time">
        <van-icon class="mini-icon" name="clock-o" />
        <span>2020-03-23  08:00</span>
        <span class="split-line">|</span>
        <van-icon class="mini-icon" name="friends-o" />
        <span>余座 <strong>3</strong></span>
      </div>
    </div>

    <!-- 详情卡片 -->
    <div class="content">
      <!-- 地图 -->
      <div class="map"></div>
      <!-- 信息 -->
      <div class="info">
        <div class="info-item">
          <van-icon class="icon" name="manager"/><span class="label">乘客</span>
          <span class="text">成女士</span>
        </div>
        <div class="info-item">
          <van-icon class="icon" name="manager"/><span class="label">出发地点</span>
          <span class="text">重庆北站</span>
        </div>
        <div class="info-item">
          <van-icon class="icon" name="manager"/><span class="label">到达地点</span>
          <span class="text">重庆西站</span>
        </div>
        <div class="info-item">
          <van-icon class="icon" name="clock"/><span class="label">出发时间</span>
          <span class="text">07月09日 08:00</span>
        </div>
        <div class="info-item">
          <van-icon class="icon" name="location"/><span class="label">途径点</span>
          <span class="text">重庆北站 - 人民路红十字会 - 二七地铁站 - 重庆一中 - 医学院地铁站 - 京广路 - 崇山路 - 重庆西站</span>
        </div>
      </div>
      <!-- 联系电话 -->
      <div class="phone-box">
        <div class="phone-tip">请点击号码立刻与车主电话确认行程</div>
        <div class="phone"><van-icon class="phone-icon" name="phone"/>15704602398</div>
      </div>
    </div>

    <!-- 底部按钮组 -->
    <div class="footer-button-group">
      <div class="button-normal">转发分享</div>
      <div class="button-primary">立即预订</div>
    </div>

    <!-- 温馨提示 -->
    <div class="warn-tips">
      <p>温馨提示</p>
      <p>1.如您行程改变，请尽可能提前退订，<span>07月09日 08:00</span>前可<span>无责退订</span>。</p>
      <p>2.请在上车后，将分摊费用直接支付车主。</p>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'

export default {
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon
  },
  methods: {
    handleBackHome () {
      this.$router.replace('/home')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: .22rem;
}

// 顶部基本信息
.header{
  width: 100%;
  padding: .20rem .15rem;
  box-sizing: border-box;

  // 提示信息、价格、订单状态
  .tip-box{
    width: 100%;
    position: relative;
    margin-bottom: .15rem;
    text-align: left;

    .tip-text{
      letter-spacing: 0.8px;
      @include font (.14rem, $sub-text)
    }

    .absolute{
      position: absolute;
      right: 0;
      top: 0;
    }

    // 车价
    .price{
      @extend .absolute;
      @include font (.12rem, $tip-text);
      letter-spacing: 0.8px;

      span{
        @include font (.24rem, $main-color, bold);
        margin-right: 3px
      }

      span:before{
        content: '￥';
        @include font(.20rem, $main-color, bold);
        font-family: '等线';
        display: inline-block;
        transform: translateX(4px);
      }
    }

    // 订单状态
    .state{
      @extend .absolute;
      width: 1rem;
      height: 1rem;
    }
  }

  // 路线信息
  .line-text{
    width: calc(100% - 1.1rem);
    margin-bottom: .18rem;
    @include flex ($align: center);
    @include font (.18rem, $main-text, bold);

    .arrow{
      width: .18rem;
      margin: 0 .10rem;
    }
  }

  // 时间座位信息
  .time{
    @include font (.12rem, $tip-text);
    @include flex ($align: center);
    padding-bottom: .15rem;
    border-bottom: solid 1px $normal-text;

    .mini-icon{
      margin-right: .05rem;
    }

    .split-line{
      margin: 0 .15rem;
      transform: translateY(-2px);
    }

    strong{
      @include font (.14rem, $main-color, bold)
    }
  }
}

// 详细信息
.content{
  width: 3.45rem;
  margin: 0 auto;
  border-radius: .05rem;
  overflow: hidden;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);

  // 地图卡片
  .map{
    width: 100%;
    height: 1.70rem;
    background-color: $linecard-color;
    box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);
  }

  // 信息
  .info{
    padding: .20rem .20rem 0rem .20rem;

    &-item{
      @include font (.16rem, $tip-text, bold);
      text-align: left;
      margin-bottom: .12rem;
      font-family: PingFangSC-Medium, PingFang SC;

      &:last-child{
        margin-bottom: .20rem;
      }

      .icon{
        margin-right: .15rem;
      }

      .label{
        width: .66rem;
        margin-right: .15rem;
        @include textJustify;
      }

      .text{
        color: $main-text;
        line-height: .24rem;
      }
    }
  }

  // 联系电话
  .phone-box{
    padding: .15rem 0 .20rem 0;
    margin: 0 .20rem;
    border-top: solid 1px $normal-text;

    .phone-tip{
      @include font (.12rem, $main-text);
      text-align: center;
      font-family: PingFangSC-Regular, PingFang SC;
      margin-bottom: .15rem;
    }

    .phone{
      @include flex (center, center);
      @include font (.24rem, $sub-color, bold);

      &-icon{
        font-size: .23rem;
        margin-right: .05rem;
      }
    }
  }
}

// 底部按钮组
.footer-button-group{
  @include flex (space-between, center);
  padding: 0 .20rem;
  margin-top: .20rem;

  .button{
    width: 1.58rem;
    height: .50rem;
    border-radius: .05rem;
    box-sizing: border-box;
    font-size: .16rem;
    @include flex (center, center);
  }

  .button-normal{
    @extend .button;
    color: $sub-text;
    border: solid 1px $tip-text;
  }

  .button-primary{
    @extend .button;
    color: #fff;
    background: linear-gradient(135deg, #FFCD00 0%, #FFAE20 100%);
  }
}

// 温馨提示
.warn-tips{
  @include font (.12rem, $sub-text);
  padding: 0 .15rem;
  margin-top: .20rem;
  line-height: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  text-align: left;

  span{
    color: $main-color;
  }
}
</style>
