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
        readonly
        placeholder="请输入上车点"
        @click="handleSearch($event, 'start')"
        :rules="[{required: true}]"
      >
        <template #suffix>
          <span class="input-link" @click="handleSearch($event, 'start')">定位</span>
        </template>
      </custom-input>

      <!-- 到达地点 -->
      <custom-input
        name="endAddr"
        clearable
        readonly
        placeholder="请输入到达地点"
        @click="handleSearch($event, 'end')"
        :rules="[{required: true}]"
      >
        <template #suffix>
          <span class="input-link" @click="handleSearch($event, 'end')">搜索</span>
        </template>
      </custom-input>

      <!-- 备注 -->
      <custom-input
        name="remark"
        clearable
        placeholder="输入备注"
      />

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
    <!-- <map-view /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Checkbox } from 'vant'
import EventBus from '@/utils/eventBus'
import { commitOrder } from '@/api'
import { Form, Input } from '@/components/Form'
// import MapView from '@/components/MapView'
import MainButton from '@/components/MainButton'

export default {
  name: 'Reserve',
  components: {
    'van-checkbox': Checkbox,
    'custom-form': Form,
    'custom-input': Input,
    'main-button': MainButton
    // 'map-view': MapView
  },
  data: () => ({
    agree: true,
    pprId: null
  }),
  computed: {
    ...mapState(['user', 'search']),
    startAddrName () {
      return this.search.startAddr.name
    },
    endAddrName () {
      return this.search.endAddr.name
    }
  },
  methods: {
    // 提交预约信息
    async handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return

      // 提交的数据
      const pprId = parseInt(this.pprId)
      const { startAddr, endAddr } = this.search
      const data = {
        ...values,
        startAddr: startAddr.name,
        endAddr: endAddr.name,
        orderNum: parseInt(values.orderNum),
        pprIdCar: pprId,
        status: 5
      }

      // 发送请求
      const res = await commitOrder(data)
      if (res.data.msg === '成功') {
        EventBus.$emit('home-refresh')
        this.$router.push({
          path: '/common/order/feedback/success',
          query: { id: res.data.data }
        })
      } else {
        const { startAddr, endAddr } = values
        this.$router.push({
          name: 'OrderFail',
          params: { msg: res.data.msg, startAddr, endAddr }
        })
      }
    },
    // 跳转到搜索位置页面
    handleSearch (e, type) {
      this.$router.push(`/common/search/pos/${type}?type=common`)
    }
  },
  mounted () {
    // 获取拼车单pprId
    this.pprId = this.$route.query.id
    // 设置位置信息
    const { startAddr, endAddr } = this.search
    // 设置用户登录的手机号
    const phone = this.user.info.phone
    this.$refs.form.setValues({
      startAddr: startAddr.name,
      endAddr: endAddr.name,
      telPhone: phone
    })
  },
  watch: {
    startAddrName: function (newVal) {
      this.$refs.form.setValueField('startAddr', newVal)
    },
    endAddrName: function (newVal) {
      this.$refs.form.setValueField('endAddr', newVal)
    }
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
    color: $main-color;
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
