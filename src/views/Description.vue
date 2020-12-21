<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      :title="title"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 说明内容 -->
    <div class="tips" style="text-align: left">
      <p v-for="(item, index) in tips[type]" :key="index" v-html="item"></p>
    </div>
  </div>
</template>

<script>
const f = '<span style="color:#FFCD00">'
const e = '</span>'
const text = {
  liability: [
    '为营造诚信拼车氛围，减少“不诚信拼车”行为，拼车之家实行“有责退订”：',
    `1、拼友预定后${f}10分钟内${e}退订属于${f}无责${e}；`,
    `2、拼友预定后超过10分钟退订，且退订时间距离出发时间小于30分钟，${f}属于有责；${e}`,
    '3、当系统判断为有责退订时，将扣除拼友10诚信值；',
    '4、诚信值低于50分时，将额外收取30%信息服务费'
  ],
  credit: [
    '为营造诚信拼车氛围，拼车之家实行“诚信值”体系：',
    '1、拼友手机注册，初始诚信值为50分； ',
    `2、通过${f}实名认证${e}，诚信值+25分；`,
    `3、通过${f}车主认证${e}，诚信值+25分；`,
    '4、拼友成功出行（无投诉），诚信值+5分；',
    `5、拼友退订被判断为${f}有责退订${e}时，诚信值-10分；`,
    '6、拼友不诚信拼车（有投诉），经客服核实后，诚信值-10分；',
    '7、诚信值低于50分，将需要额外再支付30%信息服务费；',
    '8、诚信值每周更新一次，分值低于1分无法发布；'
  ]
}

const title = {
  liability: '无责退订说明',
  credit: '诚信值说明'
}

export default {
  data: () => ({
    // liability: 无责退订, credit: 诚信分
    type: 'liability',
    tips: text,
    title: ''
  }),
  created () {
    const { type } = this.$route.query
    this.type = type
    this.title = title[type]
  }
}
</script>

<style lang="scss" scoped>
.tips{
  @include font (.13rem, $main-text);
  padding: 0 .15rem;
  margin-top: .20rem;
  margin-bottom: .20rem;
  line-height: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  text-align: left;

  .yellow{
    color: $main-color;
  }
}
</style>
