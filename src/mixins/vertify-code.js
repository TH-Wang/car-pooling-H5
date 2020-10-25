export default {
  data: () => ({
    verifyCode: {
      // 获取中
      pending: false,
      count: 60,
      // 显示的文本
      text: '获取验证码'
    }
  }),
  methods: {
    // 改变验证码状态
    handleChangeCodeStatus () {
      return new Promise((resolve, reject) => {
        if (!this.verifyCode.pending) {
          // 获取验证码的倒计时
          this.verifyCode.text = this.verifyCode.count + 's'
          this.verifyCode.pending = true
          var countDown = setInterval(() => {
            if (this.verifyCode.count > 0) {
              this.verifyCode.text = (--this.verifyCode.count) + 's'
            } else {
              this.verifyCode = {
                pending: false,
                count: 60,
                text: '获取验证码'
              }
              clearInterval(countDown)
            }
          }, 1000)
          resolve()
        }
        reject(new Error('The code is pending'))
      })
    },
    // 表单提交
    handleSubmit () {
      const { err, values } = this.$refs.form.submit()
      if (err) return
      console.log(values)
    }
  }
}
