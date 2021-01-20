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
            <custom-upload
              name="carTravelPhotoLeft"
              description="请上传车辆行驶证左面"
              base-image="car-front.png"
              required
            />
            <custom-upload
              name="carTravelPhotoRight"
              description="请上传车辆行驶证右面"
              base-image="car-back.png"
              required
            />
            <div class="auth-title">车正面照片</div>
            <custom-upload name="carPhoto" description="请上传车正面照片" required/>
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
import { userCarVerification, getUserDetail, userCarDetail } from '@/api'
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
    forms: new Array(3).fill(formConfig)
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 更新显示已认证的车辆信息
    async getCarInfo () {
      if (this.user.carList.length === 0) {
        // 发送请求
        const res = await userCarDetail()
        // 保存到内存中
        this.$store.commit('setCarInfo', res.data.data)
      }
    },
    // 更新已认证车辆信息
    updateAuthedCars () {
      const authedLen = this.user.carList.length
      for (let i = 0; i < authedLen; i++) {
        const itemForm = `form${i + 1}`
        if (this.$refs[itemForm]) {
          this.$refs[itemForm][0].setValues(this.user.carList[i])
        }
      }
    },
    // 提交车辆信息
    async handleSubmit () {
      const failArr = []
      const successArr = []
      const userId = this.user.info.id
      // 循环提交
      const init = this.user.carList.length
      for (let i = init; i < this.count.length; i++) {
        const nowCar = i + 1
        // 如果当前车辆信息填写表单还没有渲染，则跳过
        if (!this.$refs['form' + nowCar]) continue
        // 获取表单信息
        const { err, values } = this.$refs['form' + nowCar][0].submit()
        // 表单校验有错误
        if (err) {
          failArr.push(nowCar)
          continue
        } else {
          // 发起请求
          this.$toast.clear()
          this.$toast.loading(`正在校验并提交第${nowCar}辆车...`)
          const data = { ...values, userId }
          const res = await userCarVerification(data)
          if (res.data.status === 200) {
            this.$toast.success(`第${nowCar}辆车提交成功`)
            successArr.push(nowCar)
          } else {
            failArr.push(nowCar)
          }
        }
      }
      // 更新车辆信息
      this.updateAuthedCars()
      // 向用户反馈提交失败的车辆信息
      let msg = ''
      if (successArr.length > 0) {
        msg += `第<span style="color:#FFCD00">${successArr.join('，')}辆车</span>提交成功，需要等待后台管理员的审核`
      }
      if (failArr.length > 0) {
        msg += `<br/>第<span style="color:#ee0a24">${failArr.join('，')}辆车</span>提交失败，请检查信息是否填写完整，或稍后再试`
      }
      this.$dialog.alert({ message: msg })
      // 更新用户信息
      const res = await getUserDetail()
      this.$store.commit('setUserInfo', res.data.data)
      // 更新认证车辆信息
      // await this.getCarInfo()
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
  },
  mounted: async function () {
    await this.getCarInfo()
    this.updateAuthedCars()
  },
  updated () {
    this.updateAuthedCars()
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
