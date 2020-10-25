<template>
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="详情"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <div class="header">
      <van-image width="3.45rem" height="1.20rem" class="image"></van-image>
      <div class="header-top">
        <div class="header-title">故宫博物馆感受文化之旅</div>
        <div class="price">1000</div>
      </div>
      <div class="header-info">出行时间：2020-07-23 至 2020-07-30</div>
    </div>

    <div class="main-title">图文详情</div>
    <van-image
      width="3.45rem"
      height="2rem"
      src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2721413376,3982425589&fm=26&gp=0.jpg"
    ></van-image>

    <div class="main-title">费用说明</div>
    <p class="detail">1. 一人一位一费，1.2cm以下小孩半价，不能乱吃拉面了吗联盟里面了麻辣小面
2. 那蓝蓝路发生呢了哪里哪里 买啦买到啦
3. 你擦了那份南斯拉夫教练是德弗里斯你离那里是德弗里斯难吃死了
4. 麻辣；什么；啊什么的；阿里斯顿家；立即</p>

    <div class="main-title">购买须知</div>
    <p class="detail">1. 蠢哭了；身份；阿瑟费吗；阿妈了马拉松拿出来说那拉氏奶粉门口吃辣椒水里打瞌睡
2. 那蓝蓝路发生呢了哪里哪里 买啦买到啦
3. 你擦了那份南斯拉夫教练是德弗里斯你离那里是德弗里斯难吃死了
4. 麻辣；什么；啊什么的；阿里斯顿家；立即</p>

  <main-button
    center
    style="margin: .20rem auto .30rem auto;"
    @click="$router.push({path: '/common/tourcar/placeorder', query: {type: 'tour'}})"
  >立即购买</main-button>
  </div>
</template>

<script>
import { Image } from 'vant'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-image': Image,
    'main-button': MainButton
  }
}
</script>

<style lang="scss" scoped>
.page{
  margin: 0 .15rem;

  .image{
    border-radius: .05rem;
  }
  .price{
    @include font (.18rem, $sub-color);

    &::before{
      content: '￥';
      font-size: .12rem;
      margin-right: -2px;
    }
  }

  .header{
    padding: .15rem 0;
    border-bottom: dashed 1px $normal-text;

    &-top{
      @include flex (space-between, center);
    }

    &-title{
      margin: .10rem 0 .05rem 0;
      @include font (.16rem, $main-text, bold);
    }

    &-info{
      @include font (.12rem, $tip-text);
    }
  }

  .main-title{
    margin: .20rem 0 .10rem 0;
    @include font (.18rem, $main-text, bold);
  }
  .detail{
    @include font (.14rem, $tip-text);
    line-height: .20rem;
  }
}
</style>
