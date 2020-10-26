<template>
  <div>

    <!-- 导航栏 -->
    <van-nav-bar
      title="我的链接"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <div class="main-container">
      <div class="card">
        <div class="name">橙池二</div>
        <div class="phone">13720396397</div>
        <div class="title">{{title}}</div>
        <div class="link-text">https://car.pooling.com/home/yubeiqu</div>
      </div>

      <div class="footer">
        <main-button width="1.15rem">复制到其他</main-button>
        <main-button width="2.05rem" type="gradient">复制到微信</main-button>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from '@/components/MainButton'

export default {
  components: {
    'main-button': MainButton
  },
  data: () => ({
    title: ''
  }),
  created () {
    this.title = this.$route.query.title
  }
}
</script>

<style lang="scss" scoped>
.main-container{
  height: calc(100vh - 46px);
  padding: .30rem .20rem;
  box-sizing: border-box;
  @include flex (space-between, center, column);

  .card{
    width: 100%;
    padding: .20rem;
    box-sizing: border-box;
    border-radius: .10rem;
    box-shadow: 0px 0px 20px 0px rgba(38, 38, 38, 0.06);
  }

  .name{
    @include font (.16rem, $main-text, bold);
  }
  .phone{
    margin-top: .05rem;
    @include font (.12rem, $tip-text);
  }
  .title{
    margin-top: .30rem;
    @include font (.18rem, $main-text, bold);
  }
  .link-text{
    padding: .50rem .20rem;
    box-sizing: border-box;
    text-align: center;
    text-decoration: underline;
    word-break: break-all;
    line-height: .42rem;
    @include font (.24rem, $main-color);
  }

  .footer{
    width: 100%;
    @include flex (space-between, center);
  }
}
</style>
