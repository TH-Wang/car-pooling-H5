<template>
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="详情"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <div class="header">
      <div class="header-tip">* 照片、尺寸仅供参考，以实际接单车辆为准</div>
      <van-image
        width="1.71rem"
        height=".83rem"
        fit="cover"
        style="margin: 0 .87rem"
        :src="record.img"
      />
      <div class="header-top">
        <div class="header-title">{{record.carName}}</div>
      </div>
      <div class="header-info">
        <div class="header-info-detail">
          <span>载重：{{record.load}}kg</span>
          <span>|</span>
          <span>长宽高：{{record.widthHeight}}m</span>
          <span>|</span>
          <span>容积：{{record.volume}}m³</span>
        </div>
        <div class="header-info-time">
          可服务时间段：{{week[record.startWeek]}} - {{week[record.endWeek]}}
        </div>
      </div>
    </div>

    <div class="main-title">图文详情</div>
    <p class="detail">{{record.details}}</p>
    <van-image
      width="3.45rem"
      height="2rem"
      :src="record.detailsImg"
    ></van-image>
<!--
    <div class="main-title">费用说明</div>
    <p class="detail">1. 一人一位一费，1.2cm以下小孩半价，不能乱吃拉面了吗联盟里面了麻辣小面
2. 那蓝蓝路发生呢了哪里哪里 买啦买到啦
3. 你擦了那份南斯拉夫教练是德弗里斯你离那里是德弗里斯难吃死了
4. 麻辣；什么；啊什么的；阿里斯顿家；立即</p>

    <div class="main-title">购买须知</div>
    <p class="detail">1. 蠢哭了；身份；阿瑟费吗；阿妈了马拉松拿出来说那拉氏奶粉门口吃辣椒水里打瞌睡
2. 那蓝蓝路发生呢了哪里哪里 买啦买到啦
3. 你擦了那份南斯拉夫教练是德弗里斯你离那里是德弗里斯难吃死了
4. 麻辣；什么；啊什么的；阿里斯顿家；立即</p> -->

  <main-button
    center
    style="margin: .20rem auto .30rem auto;"
    @click="$router.push({
      path: '/common/tourcar/placeorder',
      query: {type: 'car', id: record.id}
  })">立即购买</main-button>
  </div>
</template>

<script>
import { getBusDetailById } from '@/api'
import { Image } from 'vant'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-image': Image,
    'main-button': MainButton
  },
  data: () => ({
    id: null,
    record: {},
    week: {
      0: '周日',
      1: '周一',
      2: '周二',
      3: '周三',
      4: '周四',
      5: '周五',
      6: '周六'
    }
  }),
  methods: {
    async handleReq () {
      const res = await getBusDetailById(this.id)
      this.record = res.data.data
    }
  },
  created () {
    this.id = this.$route.query.id
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.page{
  margin: 0 .15rem;

  .image{
    border-radius: .05rem;
  }

  .header{
    padding: .15rem 0;
    border-bottom: dashed 1px $normal-text;

    &-tip{
      @include font (.12rem, $sub-text, bold);
      margin-bottom: .10rem;
    }

    &-top{
      @include flex (space-between, center);
    }

    &-title{
      margin: .10rem 0 .05rem 0;
      @include font (.16rem, $main-text, bold);
    }

    &-info{
      @include font (.12rem, $tip-text);

      &-detail{
        @include flex (space-between, center);
      }
      &-time{
        margin-top: .10rem;
      }
    }
  }

  .main-title{
    margin: .20rem 0 .10rem 0;
    @include font (.18rem, $main-text, bold);
  }
  .detail{
    @include font (.14rem, $tip-text);
    line-height: .20rem;
    margin-bottom: .10rem;
  }
}
</style>
