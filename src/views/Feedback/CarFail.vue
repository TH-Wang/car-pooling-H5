<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="确认订单"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 反馈图标 -->
    <feedback type="fail" title="包车失败" />

    <div class="title">热门旅游线路</div>

    <!-- 列表 -->
    <goods-item
      v-for="item in list"
      :key="item.id"
      :record="item"
      show-tip
      price-suffix="起"
      @click="$router.push('/common/car/detail')"
    />
  </div>
</template>

<script>
import Feedback from '@/components/Feedback'
import GoodsItem from '@/components/GoodsItem'

export default {
  components: {
    feedback: Feedback,
    'goods-item': GoodsItem
  },
  data: () => ({
    list: [],
    tips: [
      '温馨提示',
      '1.如您行程改变，请尽可能提前退订，<span style="color:#FFCD00">07月09日 08:00</span style="color:#FFCD00">前可<span style="color:#FFCD00">无责退订</span>。'
    ]
  }),
  mounted () {
    const tourData = new Array(5).fill({}).map((item, index) => {
      return {
        id: index,
        state: index % 2 === 0 ? 'doing' : 'finish',
        title: '小面包车',
        price: 30,
        tip: '搬运'
      }
    })
    this.list = tourData
  }
}
</script>

<style lang="scss" scoped>
.title{
  margin: 0 .15rem;
  margin-top: .10rem;
  @include font (.18rem, $main-text, bold);
}
</style>
