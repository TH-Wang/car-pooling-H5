<template>
  <div class="upload">

    <!-- 按钮主体 -->
    <div
      v-show="!showPreview"
      class="button-container"
      @click="handleChooseImage"
    >
      <!-- 选择图片按钮 -->
      <div class="button">
        <van-icon name="plus" size=".20rem" />
        <p>{{description}}</p>
      </div>
    </div>

    <!-- 图片预览 -->
    <van-image
      v-show="showPreview"
      :src="previewImage"
      width="100%"
      height="1.56rem"
      fit="fill"
      class="preview"
      @click="handleChooseImage"
    />

    <!-- 清除图片角标 -->
    <img
      v-show="showPreview"
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
</template>

<script>
import { Image } from 'vant'

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
    }
  },
  data: () => ({
    previewImage: '',
    val: null
  }),
  computed: {
    showPreview () {
      return this.val !== null
    }
  },
  methods: {
    // 点击选择图片
    handleChooseImage () {
      this.$refs.file.click()
    },
    // 文件发生变化
    async handleFileChange (e) {
      const files = e.target.files
      if (this.multiple) {
        this.val = files
      } else {
        const file = files[0]
        this.val = file
        this.previewImage = await this.getFileBase64(file)
        const fileSize = this.getFileSize(file)
        this.$toast({ message: `图片大小为 ${fileSize}`, position: 'bottom' })
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
      if (this.required && this.val === null) return false
      else return true
    }
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

    .button{
      height: 100%;
      border: dashed 2px $normal-text;
      box-sizing: border-box;
      @include flex (center, center, column);
      @include font (.16rem, $tip-text);

      p{ margin-top: .05rem }
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
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
