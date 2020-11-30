<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="历史记录"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 空状态 -->
    <van-empty v-if="list.length === 0" description="暂无投诉建议记录" />
    <!-- 列表 -->
    <div class="list" v-for="item in list" :key="item.id">
      <div class="time">{{getTime(item.createTime)}}</div>
      <div class="info">
        <div class="info-header">
          <img src="@/assets/icons/suggest/suggest-1.png" alt="">
          <div class="info-title">{{kingType[item.king]}}</div>
        </div>
        <div class="info-content">{{item.remark}}</div>
        <div class="info-img-box">
          <div>
            <van-image v-for="(img, idx) in item.url"
              :key="idx" :src="img" class="info-image"
              width=".90rem" height=".70rem" fit="cover"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Image } from 'vant'
import { userComplaintDetail } from '@/api'

export default {
  components: {
    'van-image': Image
  },
  data: () => ({
    list: [],
    kingType: {
      1: '我要申诉',
      2: '我要投诉',
      3: '系统错误',
      4: '优化建议'
    }
  }),
  methods: {
    async handleReq () {
      const res = await userComplaintDetail()
      this.list = res.data.data
    },
    getTime (time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  },
  mounted () {
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.list{
  margin: .20rem auto;
  width: 3.45rem;

  .time{
    @include font (.12rem, $tip-text);
    margin-bottom: .10rem;
    text-align: center;
  }

  .info{
    border-radius: .05rem;
    background-color: $light-color;
    padding: .10rem .10rem .15rem .15rem;
    box-sizing: border-box;

    &-header{
      margin-bottom: .06rem;
      @include flex ($align: center);

      img{
        width: .20rem;
        height: 0.2rem;
      }
    }

    &-title{
      margin-left: .10rem;
      @include font (.14rem, $main-text, bold);
    }

    &-content{
      padding-left: .30rem;
      box-sizing: border-box;
      @include font (.14rem, $tip-text);
      margin-bottom: .15rem;
    }

    &-img-box{
      padding-left: .30rem;
      box-sizing: border-box;
      @include flex (space-between, center)
    }

    &-image{
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
