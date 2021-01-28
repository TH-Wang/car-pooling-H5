<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="申请记录"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 申请列表 -->
    <van-empty v-if="dataSource.length === 0" description="暂无申请记录" />
    <div class="history" v-for="(item, index) in dataSource" :key="index">
      <div class="header">
        <div class="header-top">
          <div :class="`header-tag tag-${getTagColor(item.type)}`">
            {{item.state}}
          </div>
          <div class="header-title">{{item.realName}}</div>
          <div class="header-status">{{getStatusText(item.type)}}</div>
        </div>
        <div class="header-time">
          <img src="@/assets/icons/order/time.png" alt="">
          <span>2020-03-23  08:00</span>
        </div>
      </div>
      <div class="content">
        <div class="item"><div>申请区域</div><span>{{item.areaName}}</span></div>
        <div class="item"><div>站长类型</div><span>{{siteType[item.type]}}</span></div>
        <div class="item"><div>微信号</div><span>{{item.vxNumber}}</span></div>
        <div class="item"><div>公众号</div><span>{{item.tencentIsux}}</span></div>
        <div class="item"><div>公众号名</div><span>{{item.tencentIsuxName}}</span></div>
        <div class="item"><div>手机号</div><span>{{item.phone}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getApplications } from '@/api'

export default {
  data: () => ({
    dataSource: [],
    siteType: {
      1: '站长',
      2: '副站长'
    }
  }),
  methods: {
    async handleReq () {
      const res = await getApplications({ startPage: 1, pageSize: 100 })
      this.dataSource = res.data.data.list
    },
    getTagColor (type) {
      switch (type) {
        case 0: return 'pending'
        case 1: return 'fail'
        case 2: return 'success'
      }
    },
    getTagText (type) {
      switch (type) {
        case 0: return '申请中'
        case 1: return '申请失败'
        case 2: return '申请成功'
      }
    },
    getStatusText (type) {
      switch (type) {
        case 0: return '加速一下'
        case 1: return '再次提交'
        case 2: return ''
      }
    }
  },
  created () {
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.history{
  margin: .20rem .15rem;
  border-radius: .05rem;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);

  .header{
    padding: .15rem .15rem .10rem .15rem;
    box-sizing: border-box;
      border-bottom: dashed 2px $normal-text;

    &-top{
      @include flex (space-between, center);
    }

    &-tag{
      flex-shrink: 0;
      width: .52rem;
      text-align: center;
      border-radius: .02rem;
      background-color: $aid-blue-color;
      @include font (.11rem, #fff);
    }

    &-title{
      @include font (.16rem, $main-text, bold);
      margin: 0 .10rem;
      flex: 1;
    }

    &-status{
      @include font (.16rem, $main-color, bold);
    }

    &-time{
      margin-top: .10rem;
      @include font (.12rem, $tip-text);

      img{
        width: 0.12rem;
        height: 0.12rem;
        margin-right: .06rem;
        vertical-align: text-bottom;
      }
    }
  }

  .tag-pending{
    background-color: $sub-color;
  }
  .tag-fail{
    background-color: #FF6A20;
  }
  .tag-success{
    background-color: $aid-blue-color;
  }

  .content{
    padding: 1px .15rem;
    box-sizing: border-box;

    .item{
      margin: .15rem 0;
      @include flex;

      & > div {
        flex-shrink: 0;
        width: .70rem;
        @include font (.12rem, $tip-text);
        transform: translateY(.02rem);
      }

      span{
        flex: 1;
        display: block;
        @include font (.14rem, $main-text);
      }
    }
  }
}
</style>
