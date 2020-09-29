<template>
  <div id="app">
    <div id="main">
      <router-view />
    </div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from './tabbar'

export default {
  components: {
    tabbar: tabbar
  }
}
</script>

<style lang="scss" scoped>
#main{
  padding-bottom: 50px;
}
</style>
