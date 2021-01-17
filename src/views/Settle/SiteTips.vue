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
        <p>1.申请站长将开启新的社群营销收益旅程</p>
        <p>2.拼车之家设定每一个区县拥有一个站长+N副站长+N社群群主，通过该站产生的收益将会获得信息服务收益</p>
        <p>3.独立个人拥有微信公共号订阅号即可申请拼车之家站长</p>
        <p>4.拼车之家站长拥有独立的信息发布权限</p>
        <p>5.拼车之家站长拥有独立的信息服务收益</p>
        <p>6.拼车之家站长设立一个区县一个站长+N副站长</p>
        <p>7.拼车之家站长可对该区域站拥有收益再分配权限</p>
        <p>8.拼车之家站长讲获得专业的培训，站长通过后获得总站扶持，总站帮扶运营</p>
        <p>9.拼车之家站长将会对该区县的副站及社区群主进行帮扶运营，让他们获得市场运营收益</p>
        <p>10.拼车之家区县站实现，每站运营半年，实现站月收益5万目标</p>
      </div>
      <div class="card-info">
        <div class="card-title"><span>—</span> 副站长权益 <span>—</span></div>
        <p>1.拼车之家提供开放的接口服务，多于已经拥有并运营的本地服务号，即可申请拼车之家副站长</p>
        <p>2.拼车之家庞大的拼车信息数据库将会更好提供拼车服务，通过该服务号产生的订单收益获得分佣</p>
        <p>3.拼车之家副站站是对站长的补充，所在区域会获得受站长扶持</p>
        <p>4.站长和副站长对社群群主的扶持和帮助，将会给你带来庞大的流量和收益</p>
        <p>5.站长和副站长鼓励拼车社群加入，通过对社区的管理，利用拼车之家大数据实现社群内对乘客和车主的信息匹配，快速完成拼车，一旦拼车成功社区群主将会获得信息服务收益，凡事有拼车QQ群，拼车微信群...社群的群主都可申请成为群主。</p>
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
