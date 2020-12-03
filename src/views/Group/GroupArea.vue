<template>
  <div>
    <!-- 搜索框导航栏 -->
    <nav-bar-search mode="dark"/>

    <!-- 顶部地区显示栏 -->
    <div class="area">
      <div class="area-title" @click="visible = true">
        <span>{{selected[0].name}}</span>
        <van-icon class="icon" name="arrow" size=".12rem" color="#BFBFBF" />
        <span>{{selected[1].name}}</span>
        <van-icon class="icon" name="arrow" size=".12rem" color="#BFBFBF" />
        <span>{{selected[2].name}}</span>
      </div>
      <div class="switch-button" @click="visible = true">切换</div>
    </div>

    <!-- 地区选择器 -->
    <van-popup round position="bottom" v-model="visible">
      <van-area
        title="请选择地区"
        :area-list="areaList"
        :columns-num="3"
        @confirm="handleChange"
        @cancel="visible = false"
      />
    </van-popup>

    <!-- 空状态 -->
    <van-empty
      v-if="list.length === 0"
      description="未搜索到任何内容，请尝试切换地区后再次尝试"
    />
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
    > <group-item
        v-for="item in list"
        :key="item.id"
        :record="item"
        @click="handleLink($event, item.id)"
      > <template #right>
          <mini-button>
            <span :class="priceClass(item.price)">{{priceText(item.price)}}</span>
          </mini-button>
        </template>
      </group-item>
    </van-list>
  </div>
</template>

<script>
import { List, Area, Popup } from 'vant'
import { selectGroup } from '@/api'
import NavBarSearch from '@/components/NavBarSearch'
import GroupItem from '@/components/GroupItem'
import MiniButton from '@/components/MiniButton'
import ListMixin from '@/mixins/list-mixin'
import areaList from '@/utils/areaList.js'
import { priceClass, priceText } from './utils'

export default {
  mixins: [ListMixin],
  components: {
    'van-list': List,
    'van-popup': Popup,
    'van-area': Area,
    'nav-bar-search': NavBarSearch,
    'group-item': GroupItem,
    'mini-button': MiniButton
  },
  data: () => ({
    areaList: areaList,
    visible: false,
    selected: new Array(3).fill({ name: '请选择' }),
    // 与list-mixin相关，如果该项为true，则不会自动在mounted阶段发送请求
    notReqOnMounted: true
  }),
  methods: {
    // 请求拼车群列表的api函数
    reqApi: selectGroup,
    // 返回主要的请求参数
    getRequestDatas () {
      const city = this.selected[1].name
      const county = this.selected[2].name
      return { city, county }
    },
    // 自己处理返回值
    resDataHandler (res) {
      const { rows, total } = res.data
      return { list: rows, total }
    },
    async handleChange (value) {
      this.selected = value
      this.visible = false
      this.$toast.loading({
        message: '搜索中',
        duration: 10000
      })
      await this.handleListLoad()
      this.$toast.clear()
    },
    handleLink (e, id) {
      this.$router.push({ path: '/common/group/detail', query: { id } })
    },
    // 价格的前缀样式
    priceClass,
    // 价格的前缀样式
    priceText
  },
  mounted () {
    setTimeout(() => {
      this.visible = true
    }, 150)
  }
}
</script>

<style lang="scss" scoped>
.area{
  margin-top: 46px;
  padding: .20rem .15rem;
  box-sizing: border-box;
  @include flex($align: center);

  &-title{
    flex: 1;
    margin-right: .20rem;
    @include font (.18rem, $main-text, bold);
    @include flex ($align: center);

    .icon{
      margin: 0 .10rem;
    }
  }

  .switch-button{
    flex-shrink: 0;
    @include font (.12rem, $main-color);
  }
}

.price-prefix::before{
  content: '￥';
  margin-right: -2px;
  font-size: .15rem;
}
</style>
