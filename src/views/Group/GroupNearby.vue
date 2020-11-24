<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav-bar-search mode="dark" button @click-search="$router.push('/common/group/search')">
      <template #right>
        {{location}} <van-icon name="arrow-down" />
      </template>
    </nav-bar-search>

    <!-- 占位符 -->
    <div style="height: 50px"></div>

    <!-- 顶部标题 -->
    <div class="header">
      <img class="header-icon" src="@/assets/icons/location.png" alt="">
      <div class="header-title">附近的群</div>
      <div class="header-link">查看更多</div>
    </div>

    <!-- 如果群列表数据为空 -->
    <div v-if="list.length === 0" @click="handleRetry">
      <van-empty description="未搜索到附近的拼车群" />
    </div>
    <!-- 群列表 -->
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="handleListLoad"
      class="list-container"
    >
      <group-item
        v-for="item in list"
        :key="item.id"
        :record="item"
        @click="handleLink"
      >
        <template #right>
          <mini-button>
            <span :class="priceClass(item.price)">{{priceText(item.price)}}</span>
          </mini-button>
        </template>
      </group-item>
    </van-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectGroup } from '@/api'
import { Icon, List } from 'vant'
import NavBarSearch from '@/components/NavBarSearch'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'
import ListMixin from '@/mixins/list-mixin'

export default {
  mixins: [ListMixin],
  components: {
    'van-icon': Icon,
    'nav-bar-search': NavBarSearch,
    'van-list': List,
    'group-item': GroupItem,
    'mini-button': MiniButton
  },
  computed: {
    ...mapGetters(['location'])
  },
  methods: {
    // 请求拼车群列表的api函数
    reqApi: selectGroup,
    // 自己处理返回值
    resDataHandler (res) {
      const { rows, total } = res.data
      return { list: rows, total }
    },
    // 价格的前缀样式
    priceClass (price) {
      return price === 0 ? '' : 'price-prefix'
    },
    // 价格的前缀样式
    priceText (price) {
      if (price === 0) return '免费'
      else {
        const decimal = price.toString().split('.')[1]
        return decimal ? price : price + '.00'
      }
    },
    handleLink ({ id }) {
      this.$router.push({ path: '/common/group/detail', query: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  @include flex (space-between, center);
  padding: .20rem .15rem;

  &-icon{
    width: 0.2rem;
    height: 0.2rem;
  }

  &-title{
    flex: 1;
    @include font (.18rem, $main-text, bold);
    margin: 0 .1rem;
  }

  &-link{
    @include font (.12rem, $main-color);
    margin-bottom: -0.03rem;
  }
}

.price-prefix::before{
  content: '￥';
  margin-right: -2px;
  font-size: .15rem;
}
</style>
