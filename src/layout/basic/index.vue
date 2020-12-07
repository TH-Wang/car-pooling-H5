<template>
  <div id="app">
    <div id="main">
      <keep-alive :include="['Home','Group','Release','Mine','SelectCity']">
        <router-view />
      </keep-alive>
    </div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from './tabbar'

export default {
  name: 'Basic',
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
