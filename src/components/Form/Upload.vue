<template>
  <div class="main">
    <!-- 主体内容 -->
    <div class="upload">

      <!-- 按钮主体 -->
      <div
        v-show="showButton"
        class="button-container"
        @click="handleChooseImage"
      >
        <!-- 选择图片按钮 -->
        <div :class="`button ${error ? 'button-error' : ''}`">
          <van-icon name="plus" size=".20rem" />
          <p>{{description}}</p>
        </div>

        <!-- 底图 -->
        <van-image v-if="baseImage" class="base-image" :src="getFile(baseImage)"  />
        <!-- 底图上方按钮 -->
        <van-image v-if="baseImage" class="base-button" :src="getFile('base-button.png')" />
      </div>

      <!-- 单张图片预览 -->
      <van-image
        v-show="showSinglePreview"
        :src="singlePreviewSrc"
        width="100%"
        height="1.56rem"
        fit="fill"
        class="preview"
        @click="handleChooseImage"
      />

      <!-- 清除图片角标 -->
      <img
        v-show="showSinglePreview"
        class="close"
        src="@/assets/icons/close-sub.png"
        alt=""
        @click="val = null"
      />

      <!-- 文件选择框 -->
      <input
        type="file"
        ref="file"
        accept="image/*"
        :multiple="multiple"
        hidden
        @change="handleFileChange"
      />
    </div>

    <!-- 多选模式下的图片预览列表 -->
    <div class="multiple" v-if="multiple">
      <div
        class="multiple-item"
        v-for="(item, index) in val"
        :key="item" >
        <van-image class="multiple-item-image" :src="item" fit="cover" />
        <!-- 清除图片角标 -->
        <img
          class="close"
          src="@/assets/icons/close-sub.png"
          @click="val.splice(index, 1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'
import { isEmpty } from 'lodash'
import { uploadFile } from '@/api'

export default {
  components: {
    'van-image': Image
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: String,
    value: File,
    // 是否可以多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 最多选择几张：只有 multiple = true 时该属性才生效
    maxCount: {
      type: Number,
      default: 3
    },
    // 选择图片按钮的说明文字
    description: {
      type: String,
      default: '请选择图片，可拍照或从相册选择'
    },
    // 是否必选
    required: {
      type: Boolean,
      default: false
    },
    // 底图
    baseImage: {
      type: [Boolean, String],
      default: false
    }
  },
  data: () => ({
    val: null,
    error: false
  }),
  computed: {
    // 是否显示选择图片按钮
    showButton () {
      return !this.multiple ? !this.showSinglePreview : true
    },
    // 单张图片预览的路径
    singlePreviewSrc () {
      return this.multiple ? null : this.val
    },
    // 是否显示单张图片的预览
    showSinglePreview () {
      return !this.multiple && !isEmpty(this.val)
    }
  },
  methods: {
    // 点击选择图片
    handleChooseImage () {
      this.$refs.file.click()
    },
    // 获取静态资源
    getFile (path) {
      return require(`@/assets/icons/upload/${path}`)
    },
    // 文件发生变化
    async handleFileChange (e) {
      // 清除必选的提示
      if (this.error) this.error = false
      this.$toast.loading({
        message: '上传中...',
        duration: 1000000
      })
      try {
      // 获取文件
        const files = e.target.files
        // 如果超出限制数量则终止上传
        if (
          this.multiple &&
          (files.length + this.val.length) > this.maxCount
        ) {
          this.$toast.clear()
          this.$toast.fail(`最多上传\n${this.maxCount}张图片`)
          return
        }
        // 上传服务器
        const res = await this.uploadFiles(files)
        // 将结果复制给val
        if (this.multiple) {
          this.val.push(...res)
        } else this.val = res[0]
        // 反馈
        this.$toast.clear()
        this.$toast.success('上传成功')
      } catch (error) {
        console.log(error)
        this.$toast.clear()
        this.$toast.fail('上传失败\n请稍后重试')
      }
    },
    // 并发进行文件上传
    async uploadFiles (files) {
      try {
        const requestList = []
        for (let i = 0; i < files.length; i++) {
          requestList.push(this.handleUpload(files[i]))
        }
        const res = await Promise.all(requestList)
        return Promise.resolve(res.map(i => i.data.data))
      } catch (error) {
        throw new Error(error)
      }
    },
    // 图片上传请求
    async handleUpload (file) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await uploadFile(formData)
      if (res.data.status === 200) {
        return Promise.resolve(res)
      } else {
        throw new Error('图片上传失败', file)
      }
    },
    // 获取file的base64编码
    getFileBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          resolve(reader.result)
        }
        reader.onerror = function (err) {
          reject(err)
        }
      })
    },
    // 获取图片的大小
    getFileSize (file) {
      const size = file.size
      // 如果是KB大小
      const KB = size / 1024
      if (KB < 1024) return parseInt(KB) + 'K'
      // 如果是MB大小
      const MB = KB / 1024
      if (MB < 1024) return parseInt(MB) + 'M'
      // 如果是GB大小
      else return (parseInt(MB) / 1024) + 'G'
    },
    // 设置字段值
    setValue (value) {
      this.val = value
    },
    // 获取字段值
    getValue () {
      return this.val
    },
    // 表单验证
    validate () {
      if (this.required && isEmpty(this.val)) {
        this.error = true
        return false
      } else return true
    },
    // 清空选择
    clear () {
      this.val = null
    }
  },
  created () {
    if (this.multiple) this.val = []
  },
  watch: {
    val: function (newVal) {
      this.$emit('change', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload{
  width: 3.45rem;
  margin: .15rem auto;
  position: relative;

  .button-container{
    height: 1.56rem;
    padding: .10rem;
    box-sizing: border-box;
    border-radius: .02rem;
    background-color: $light-color;

    // 按钮主体
    .button{
      height: 100%;
      border: dashed 2px $normal-text;
      box-sizing: border-box;
      @include flex (center, center, column);
      @include font (.16rem, $tip-text);

      &-error{
        // border-color: $error-text;
        color: $error-text;
      }

      p{ margin-top: .05rem }
    }

    // 底图
    .base-image{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    // 底图上的按钮
    .base-button{
      width: .48rem;
      height: .48rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .preview{
    margin: 0 auto;
    border-radius: .05rem;
    overflow: hidden;
  }

  .close{
    width: 0.24rem;
    height: 0.24rem;
  }
}

.close{
  position: absolute;
  right: 0;
  top: 0;
}

.multiple{
  width: 3.45rem;
  margin: .15rem auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .15rem .12rem;

  &-item{
    height: .8rem;
    border-radius: 3px;
    overflow: hidden;
    position: relative;

    &-image{
      width: 100%;
      height: 100%;
    }

    .close{
      width: 0.2rem;
      height: 0.2rem;
    }
  }
}
</style>
