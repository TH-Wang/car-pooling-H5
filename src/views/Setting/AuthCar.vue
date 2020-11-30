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
import { mapState } from 'vuex'
import { Collapse, CollapseItem } from 'vant'
import { max, isEmpty } from 'lodash'
import { userCarVerification, getUserDetail } from '@/api'
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
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async handleSubmit () {
      const failArr = []
      const userId = this.user.info.id
      // 循环提交
      for (let i = 0; i < this.count.length; i++) {
        const nowCar = i + 1
        // 如果当前车辆信息填写表单还没有渲染，则跳过
        if (!this.$refs['form' + nowCar]) continue
        // 获取表单信息
        const { err, values } = this.$refs['form' + nowCar][0].submit()
        // 表单校验有错误
        if (err) continue
        else {
          // 发起请求
          this.$toast.clear()
          this.$toast.loading(`正在校验并提交第${nowCar}辆车...`)
          const data = { ...values, userId }
          const res = await userCarVerification(data)
          if (res.data.status === 200) {
            this.$refs[`form${nowCar}`][0].clear()
            this.$toast.success(`第${nowCar}辆车提交成功`)
          } else {
            failArr.push(nowCar)
            this.$toast.fail(`第${nowCar}辆车提交失败`)
          }
        }
      }
      // 向用户反馈提交失败的车辆信息
      if (failArr.length > 0) {
        this.$dialog.alert({
          message: `第${failArr.join('，')}辆车提交失败，请检查是否为信息缺漏，或稍后再试`
        })
      }
      // 更新用户信息
      const res = await getUserDetail()
      this.$store.commit('setUserInfo', res.data.data)
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
