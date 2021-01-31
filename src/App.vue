<template>
  <div id="app">
    <keep-alive include="Basic">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { isWeixin } from '@/utils/wx'
import getQueryParams from '@/utils/getQueryParams'

export default {
  created () {
    // 如果是支付
    const code = getQueryParams().code
    const state = getQueryParams().state
    if (isWeixin() && code) {
      this.$store.commit('setUnionCode', code)
      const route = decodeURIComponent(state.split('#')[0])
      this.$router.push(route)
      return
    }
    // 如果是邀请登录
    const invite = getQueryParams().invite
    if (invite) {
      this.$router.push('/common/login?invite=' + invite)
      return
    }

    // 如果是站长首页
    const station = getQueryParams().station
    if (station) {
      this.$router.push('/home?station=' + station)
    }
  },
  mounted () {
    const _this_ = this
    window.onbeforeunload = function () {
      // 更新离开时间
      _this_.$store.commit('setLeaveTime', new Date().getTime())
    }
  }
}
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
