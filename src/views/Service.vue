<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="联系客服"
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)">
      <template #left><van-icon name="arrow-left" /></template>
    </van-nav-bar>

    <div class="card">
      <div class="title">客服工作时间</div>
      <div class="content">{{info.working}}</div>
    </div>

    <div class="card">
      <div class="title">顺风车客服微信</div>
      <div class="content">
        <img :src="info.url" alt="">
        <span class="tip" style="margin-top:.15rem">（长按图片识别二维码，添加客服微信）</span>
      </div>
    </div>

    <div class="card">
      <div class="title">顺风车客服电话</div>
      <div class="content">
        <span class="tel" @click="handleCall">{{info.phone}}</span>
        <span class="tip">（点击号码，直接拨打）</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getServiceInfo } from '@/api'
import callPhone from '@/utils/callPhone'

export default {
  data: () => ({
    info: {}
  }),
  methods: {
    async getInfo () {
      const res = await getServiceInfo()
      this.info = res.data.data[0]
    },
    handleCall () {
      callPhone(this.record.phone)
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.card{
  margin: .15rem;
  border-radius: .06rem;
  background-color: #FFFFFF;
  box-shadow: 0 .02rem .15rem 0 rgba(0, 0, 0, 0.1);

  .title{
    padding: .1rem .15rem;
    box-sizing: border-box;
    border-bottom: solid 1px $normal-text;
    font-size: .14rem;
  }

  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: .15rem;
    box-sizing: border-box;
    @include font (.2rem, $main-text);

    img{
      width: 1.5rem;
      height: 1.5rem;
      background-color: #eee;
    }
    .tel{
      color: $main-color;
    }
    .tip{
      margin-top: .1rem;
      font-size: .14rem;
    }
  }
}
</style>
