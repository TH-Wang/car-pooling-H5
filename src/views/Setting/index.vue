<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 头像 -->
    <div class="avatar-container">
      <div class="avatar">
        <van-image
          @click="previewAvatar" :src="user.info.headimg"
          width=".60rem" height=".60rem" round fit="cover"
        />
        <div class="avatar-title">头像</div>
      </div>
      <div class="avatar-right" @click="$refs.file.click()">
        <span class="cell-text">修改头像</span><van-icon name="arrow"/>
        <input
          type="file"
          ref="file"
          accept="image/*"
          hidden
          @change="handleFileChange"
        />
      </div>
    </div>

    <!-- 修改昵称 -->
    <div class="cell" @click="handleOpenDialog">
      <div class="cell-left">
        <img src="@/assets/icons/setting/smile.png" alt="">修改昵称
      </div>
      <div class="cell-right">
        <span class="cell-text-main">{{user.info.username}}</span><van-icon name="arrow"/>
      </div>
    </div>

    <!-- 修改昵称对话框 -->
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      confirm-button-color="#0AD593"
      width="2.80rem"
      @confirm="setUsername"
    ><input
        ref="input"
        type="text"
        v-model="username"
        class="dialog-input"
        placeholder="由汉字、字母、下滑线组成"
      >
    </van-dialog>

    <!-- 修改手机号 -->
    <div class="cell" @click="$router.push('/common/phone/modify')">
      <div class="cell-left">
        <img src="@/assets/icons/setting/phone.png" alt="">修改手机号
      </div>
      <div class="cell-right">
        <span class="cell-text-main">{{user.info.phone}}</span><van-icon name="arrow"/>
      </div>
    </div>

    <!-- 身份证认证 -->
    <div class="cell" @click="handleLinkAuth($event, 'idnumstatus', '/common/auth/idcard')">
      <div class="cell-left">
        <img src="@/assets/icons/setting/idcard.png" alt="">身份证认证
      </div>
      <div class="cell-right">
        <span v-if="!Authed('idnumstatus')" class="cell-text">立即认证</span>
        <span v-else class="cell-text-main">已认证</span>
        <van-icon name="arrow"/>
      </div>
    </div>

    <!-- 驾驶证认证 -->
    <div class="cell" @click="handleLinkAuth($event, 'driverlicensestatus', '/common/auth/license')">
      <div class="cell-left">
        <img src="@/assets/icons/setting/card.png" alt="">驾驶证认证
      </div>
      <div class="cell-right">
        <span v-if="!Authed('driverlicensestatus')" class="cell-text">驾驶证认证</span>
        <span v-else class="cell-text-main">已认证</span>
        <van-icon name="arrow"/>
      </div>
    </div>

    <!-- 车辆认证 -->
    <div class="cell" @click="handleLinkAuth($event, 'carstatus', '/common/auth/car', true)">
      <div class="cell-left">
        <img src="@/assets/icons/setting/car.png" alt="">车辆认证
      </div>
      <div class="cell-right">
        <span v-if="!Authed('carstatus')" class="cell-text">车辆认证</span>
        <span v-else class="cell-text-main">已认证</span>
        <van-icon name="arrow"/>
      </div>
    </div>

    <!-- 投诉建议 -->
    <div class="cell" @click="$router.push('/common/suggest')">
      <div class="cell-left">
        <img src="@/assets/icons/setting/suggest.png" alt="">投诉建议
      </div>
      <div class="cell-right">
        <van-icon name="arrow"/>
      </div>
    </div>

    <div class="logout" @click="handleLogout">退出登录</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Image, ImagePreview } from 'vant'
import { getUserDetail, updateUserInfo, uploadFile } from '@/api'

export default {
  components: {
    'van-image': Image
  },
  data: () => ({
    show: false,
    username: ''
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 预览头像
    previewAvatar () {
      const avatar = this.user.info.headimg
      ImagePreview({
        images: [avatar],
        showIndex: false
      })
    },
    // 点击修改头像
    async handleFileChange (e) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      try {
        this.$toast.loading('上传中...')
        // 上传头像图片
        const res = await uploadFile(formData)
        // 请求修改头像
        const updateRes = await updateUserInfo({ headimg: res.data.data })
        this.$toast.clear()
        if (updateRes.data.status === 200) {
          // 更新用户信息
          await this.resetUserInfo()
          this.$toast.success('修改成功')
        } else throw new Error('请求头像失败')
      } catch (error) {
        console.log(error)
        this.$toast.clear()
        this.$toast.fail('修改失败\n请稍后再试')
      }
    },
    // 点击设置昵称按钮
    handleOpenDialog () {
      this.show = true
      this.$nextTick(() => {
        this.username = this.user.info.username
        this.$refs.input.focus()
      })
    },
    // 发送修改昵称的请求
    async setUsername () {
      const username = this.username
      this.$toast.loading('修改中...')
      const res = await updateUserInfo({ username })
      this.$toast.clear()
      if (res.data.msg === '成功') {
        await this.resetUserInfo()
        this.$toast.success('修改成功')
      } else this.$toast.fail('修改失败\n请稍后再试')
    },
    // 更新个人信息
    async resetUserInfo () {
      const res = await getUserDetail()
      this.$store.commit('setUserInfo', res.data.data)
      this.$store.commit('setToken', res.data.data.token)
    },
    // 进入认证页面
    handleLinkAuth (e, type, url, skip) {
      if (!this.Authed(type) || skip) this.$router.push(url)
    },
    // 判断是否已认证
    Authed (type) {
      return this.user.info[type] === 'YES'
    },
    // 退出登录
    handleLogout () {
      this.$store.commit('clearToken')
      this.$router.push('/common/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container{
  height: 1rem;
  padding: 0 .15rem;
  box-sizing: border-box;
  @include flex (space-between, center);
  border-bottom: solid 1px #f5f5f5;

  .avatar{
    @include flex ($align: center);
  }

  .avatar-title{
    margin-left: .14rem;
    @include font (.17rem, #000000, bold);
  }

  .avatar-right{
    @include font (.12rem, $tip-text);
  }
}

.cell-text{
  margin-right: .05rem;
  display: inline-block;
  vertical-align: text-bottom;

  &-main{
    @extend .cell-text;
    color: $main-text;
  }
}

.cell{
  height: .60rem;
  margin: 0 .15rem;
  @include flex (space-between, center);
  border-bottom: solid 1px #f5f5f5;

  &-left{
    @include font (.14rem, $main-text);

    img{
      width: 0.2rem;
      height: 0.2rem;
      margin-right: .06rem;
      vertical-align: middle;
    }
  }

  &-right{
    @include font (.12rem, $tip-text);
  }
}

.van-dialog{
  text-align: center;
}
// 对话框的输入框（修改昵称）
.dialog-input{
  margin: .15rem auto;
  width: 85%;
  border-radius: 5px;
  height: .4rem;
  padding: 0 .1rem;
  border: solid 1px $tip-text;
  box-sizing: border-box;
}
// 退出登录按钮
.logout{
  width: 1rem;
  text-align: center;
  margin: .5rem auto .3rem auto;
  @include font(.16rem, $main-color);
}
</style>
