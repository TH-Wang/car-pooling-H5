<template>
  <div>
    <van-popup
      v-model="visible"
      position="bottom"
      round
      closeable
      safe-area-inset-bottom
      @closed="$emit('close')"
    >
      <div class="content">
        <!-- 标题、描述 -->
        <div class="title">请选择退订原因（车主不可见）</div>
        <div class="description">温馨提示：请勿使用退订的方式协助车主逃费，这将会影响您的诚信值，严重着将会列入黑名单。</div>

        <!-- 退订原因 -->
        <div class="headline">退订原因</div>
        <div class="reason">
          <div
            v-for="item in reasonList"
            :key="item.id"
            @click="reasonId = item.id"
            :class="{
              'reason-item': reasonId !== item.id,
              'reason-item-active': reasonId === item.id
          }">{{item.reson}}</div>
        </div>

        <!-- 分割线 -->
        <div class="line"></div>

        <!-- 我要投诉 -->
        <div class="headline">
          <span>我要投诉</span>
          <van-switch v-model="complaint" size=".2rem" active-color="#FFCD00" />
        </div>
        <textarea
          v-show="complaint"
          v-model="complaintContent"
          class="textarea"
          row="3"
          placeholder="请简要说明情况，此内容仅管理员可见。"
        />

        <!-- 提交按钮 -->
        <main-button width="100%" @click="handleSubmit">提交</main-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { selectUnsubscribeReason } from '@/api'
import { Popup, Switch } from 'vant'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-popup': Popup,
    'van-switch': Switch,
    'main-button': MainButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    reasonId: 0,
    reasonList: ['联系不上车主', '车辆信息不符', '行程有变', '车主没有座位'],
    complaint: false,
    complaintContent: ''
  }),
  methods: {
    // 请求原因列表
    async reqReasonList () {
      const res = await selectUnsubscribeReason()
      this.reasonList = res.data.data
    },
    // 提交
    handleSubmit () {
      const unsubscribeResonId = this.reasonId
      const context = this.complaintContent
      this.$emit('submit', { unsubscribeResonId, context })
    }
  },
  created () {
    this.reqReasonList()
  }
}
</script>

<style lang="scss" scoped>
.content{
  padding: .20rem .15rem;
  box-sizing: border-box;

  // 标题
  .title{
    text-align: center;
    @include font (.17rem, $main-text, bold);
  }

  // 描述
  .description{
    max-width: 3rem;
    text-align: center;
    margin: .10rem auto .20rem auto;
    @include font (.16rem, $tip-text);
  }

  // 内容的标题
  .headline{
    @include flex(space-between, center);
    @include font(.16rem, $main-text);
    margin-bottom: .15rem;
  }

  // 退订原因
  .reason{
    @include flex(flex-start, center);
    flex-wrap: wrap;

    .item{
      margin-bottom: .12rem;
      margin-right: .10rem;
      padding: .04rem .08rem;
      border-radius: 2px;
    }

    &-item{
      @extend .item;
      background-color: $linecard-color;
      @include font(.14rem, $sub-text, bold);
    }

    &-item-active{
      @extend .item;
      background-color: $main-color;
      @include font(.14rem, #FFFFFF, bold);
    }
  }

  // 分割线
  .line{
    height: 1px;
    background-color: $normal-text;
    margin: .10rem 0 .15rem 0;
  }

  // 退订原因
  .textarea{
    padding: .08rem .15rem;
    box-sizing: border-box;
    background-color: #fafafa;
    font-size: .14rem;
    border: none;
    width: 100%;
    height: .6rem;
    border-radius: 4px;
    margin-bottom: .2rem;
  }
}
</style>
