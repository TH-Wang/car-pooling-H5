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
    <div class="history" v-for="(item, index) in dataSource" :key="index">
      <div class="header">
        <div class="header-top">
          <div :class="`header-tag tag-${getTagColor(item.type)}`">
            {{getTagText(item.type)}}
          </div>
          <div class="header-title">{{item.name}}</div>
          <div class="header-status">{{getStatusText(item.type)}}</div>
        </div>
        <div class="header-time">
          <img src="@/assets/icons/order/time.png" alt="">
          <span>2020-03-23  08:00</span>
        </div>
      </div>
      <div class="content">
        <div class="content-item" v-for="(el, idx) in contentList" :key="idx">
          <div class="content-label">{{el.label}}</div>
          <div class="content-detail">{{item[el.key]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    contentList: [
      { label: '申请区域', key: 'area' },
      { label: '站长类型', key: 'site_type' },
      { label: '最初渠道', key: 'channel' },
      { label: '微信号', key: 'wechat' },
      { label: '公众号', key: 'public_number' },
      { label: '公众号名', key: 'public_name' },
      { label: '手机号', key: 'phone' }
    ],
    dataSource: []
  }),
  methods: {
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
  mounted () {
    const data = {
      name: '陈女士',
      area: '渝北区',
      site_type: '站长',
      channel: '这里是最初渠道',
      wechat: 'loyojjom',
      public_number: 'public_number',
      public_name: '这里是公众号名称',
      phone: '1382090929'
    }
    this.dataSource = new Array(3).fill({}).map((item, index) => ({
      ...data,
      type: index
    }))
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

    &-item{
      margin: .15rem 0;
      @include flex;
    }

    &-label{
      flex-shrink: 0;
      width: .70rem;
      @include font (.12rem, $tip-text);
      transform: translateY(.02rem);
    }

    &-detail{
      flex: 1;
      @include font (.14rem, $main-text);
    }
  }
}
</style>
