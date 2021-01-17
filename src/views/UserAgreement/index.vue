<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="用户协议"
      fixed
      placeholder
      :border="false"
      @click-left="$router.go(-1)">
      <template #left><van-icon name="arrow-left" /></template>
    </van-nav-bar>

    <!-- 段落 -->
    <div v-for="(item, index) in paragraph" :key="index">
      <span class="headline">{{item.title}}</span>
      <template v-if="item.children">
        <div
          v-for="(p, idx) in item.children"
          :key="`${index}-${idx}`"
          :style="getStyle(p.indent)">
          {{p.paragraph}}
          <template v-if="p.children">
            <div
              v-for="(t, i) in p.children"
              :key="`${index}-${idx}-${i}`"
              :style="getStyle(t.indent)"
            >{{t.text}}</div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import paragraph from './paragraph'

export default {
  data: () => ({
    paragraph
  }),
  methods: {
    getStyle (indent) {
      return indent ? { 'text-indent': `${indent}em` } : ''
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.container{
  line-height: .3rem;
  font-size: .15rem;
  padding: .2rem .15rem;
  box-sizing: border-box;

  .headline{
    font-size: .16rem;
    font-weight: bold;
    line-height: .34rem;
    font-family: '微软雅黑';
  }
}
</style>
