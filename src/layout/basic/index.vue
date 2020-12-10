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
import { mapGetters } from 'vuex'
import tabbar from './tabbar'

export default {
  name: 'Basic',
  components: {
    tabbar: tabbar
  },
  computed: {
    ...mapGetters(['unGeoLocation'])
  },
  activated: function () {
    // 判断是否有位置信息，没有则引导用户选择位置或定位
    if (this.$route.name === 'Home' && this.unGeoLocation) {
      setTimeout(async () => {
        await this.$dialog.alert({
          title: '位置信息',
          message: '请先选择城市，然后向您推荐当地的拼单信息!'
        })
        this.$router.push('/common/city')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
#main{
  padding-bottom: 50px;
}
</style>
