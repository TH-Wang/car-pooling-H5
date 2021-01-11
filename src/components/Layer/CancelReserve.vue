<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      round
      closeable
      safe-area-inset-bottom
      @close="$emit('change', false)"
    >
      <div class="content">
        <!-- 标题、描述 -->
        <div class="title">取消预约</div>
        <div class="description">取消预约将会扣掉您的信用分，请说明取消预约原因！</div>

        <!-- 选项列表 -->
        <van-radio-group class="radio-container" v-model="radio">
          <div
            class="radio-item"
            v-for="opt in options"
            :key="opt.id"
            @click="handleChange($event, opt.id)"
          >
            <span class="radio-item-label">{{opt.reson}}</span>
            <van-radio :name="opt.id" checked-color="#0AD593" icon-size=".20rem" />
          </div>
        </van-radio-group>

        <!-- 提交按钮 -->
        <main-button width="100%" color="green" @click="handleSubmit">提交</main-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { selectUnsubscribeReason } from '@/api'
import { Popup, RadioGroup, Radio } from 'vant'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-popup': Popup,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'main-button': MainButton
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    show: false,
    radio: 0,
    options: []
  }),
  methods: {
    // 查询退订原因
    async reqReasonList () {
      const res = await selectUnsubscribeReason(2)
      this.options = res.data.data
      this.radio = res.data.data[0].id
    },
    // 改变事件
    handleChange (e, idx) {
      this.radio = idx
    },
    // 提交事件
    handleSubmit () {
      const _this_ = this
      this.$emit('submit', {
        id: _this_.radio,
        reson: _this_.options.find(i => i.id === _this_.radio).reson
      })
    }
  },
  created () {
    this.reqReasonList()
  },
  watch: {
    visible: function (newVal) {
      this.show = newVal
    }
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
    max-width: 2.27rem;
    text-align: center;
    margin: .10rem auto .20rem auto;
    @include font (.16rem, $tip-text);
  }

  .radio-container{
    margin-bottom: .44rem;

    // 选项
    .radio-item{
      width: 100%;
      height: .60rem;
      border-bottom: solid 1px $normal-text;
      @include flex (space-between, center);

      &-label{
        @include font (.16rem, $main-text);
      }
    }
  }
}
</style>
