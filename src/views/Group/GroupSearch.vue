<template>
  <div>
    <!-- 搜索框导航栏 -->
    <nav-bar-search mode="dark"/>

    <div class="header">已收录 4629 个高质量拼车群，覆盖全国各省市，欢迎全国各地拼车群入住本平台！</div>

    <!-- 热门群 -->
    <div class="hot-groups">
      <div class="hot-groups-title">热门群</div>
      <div class="hot-groups-list">
        <div
          v-for="item in hotGroups"
          :key="item.id"
          :class="`grid-item${item.id === activeHotGroup ? '-active' : ''}`"
          @click="handleCheckHotGroup($event, item.id)"
        >{{item.name}}</div>
      </div>
    </div>

    <main-button
      class="footer"
      center
      @click="$router.push('/common/group/area')"
    >按地域找群</main-button>
  </div>
</template>

<script>
import NavBarSearch from '@/components/NavBarSearch'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'nav-bar-search': NavBarSearch,
    'main-button': MainButton
  },
  data: () => ({
    activeHotGroup: null,
    hotGroups: [
      { id: 0, name: '河南4群' },
      { id: 1, name: '北京拼车群' },
      { id: 2, name: '德州3群' },
      { id: 3, name: '深圳东莞 - 奉节 ' },
      { id: 4, name: '广西3群' },
      { id: 5, name: '西安 - 咸阳' },
      { id: 6, name: '江苏群' },
      { id: 7, name: '顺风车群' }
    ]
  }),
  methods: {
    handleCheckHotGroup (e, id) {
      this.activeHotGroup = this.activeHotGroup === id ? null : id
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  margin: calc(46px + .20rem) .15rem .30rem .15rem;
  text-align: center;
  @include font (.14rem, $sub-text);
}
// 热门城市
.hot-groups{
  padding: .05rem .15rem .15rem .15rem;

  &-title{
    text-align: left;
    margin-bottom: .10rem;
    @include font (.18rem, #333333, bold);
  }

  &-list{
    @include flex;
    flex-wrap: wrap;
  }

  .grid-item{
    margin: 0 .13rem .13rem 0;
    height: .32rem;
    line-height: .32rem;
    padding: 0 .18rem;
    color: $sub-text;
    border-radius: 0.02rem;
    background-color: $linecard-color;
  }

  .grid-item-active{
    @extend .grid-item;
    color: #ffffff;
    background-color: $main-color;
  }
}

.footer{
  position: fixed;
  bottom: .30rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
