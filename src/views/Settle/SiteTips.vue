<template>
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="申请站长"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 顶部图片 -->
    <van-image
      width="100%"
      height="2.40rem"
      fit="cover"
      :src="require('@/assets/images/settle-site-master.png')"
    />

    <!-- 介绍内容 -->
    <div class="card">
      <div class="card-info border-bottom">
        <div class="card-title"><span>—</span> 站长权益 <span>—</span></div>
        <p>1.拼友手机注册，初始信用分，。。。；</p>
        <p>2.擦吗；什么车；是</p>
        <p>3.充满了；上车马上；</p>
        <p>4.那里充满善良聪明</p>
        <p>5.想你来擦拭了马尼拉啊就怕健康</p>
        <p>6.暗藏拦车拉水泥厂拉屎难吃啦看韩剧奥克斯拿出来看</p>
        <p>7.xnoalnlanxnakoslcasln女老师陈老师</p>
        <p>8.神经错乱诗纳卡琳</p>
        <p>9.吗看来是从马尼拉什么车拉上你吃了烧烤拿出来</p>
      </div>
      <div class="card-info">
        <div class="card-title"><span>—</span> 副站长权益 <span>—</span></div>
        <p>1.拼友手机注册，初始信用分，。。。；</p>
        <p>2.擦吗；什么车；是</p>
        <p>3.充满了；上车马上；</p>
        <p>4.那里充满善良聪明</p>
        <p>5.想你来擦拭了马尼拉啊就怕健康</p>
        <p>6.暗藏拦车拉水泥厂拉屎难吃啦看韩剧奥克斯拿出来看</p>
        <p>7.xnoalnlanxnakoslcasln女老师陈老师</p>
        <p>8.神经错乱诗纳卡琳</p>
        <p>9.吗看来是从马尼拉什么车拉上你吃了烧烤拿出来</p>
      </div>
    </div>

    <main-button
      class="apply-button"
      @click="$router.push('/common/settle/site')"
    >立即申请</main-button>
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
  padding-bottom: 1rem;
}
.card{
  width: 3.45rem;
  margin: 0 auto;
  padding: 0 .15rem;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);
  transform: translateY(-20px);

  &-info{
    padding: .15rem 0;
  }

  &-title{
    margin-bottom: .15rem;
    text-align: center;
    @include font (.18rem, $main-text, bold);

    span{
      display: inline-block;
      transform: translateY(-2px);
    }
  }

  p{
    @include font (.14rem, $sub-text);
    line-height: 20px;
  }

  .border-bottom{
    border-bottom: dashed 2px #f5f5f5;
  }
}

.apply-button{
  position: fixed;
  bottom: .30rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
