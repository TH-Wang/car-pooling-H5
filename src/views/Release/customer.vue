<template>
  <div>
    <van-form ref="form" @submit="handleSubmit">
      <div>
        <van-field
          readonly
          name="order_type"
          :value="order_type"
          label="发布类型"
          placeholder="请选择发布类型"
          @click="showOrderTypePicker = true"
          is-link arrow-direction="down"
        />
      </div>
      <div>
        <van-field
          label="余座"
          placeholder="请输入余座"
          name="seat"
          type="digit"
          v-model="seat"
          :rules="[{required: true}]"
        />
      </div>
    </van-form>

    <!-- 订单类型选择器 -->
    <van-popup v-model="showOrderTypePicker" position="bottom" round>
      <van-picker
        show-toolbar
        :default-index="0"
        :columns="orderTypeColumns"
        @confirm="handleOrderTypeConfirm"
        @cancel="showOrderTypePicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Form, Field, Popup, Picker } from 'vant'

export default {
  components: {
    'van-form': Form,
    'van-field': Field,
    'van-popup': Popup,
    'van-picker': Picker
  },
  data: () => ({
    orderTypeColumns: ['拼车', '上下班拼车', '顺路带物', '旅游包车'],
    order_type: 0,
    showOrderTypePicker: false,
    seat: ''
  }),
  methods: {
    handleOrderTypeConfirm (value) {
      this.order_type = value
      this.showOrderTypePicker = false
    },
    // 表单提交，所有校验通过后才执行此回调函数
    handleSubmit (values) {
      console.log(values)
    }
  }
}
</script>

<style lang="scss">
.van-field{
  width: 3.45rem;
  height: .38rem;
  background-color: $light-color;
  border-radius: .05rem;
  margin: 0 auto .20rem auto;
  position: relative;
  overflow: initial;
  font-size: .14rem;
  @include flex ($align:center);

  &__label{
    position: relative;

    &::after{
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: .14rem;
      background-color: #D8D8D8;
    }
  }

  .van-icon{
    font-size: .12rem
  }

  &__error-message{
    position: absolute;
    bottom: 0;
    transform: translateY(.2rem);
    font-size: .12rem;
  }
}
</style>
