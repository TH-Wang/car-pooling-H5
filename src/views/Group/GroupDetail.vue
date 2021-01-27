<template>
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="群详情"
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    >
      <template #left><van-icon name="arrow-left" /></template>
      <!-- <template #right><van-icon name="wap-home" /></template> -->
    </van-nav-bar>

    <!-- 群名片 -->
    <div class="group-info">
      <group-item :record="info" show-views>
        <template #right>
          <mini-button color="green" @click="handleShowCode">群二维码</mini-button>
        </template>
      </group-item>
    </div>

    <!-- 详细信息 -->
    <div class="info-list gap">
      <div class="info-list-title">群信息</div>
      <div class="info-list-cell">
        <span class="info-list-label">更新时间</span><span>{{time || ''}}</span>
      </div>
      <div class="info-list-cell">
        <span class="info-list-label">群归属地</span><span>{{region}}</span>
      </div>
      <div class="info-list-cell">
        <span class="info-list-label">进群规则</span><span>{{info.groupRequire}}</span>
      </div>
    </div>

    <!-- 群介绍 -->
    <div class="info-list gap">
      <div class="info-list-title">群介绍</div>
      <div class="info-list-content">{{info.groupIntroduce}}</div>
    </div>

    <!-- 群说明 -->
    <div class="info-list gap">
      <div class="info-list-title">群说明</div>
      <div class="info-list-content">{{info.groupIntroduce}}</div>
    </div>

    <!-- 底部按钮 -->
    <div class="footer">
      <main-button
        width="1.20rem"
        color="yellow"
        @click="handleShare"
      >分享给朋友</main-button>
      <main-button
        width="2.10rem"
        color="yellow"
        type="gradient"
        @click="handleClickInto"
      ><span>{{priceText}}</span></main-button>
    </div>

    <!-- 群二维码 -->
    <overlay v-model="showQRcode">
      <div class="code-card">
        <qrcode-card :record="info" :tips="tips" center />
      </div>
      <div class="code-button">
        <main-button width="3.15rem" color="yellow" type="gradient">复制入群码</main-button>
      </div>
    </overlay>

    <!-- 支付弹窗 -->
    <pay-layer ref="layer" @submit="handlePay" />
  </div>
</template>

<script>
import moment from 'moment'
import { selectGroupById, payIntoGroup, queryAuthIntoGroup } from '@/api'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'
import MainButton from '@/components/MainButton'
import Overlay from '@/components/Overlay'
import QRcodeCard from '@/components/QRcodeCard'
import PayArrears from '@/components/Layer/PayArrears'
import { aliPay, wexinPay } from '@/utils/pay'
import { isWeixin, getUserCode } from '@/utils/wx'

export default {
  components: {
    'group-item': GroupItem,
    'mini-button': MiniButton,
    'main-button': MainButton,
    overlay: Overlay,
    'qrcode-card': QRcodeCard,
    'pay-layer': PayArrears
  },
  data: () => ({
    // 拼车群id
    groupId: null,
    // 详细信息
    info: { price: 0, city: '', region: '' },
    tips: [
      '长按二维码扫描或保存进群流程',
      '1.扫码二维码',
      '2.发送入群码 <span style="color:#FFCD00">CDSLVN</span>'
    ],
    showQRcode: false,
    // 是否有查看的权限
    auth: false
  }),
  computed: {
    time () {
      return moment(this.info.createTime).format('YYYY-MM-DD')
    },
    region () {
      return this.info.city + ' · ' + this.info.region
    },
    // 价格
    priceText () {
      const price = this.info.price
      if (!price) return ''
      if (price === 0) return '免费'
      else {
        if (this.auth) return '已付费'
        const decimal = price.toString().split('.')[1]
        const text = decimal ? price : price + '.00'
        return `付费￥${text}元进群`
      }
    }
  },
  methods: {
    // 请求群详情信息
    async handleReq () {
      const res = await selectGroupById(this.groupId)
      this.info = res.data.data
      // 如果免费，则有权限
      if (this.info.price <= 0) {
        this.auth = true
        return
      }
      // 否则查询权限
      this.handleReqAuth()
    },
    // 查看是否有权限查看二维码
    async handleReqAuth () {
      const res = await queryAuthIntoGroup(this.groupId)
      this.auth = res.data.data === 1
    },
    // 点击付费
    async handleClickInto () {
      if (this.auth) return
      this.$refs.layer.show()
    },
    // 发起支付
    async handlePay (type) {
      try {
        const groupId = this.groupId
        const data = { type, groupId }
        if (isWeixin()) data.code = this.$store.state.ticket.code
        // debugger
        // await this.$dialog.alert({
        //   message: JSON.stringify(data)
        // })
        const res = await payIntoGroup(data)
        if (type === 1) {
          aliPay(res)
        } else {
          await wexinPay(res)
          this.auth = true
        }
      } catch (error) {
        this.$dialog.alert({
          message: error
        })
      }
    },
    // 点击分享
    handleShare () {
      this.$dialog.alert({ message: '分享' })
    },
    handleBackHome () {
      this.$router.replace('/home')
      location.reload()
    },
    handleShowCode () {
      if (!this.auth) {
        this.$dialog.alert({
          title: '付费进群',
          message: '亲爱的用户该群为付费群，<span style="color: #FFCD00">完成付费</span>后即可查看二维码',
          allowHtml: true
        })
        return
      }
      this.showQRcode = true
    }
  },
  created () {
    this.groupId = this.$route.query.id
    this.handleReq()
  },
  mounted () {
    if (!this.$store.state.ticket.code && isWeixin()) {
      const id = this.groupId
      getUserCode('/common/group/detail?id=' + id)
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

    &-cell{
      margin: .10rem auto;
      @include flex ();
    }

    &-label{
      flex-shrink: 0;
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
