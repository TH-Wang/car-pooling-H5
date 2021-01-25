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
          :qr="url"
          :record="{
            imgUrl: user.info.headimg,
            groupName: user.info.username
          }"
          :tips="tips"
        />
      </div>

      <main-button
        style="margin-bottom:.20rem"
        @click="copyToClip"
      >复制邀请链接</main-button>
    </div>
  </div>
</template>

<script>
import { getUserInviteQr, getShortLinkUrl } from '@/api'
import QRcodeCard from '@/components/QRcodeCard'
import MainButton from '@/components/MainButton'
import { mapState } from 'vuex'

export default {
  components: {
    'qrcode-card': QRcodeCard,
    'main-button': MainButton
  },
  data: () => ({
    url: '',
    invite: '',
    link: ''
  }),
  computed: {
    ...mapState(['user']),
    tips () {
      const tips = [
        '邀请好友注册可扫描您的二维码',
        '或复制邀请链接，邀请链接：'
      ]
      if (this.link) {
        tips.push(`<span style="color:#FFCD00">${this.link}</span>`)
      }
      return tips
    }
  },
  methods: {
    // 获取邀请二维码
    async handleReq () {
      const res = await getUserInviteQr()
      const data = res.data.data
      this.url = data.image
      this.invite = data.url
      this.handleGetLink()
    },
    // 获取短链接
    async handleGetLink () {
      const res = await getShortLinkUrl(this.invite)
      this.link = res
    },
    // 复制
    copyToClip () {
      const aux = document.createElement('textarea')
      aux.value = this.link
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$toast.success('复制成功')
    }
  },
  created () {
    this.handleReq()
  }
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
