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
        <div class="name">{{user.info.username}}</div>
        <div class="phone">{{user.info.phone}}</div>
        <div class="title">{{title}}</div>
        <div class="link-text">{{link}}</div>
      </div>

      <div class="footer">
        <main-button
          width="1.15rem"
          @click="copyToClip"
        >复制到其他</main-button>
        <main-button
          width="2.05rem"
          type="gradient"
          @click="copyToClip"
        >复制到微信</main-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getShortLinkUrl } from '@/api'
import MainButton from '@/components/MainButton'

const port = 'http://pinchezhijia.com/'

export default {
  components: {
    'main-button': MainButton
  },
  data: () => ({
    title: '',
    code: '',
    addr: '',
    alias: '',
    link: ''
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 请求短链接
    async handleReqLink () {
      const oriUrl = port + '?station=' + this.alias
      console.log(oriUrl)
      const url = await getShortLinkUrl(oriUrl)
      this.link = url
    },
    // 复制
    async copyToClip (type) {
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
    // this.title = this.$route.query.title
    const { code, addr, alias } = this.$route.query
    this.code = code
    this.addr = addr
    this.alias = alias
    this.handleReqLink()
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
