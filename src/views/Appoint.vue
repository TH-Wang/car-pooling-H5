<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="乘客预约"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 搜索框 -->
    <search-card style="margin-top:.20rem" :hasButton="false" />

    <!-- 表单 -->
    <custom-form ref="form">
      <custom-item
        v-for="item in formOptions"
        :key="item.id"
        :options="item"
      />
    </custom-form>

    <!-- 提交按钮 -->
    <main-button
      center
      style="margin:.50rem auto .30rem auto"
      @click="handleSubmit"
    >提交预约</main-button>

    <!-- 温馨提示 -->
    <order-info-tips :tips="tips" />
  </div>
</template>

<script>
import { Form, Item } from '@/components/Form'
import { Tips } from '@/components/OrderInfo'
import SearchCard from '@/components/SearchCard'
import MainButton from '@/components/MainButton'

const options = [
  {
    type: 'timer',
    name: 'time',
    label: '时间',
    placeholder: '请选择时间',
    timerType: 'time',
    defaultTime: '9:00'
  },
  {
    type: 'field',
    name: 'people',
    label: '人数',
    placeholder: '请输入人数',
    inputType: 'tel',
    rules: [{ pattern: /^\d$/, message: '请输入正确的格式' }]
  },
  {
    type: 'field',
    name: 'wait_time',
    label: '等待时间',
    placeholder: '请输入时间'
  },
  {
    type: 'field',
    name: 'start',
    label: '距离起点',
    placeholder: '请输入距离'
  },
  {
    type: 'field',
    name: 'end',
    label: '距离终点',
    placeholder: '请输入距离'
  }
]

export default {
  components: {
    'custom-form': Form,
    'custom-item': Item,
    'search-card': SearchCard,
    'main-button': MainButton,
    'order-info-tips': Tips
  },
  data: () => ({
    formOptions: options,
    tips: [
      '温馨提示',
      '1.拼友提交预约请求后，系统会持续匹配与您出行时间相符的车主，并实时通知您。',
      '2.<span style="color:#FFCD00">匹配成功，不是订座成功。</span>此功能仅仅是通知提醒功能，拼友还要自己判断车主路线是否适合自己，并进行预订。'
    ]
  }),
  methods: {
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (!err) console.log(values)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
