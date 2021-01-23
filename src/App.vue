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
  mounted () {
    const code = getQueryParams().code
    const state = getQueryParams().state
    if (isWeixin() && code) {
      this.$store.commit('setUnionCode', code)
      const route = decodeURIComponent(state.split('#')[0])
      this.$router.push(route)
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
