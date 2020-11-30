<template>
  <div>
    <!-- 顶部搜索框 -->
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <input
        type="text"
        ref="input"
        v-model="searchValue"
        placeholder="搜索您的位置"
        @input="handleSearch"
        @focus="handleInputFoucs"
      />
    </div>

    <!-- 搜索结果列表 -->
    <div class="search">
      <van-empty v-show="searchEmpty" description="抱歉，未找到相关位置，可尝试修改后重试" />
      <div class="search-item"
        v-for="item in searchList"
        :key="item.id"
        @click="handleSelect($event, item)">
        <div class="search-item-main">
          <van-icon :name="item.isHistory ? 'clock' : 'location'"
            size=".15rem" color="#555555"/>
          <div class="search-item-info">
            <div class="search-item-result">{{item.name}}</div>
            <div class="search-item-address ellipsis-two">{{item.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce, isEmpty, cloneDeep } from 'lodash'
import { AMapLoaderAndUI } from '@/utils/mapLoader'
import { initPlaceSearch } from '@/utils/mapPlugin'

export default {
  data: () => ({
    // 页面类型 common: 公用，release: 发布页面使用
    type: 'common',
    // 地图加载器
    AMap: null,
    // 地点搜索模块
    placeSearch: null,
    // 用户搜索关键字
    searchValue: '',
    // 搜索结果列表
    searchList: [],
    // 未搜索到结果
    searchEmpty: false
  }),
  computed: {
    ...mapState(['search', 'release', 'history'])
  },
  methods: {
    // 初始化地点搜索模块
    async initMap () {
      try {
        // 地图加载器
        const AMap = await AMapLoaderAndUI(['misc/PositionPicker'])
        // 初始化搜索模块
        const placeSearch = await initPlaceSearch(AMap)
        // 监听搜索成功事件
        AMap.Event.addListener(placeSearch, 'complete', this.handleRender)
        // 保存到当前组件状态
        this.AMap = AMap
        this.placeSearch = placeSearch
      } catch (error) {
        console.log(error)
        this.$toast({ message: '请检查网络或稍后再试', duration: 1200 })
      }
    },
    // 监听用户输入
    handleSearch: debounce(function (e) {
      const { value } = e.target
      if (isEmpty(value)) {
        this.searchEmpty = false
        this.searchList = this.history.position
        return
      }
      this.placeSearch.search(value)
    }, 200),
    // 输入框获取焦点
    handleInputFoucs () {
      if (isEmpty(this.searchValue)) {
        this.searchEmpty = false
        this.searchList = this.history.position
      }
    },
    // 获得搜索结果
    handleRender (res) {
      if (res.info === 'OK') {
        if (this.searchEmpty) this.searchEmpty = false
        this.searchList = res.poiList.pois
      } else {
        this.searchList = []
        this.searchEmpty = true
      }
    },
    // 选择搜索地点
    handleSelect (e, record) {
      // 添加到历史搜索记录
      this.handleAddSearchHistory(record)
      // 将位置信息记录到store中
      const data = { type: 'endAddr', value: record }
      if (this.type === 'common') {
        this.$store.commit('setSearchAddr', data)
      } else if (this.type === 'release') {
        this.$store.commit('setReleaseAddr', data)
      }
      setTimeout(() => {
        this.$router.go(-1)
      }, 150)
    },
    // 添加到历史记录
    handleAddSearchHistory (record) {
      const { lng, lat } = record.location
      const result = cloneDeep(record)
      result.isHistory = true
      result.location = { lng, lat }
      this.$store.commit('addPositionHistory', result)
    }
  },
  created () {
    // 初始化页面类型
    const type = this.$route.query.type
    if (type) this.type = type
    // 获取历史搜索记录
    this.searchList = this.history.position
  },
  mounted () {
    // 从store中获取出发点信息
    const key = this.type === 'common' ? 'search' : this.type
    this.position = this[key].endAddr
    this.searchValue = this[key].endAddr.name
    this.$refs.input.focus()
    this.initMap()
  }
}
</script>
<style lang="scss" scoped>
// 顶部搜索框
.header{
  width: calc(100% - .3rem);
  height: .5rem;
  padding-left: .15rem;
  box-sizing: border-box;
  border-radius: .06rem;
  background-color: #ffffff;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, .1);
  @include flex (space-between, center);
  position: fixed;
  top: .2rem;
  left: .15rem;
  z-index: 10;

  input{
    margin-left: .10rem;
    box-sizing: border-box;
    flex: 1;
    border: none;
  }
}

// 搜索结果列表
.search{
  width: calc(100% - .3rem);
  max-height: calc(100vh - 1.05rem);
  overflow: auto;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: .06rem;
  position: fixed;
  top: .8rem;
  left: .15rem;
  z-index: 11;

  // 边框
  &-item + &-item{
    border-top: solid 1px $linecard-color;
  }

  // 列表项
  &-item{
    padding: .1rem .15rem;

    &:active{
      background-color: #f5f5f5;
    }

    &-main{
      @include flex(space-between, center);
    }

    &-info{
      flex: 1;
      margin-left: .1rem;
    }

    &-result{
      @include font (.16rem, $main-text, bold);
    }

    &-address{
      margin-top: .03rem;
      @include font (.12rem, $sub-text);
    }
  }
}
</style>
