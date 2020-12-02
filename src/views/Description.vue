<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="无责退订说明"
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
    '3、当系统判断为有责退订时，将扣除拼友0.2诚信值；',
    '4、诚信值低于1分时，将额外收取1元信息服务费；',
    '5、30天内有2次有责退订免处罚，不扣诚信值；'
  ]
}
export default {
  data: () => ({
    // liability: 无责退订, credit: 诚信分
    type: 'liability',
    tips: text
  }),
  created () {
    this.type = this.$route.query.type
  }
}
</script>

<style lang="scss" scoped>
.tips{
  @include font (.14rem, $main-text);
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
