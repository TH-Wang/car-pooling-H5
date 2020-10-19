<template>
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="群详情"
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
      @click-right="handleBackHome"
    >
      <template #left><van-icon name="arrow-left" /></template>
      <template #right><van-icon name="wap-home" /></template>
    </van-nav-bar>

    <!-- 群名片 -->
    <div class="group-info">
      <group-item :record="groupInfo">
        <template #right>
          <mini-button color="green" @click="handleShowCode">群二维码</mini-button>
        </template>
      </group-item>
    </div>

    <!-- 详细信息 -->
    <div class="info-list">
      <span class="info-list-label">付费</span><span>￥5.00</span>
    </div>
    <div class="info-list">
      <span class="info-list-label">群主微信</span><span>ch80817</span>
    </div>
    <div class="info-list">
      <span class="info-list-label">发布时间</span><span>2019-12-31 17:47:52</span>
    </div>
    <div class="info-list">
      <span class="info-list-label">归属</span><span>重庆</span>
    </div>

    <!-- 群介绍 -->
    <div class="info-list gap">
      <div class="info-list-title">群介绍</div>
      <div class="info-list-content">本群吧啦拿来大陆参加四六级发生的理解你卡车年来首次你说你拉扯你拉娜老师打了承诺啦铖简历我哪里看出那颗星呢</div>
    </div>

    <!-- 群说明 -->
    <div class="info-list gap">
      <div class="info-list-title">群说明</div>
      <div class="info-list-content">本群吧啦拿来大陆参加四六级发生的理解你卡车年来首次你说你拉扯你拉娜老师打了承诺啦铖简历我哪里看出那颗星呢</div>
    </div>

    <!-- 底部按钮 -->
    <div class="footer">
      <main-button width="1.20rem" color="yellow">分享给朋友</main-button>
      <main-button width="2.10rem" color="yellow" type="gradient">付费进群</main-button>
    </div>

    <overlay v-model="showQRcode">
      <div class="code-card">
        <qrcode-card :tips="tips" center />
      </div>
      <div class="code-button">
        <main-button width="3.15rem" color="yellow" type="gradient">复制入群码</main-button>
      </div>
    </overlay>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'
import MainButton from '@/components/MainButton'
import Overlay from '@/components/Overlay'
import QRcodeCard from '@/components/QRcodeCard'

export default {
  components: {
    'van-nav-bar': NavBar,
    'group-item': GroupItem,
    'mini-button': MiniButton,
    'main-button': MainButton,
    overlay: Overlay,
    'qrcode-card': QRcodeCard
  },
  data: () => ({
    groupInfo: { id: 0, type: 0, name: '直通车6群', people: 334, price: '免费' },
    tips: [
      '长按二维码扫描或保存进群流程',
      '1.扫码二维码',
      '2.发送入群码 <span style="color:#FFCD00">CDSLVN</span>'
    ],
    showQRcode: false
  }),
  methods: {
    handleBackHome () {
      this.$router.replace('/home')
      location.reload()
    },
    handleShowCode () {
      this.showQRcode = true
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
  overflow-y: scroll;
  background-color: $light-color;

  .group-info{
    background-color: #fff;
    padding-top: .20rem;
  }

  .info-list{
    background-color: #fff;
    padding: .15rem;
    box-sizing: border-box;
    @include font (.16rem, $main-text);

    &-label{
      color: $tip-text;
      width: .64rem;
      margin-right: .15rem;
      @include textJustify;
    }

    &-title{
      @include font (.18rem, $main-text, bold);
      margin-bottom: .12rem;
    }

    &-content{
      @include font (.14rem, $tip-text);
    }
  }

  .gap{
    margin-top: .10rem;
  }

  .footer{
    margin: .42rem 0 .30rem 0;
    padding: 0 .15rem;
    @include flex (space-between, center);
  }

  .code-card, .code-button{
    position: absolute;
  }

  .code-card{
    left: 50%;
    bottom: calc(15vh + 0.5rem);
    transform: translateX(-50%);
  }

  .code-button{
    left: 50%;
    bottom: 5vh;
    transform: translateX(-50%);
  }
}
</style>
