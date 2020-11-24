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
        name="telPhone"
        input-style="font-size:0.18rem;font-weight:bold"
        readonly
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
        name="orderNum"
        type="tel"
        max-length="1"
        clearable
        placeholder="请输入预定人数"
        :rules="[{required: true}]"
      />

      <!-- 上车点 -->
      <custom-input
        name="startAddr"
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
        name="endAddr"
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
import { mapState } from 'vuex'
import { Checkbox } from 'vant'
import { commitOrder } from '@/api'
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
    agree: true,
    pprId: null
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return

      // 提交的数据
      const pprId = parseInt(this.pprId)
      const data = {
        ...values,
        orderNum: parseInt(values.orderNum),
        pprIdCar: pprId
      }

      // 发送请求
      const res = await commitOrder(data)
      if (res.data.data === 1 || res.data.msg === '成功') {
        this.$router.push('/common/order/feedback/success')
      } else {
        this.$router.push({ name: 'OrderFail', params: { msg: res.data.msg } })
      }
    }
  },
  created () {
    // 获取拼车单pprId
    const pprId = this.$route.query.pprId
    this.pprId = pprId
  },
  mounted () {
    // 设置用户登录的手机号
    const phone = this.user.info.phone
    this.$refs.form.setValues({ telPhone: phone })
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
