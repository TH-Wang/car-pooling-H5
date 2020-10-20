<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="邀请注册"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
      @click-right="$router.push('/common/my/share/history')"
    >
      <template #right>
        <span>邀请记录</span>
      </template>
    </van-nav-bar>

    <div class="main">
      <div class="card-container">
        <qrcode-card
          type="person"
          :record="{name: '吃鹅陈', wechat_number: '334kefuhaoma'}"
          :tips="tips"
        />
      </div>

      <main-button style="margin-bottom:.20rem">复制邀请链接</main-button>
    </div>
  </div>
</template>

<script>
import QRcodeCard from '@/components/QRcodeCard'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'qrcode-card': QRcodeCard,
    'main-button': MainButton
  },
  data: () => ({
    tips: [
      '邀请好友注册可扫描您的二维码',
      '或复制邀请链接',
      '邀请链接 <span style="color:#FFCD00">CDSLVN</span>'
    ]
  })
}
</script>

<style lang="scss" scoped>
.main{
  height: calc(100vh - 50px);
  padding: .30rem .15rem 0rem .15rem;
  box-sizing: border-box;
  @include flex (space-between, center, column);
}

.card-container{
  box-shadow: 0px 0px 20px 0px rgba(38, 38, 38, 0.06);
  border-radius: 10px;
  margin-bottom: .20rem;
}
</style>
