<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="预定"
      left-arrow
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 表单主体 -->
    <custom-form ref="form">

      <!-- 手机号 -->
      <custom-input
        name="phone"
        input-style="font-size:0.18rem;font-weight:bold"
        readonly
        :formatter="phoneFormatter"
      >
        <template #suffix>
          <span
            class="input-link"
            @click="$router.push('/common/phone/modify')"
          >修改手机号</span>
        </template>
      </custom-input>

      <!-- 预定人数 -->
      <custom-input
        name="people"
        type="tel"
        max-length="1"
        clearable
        placeholder="请输入预定人数"
        :rules="[{required: true}, {validator: peopelValidator, message: '人数应在1-5之间'}]"
      />

      <!-- 上车点 -->
      <custom-input
        name="start"
        clearable
        placeholder="请输入上车点"
        :rules="[{required: true}]"
      >
        <template #suffix>
          <span class="input-link">定位</span>
        </template>
      </custom-input>

      <!-- 到达地点 -->
      <custom-input
        name="end"
        clearable
        placeholder="请输入到达地点"
        :rules="[{required: true}]"
      >
        <template #suffix>
          <span class="input-link">定位</span>
        </template>
      </custom-input>

    </custom-form>

    <!-- 立即预定 -->
    <div style="margin-top: .50rem">
      <main-button @click="handleSubmit" center>立即预定</main-button>
    </div>

    <!-- 同意协议 -->
    <div class="agree">
      <van-checkbox
        v-model="agree"
        icon-size=".16rem"
        checked-color="#FFCD00"
        class="agree-checkbox"
      />我已阅读并同意发布拼车信息<span class="link">《合乘协议》</span>
    </div>

    <!-- 路线地图 -->
    <div class="map"></div>
  </div>
</template>

<script>
import { Checkbox } from 'vant'
import { Form, Input } from '@/components/Form'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'van-checkbox': Checkbox,
    'custom-form': Form,
    'custom-input': Input,
    'main-button': MainButton
  },
  data: () => ({
    agree: true
  }),
  methods: {
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return
      console.log(values)
      const path = values.peopel % 2 === 0 ? 'success' : 'fail'
      this.$router.push(`/common/order/feedback/${path}`)
    },
    peopelValidator (value) {
      const number = parseInt(value)
      return (number >= 1 && number <= 5)
    },
    phoneFormatter (value) {
      if (value.length > 6) {
        return `${value.substr(0, 3)} **** ${value.substr(7, 11)}`
      }
    }
  },
  mounted () {
    this.$dialog.alert({
      message: '人数输入: 1预约失败，输入: 2预约成功'
    })
    this.$refs.form.setValues({
      phone: '155 **** 6393',
      start: '观音桥',
      end: '太古里'
    })
  }
}
</script>

<style lang="scss" scoped>
.input-link{
  margin-left: .10rem;
  @include font (.16rem, $main-color);
}
.agree{
  margin-top: .15rem;
  @include flex (center, center);
  font-size: .12rem;

  &-checkbox{
    margin-right: .06rem;
  }

  .link{
    font-size: .12rem;
  }
}

.map{
  width: 3.45rem;
  height: 1.7rem;
  margin: .30rem auto .50rem auto;
  background-color: $linecard-color;
  border-radius: .05rem;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);
}
</style>
