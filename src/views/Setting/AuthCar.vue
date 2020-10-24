<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="车辆认证"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 折叠表单 -->
    <van-collapse
      style="margin-top: .20rem"
      v-model="activeCollapse"
      @change="handleCollapseChange"
      :border="false"
    >
      <van-collapse-item
        v-for="(cols, index) in count"
        :key="index"
        :title="`请添加您的第${index+1}辆车`"
        :name="index+1"
        size="large"
      >
        <div v-if="forms[index]">
          <custom-form :ref="`form${index+1}`">
            <custom-item
              v-for="(item, idx) in forms[index]"
              :key="`${index}-${idx}`"
              :options="item"
            />
            <div class="auth-title">请上传车辆行驶证</div>
            <custom-upload name="license" description="请上传车辆行驶证" required/>
            <div class="auth-title">车正面照片</div>
            <custom-upload name="car_front" description="请上传车正面照片" required/>
          </custom-form>
        </div>
      </van-collapse-item>
    </van-collapse>

    <!-- 继续添加 -->
    <div class="add-form" @click="handleAddCarForm">
      <van-icon name="plus"/>
      <span>继续添加</span>
    </div>

    <!-- 确认按钮 -->
    <main-button
      style="margin: .50rem auto .30rem auto"
      @click="handleSubmit"
      center
    >确认</main-button>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant'
import { max, isEmpty } from 'lodash'
import { Form, Item, Upload } from '@/components/Form'
import MainButton from '@/components/MainButton'
import formConfig from './carConfig'

export default {
  components: {
    'van-collapse': Collapse,
    'van-collapse-item': CollapseItem,
    'custom-form': Form,
    'custom-item': Item,
    'custom-upload': Upload,
    'main-button': MainButton
  },
  data: () => ({
    activeCollapse: [1],
    count: new Array(3).fill(null),
    forms: [formConfig]
  }),
  methods: {
    handleSubmit () {
      for (let i = 0; i < this.count; i++) {
        const { err, values } = this.$refs[`form${i}`].submit()
        if (!err) {
          console.log(`第${i}辆车：`)
          console.log(values)
        }
      }
    },
    // 折叠表单发生变化
    handleCollapseChange (value) {
      const maxCount = max(value)
      this.handleJudgCarAuthCount(maxCount)
    },
    // 点击添加车辆认证按钮
    handleAddCarForm () {
      const count = this.count.length + 1
      const added = this.handleJudgCarAuthCount(count)
      if (added && this.forms.length > this.count.length) {
        this.count = new Array(this.forms.length).fill(null)
      }
    },
    // 判断已填写车辆信息的个数
    handleJudgCarAuthCount (count) {
      if (count > this.forms.length) {
        const formsLen = this.forms.length
        for (let i = 0; i < formsLen; i++) {
          const { errors } = this.$refs[`form${i + 1}`][0].submit()
          if (!isEmpty(errors)) {
            // 展开需要需要填写的表单
            if (this.activeCollapse.indexOf(i + 1) === -1) {
              this.activeCollapse.push(i + 1)
            }
            // 提示
            this.$toast({ message: `请先完成第${i + 1}辆车信息的录入`, position: 'bottom' })
            return false
          }
        }
        this.forms.push(formConfig)
        return true
      }
    }
  }
}
</script>

<style lang="scss">
.van-collapse-item__content{
  padding-top: 0;
  padding-bottom: 0;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border: none;
}
.auth-title{
  margin-top: .20rem;
  @include font (.17rem, $main-text, bold);
}
.add-form{
  width: 3.45rem;
  height: .38rem;
  line-height: .38rem;
  text-align: center;
  margin: 0 auto;
  margin-top: .20rem;
  background-color: $light-color;
  @include font (.14rem, $main-color);

  span{
    margin-left: .04rem;
  }
}
</style>
