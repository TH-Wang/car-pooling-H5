<template>
  <div>
    <!-- 表单部分 -->
    <van-form ref="form" @submit="handleSubmit">
      <div>
        <van-field
          readonly
          name="order_type"
          :value="orderType"
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
      <div>
        <van-field
          readonly
          name="time"
          :value="timeValue"
          label="出发时间"
          is-link arrow-direction="down"
          @click="showTime = !showTime"
        >
          <template #input>
            <select-menu
              :show="showTime"
              v-model="timeValue"
              :columns="timeColumns"
            />
          </template>
        </van-field>
      </div>
      <!-- 时间选择器 -->
      <div>
        <van-field
          readonly
          name="time2"
          :value="time"
          label="时间"
          placeholder="请选择时间"
          @click="showTimePicker = true"
          is-link arrow-direction="down"
        />
      </div>
    </van-form>

    <!-- 提交部分 -->
    <div class="submit">
      <div class="submit-checkbox">
        <van-checkbox
          v-model="agreePact"
          icon-size=".15rem"
          checked-color="#FFCD00"
          shape="square"
        >我已阅读并同意发布拼车信息<span class="link">《合乘协议》</span></van-checkbox>
      </div>
      <div class="submit-checkbox">
        <van-checkbox
          v-model="agreePackage"
          icon-size=".15rem"
          checked-color="#FFCD00"
          shape="square"
        >天天拼车套餐，免去天天发布信息（非必选）</van-checkbox>
      </div>
      <main-button
        center
        style="margin-top:.22rem"
        @click="()=>{$refs.form.submit()}"
      >发布</main-button>
    </div>

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

    <!-- 时间选择器 -->
    <van-popup v-model="showTimePicker" position="bottom" round>
      <van-datetime-picker
        title="选择时间（年月日时分）"
        type="datetime"
        @confirm="handleTimeConfirm"
        @cancel="showTimePicker = false"
      />
    </van-popup>

    <!-- 联系号码 -->
    <div class="confirm-phone">
      请确认你的联系手机号
      <span class="phone">157 2020 0126</span>
      <span class="link">修改手机号</span>
    </div>

    <!-- 温馨提示 -->
    <div class="tip">
      <p>温馨提示</p>
      <p>请务必保证信息的真实，如被拼友投诉，将被平台限制发信息哦</p>
    </div>
  </div>
</template>

<script>
import { Form, Field, Popup, Picker, Checkbox, DatetimePicker } from 'vant'
import MainButton from '@/components/MainButton'
import SelectMenu from '@/components/SelectMenu'

export default {
  components: {
    'van-form': Form,
    'van-field': Field,
    'van-popup': Popup,
    'van-picker': Picker,
    'van-datetime-picker': DatetimePicker,
    'van-checkbox': Checkbox,
    'main-button': MainButton,
    'select-menu': SelectMenu
  },
  data: () => ({
    // 订单类型
    orderType: '拼车',
    orderTypeColumns: ['拼车', '上下班拼车', '顺路带物', '旅游包车'],
    showOrderTypePicker: false,
    // 座位
    seat: '',
    // 出发时间
    timeValue: 0,
    timeColumns: ['上午', '中午', '下午', '晚高峰'],
    // 选择时间
    time: '',
    currentDate: new Date(),
    showTime: false,
    showTimePicker: false,
    agreePact: true,
    agreePackage: false
  }),
  methods: {
    handleOrderTypeConfirm (value) {
      this.order_type = value
      this.showOrderTypePicker = false
    },
    // 表单提交，所有校验通过后才执行此回调函数
    handleSubmit (values) {
      console.log(values)
    },
    handleTimeConfirm (time) {
      console.log(time)
      // this.time = time
      this.showTimePicker = false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/field.scss';
@import '@/assets/scss/release.scss';
</style>
