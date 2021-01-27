<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="群主管理"
      fixed
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />

    <!-- 顶部标题栏 -->
    <div class="header">
      <span>群主名称</span>
      <span>收益占比</span>
      <span>发布条数</span>
      <span>发布功能</span>
    </div>
    <div style="height:.38rem"></div>

    <!-- 列表 -->
    <manage-item
      v-for="item in list"
      :key="item.id"
      :record="item"
      v-model="item.canuse"
      @change="handleChange(item)"
    />
  </div>
</template>

<script>
import { getManager, updateManagerPublish } from '@/api'
import ManageItem from '@/components/ManageItem'

export default {
  components: {
    'manage-item': ManageItem
  },
  data: () => ({
    code: null,
    list: []
  }),
  methods: {
    // 请求
    async handleReq () {
      const code = this.code
      const res = await getManager({
        startPage: 1,
        pageSize: 100,
        typeId: 3,
        code
      })
      this.list = res.data.data.list
    },
    // 改变权限
    async handleChange (item) {
      const { uid, isPublish } = item
      const data = { userId: uid, isPublish: isPublish === 1 ? 0 : 1 }
      const res = await updateManagerPublish(data)
      if (res.data.status === 200 || res.data.msg === '成功') {
        this.$toast.success('修改成功')
        this.handleReq()
      } else this.$toast('修改失败，请稍后再试')
    }
  },
  created () {
    this.code = this.$route.query.code
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: .38rem;
  padding: 0 .15rem;
  box-sizing: border-box;
  background-color: $light-color;
  @include font (.14rem, $sub-text);
  @include flex (space-between, center);
  position: fixed;
  left: 0;
  z-index: 9;
}
</style>
