<template>
  <div class="container">
    <!-- 顶部搜索框 -->
    <div class="header">
      <van-icon name="arrow-down" @click="$emit('close')" />
      <div class="city-select" @click="() => {showSelector = true}">
        <span>{{curCity}}</span>
        <van-icon name="play" size=".13rem" class="select-arrow" />
      </div>
      <input
        type="text"
        ref="input"
        v-model="searchValue"
        placeholder="搜索您的位置"
        @input="handleSearch"
        @focus="handleInputFoucs"
      />
      <van-icon
        v-show="!valueIsEmpty"
        name="clear" color="#D1D1D1"
        @click="clear"
      />
      <!-- <div class="cancel-button" @click="$emit('close')">取消</div> -->
    </div>

    <!-- 搜索结果列表 -->
    <div class="search">
      <van-empty v-show="searchEmpty">
        <div style="text-align:center;">
          <p>未找到相关位置</p>
          <p>可尝试加上<strong style="color:#FFCD00">当前城市</strong>后重试</p>
        </div>
      </van-empty>
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

    <!-- 城市选择器 -->
    <van-popup v-model="showSelector" position="bottom" round>
      <van-picker
        show-toolbar
        :columns="cityList"
        @confirm="handleCurCityChange"
        @cancel="showSelector = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Popup, Picker } from 'vant'
import { debounce, isEmpty, cloneDeep } from 'lodash'
import AMapLoader from '@/utils/mapLoader'
import { initPlaceSearch } from '@/utils/mapPlugin'
import { getPosition } from '@/utils/districtSearch'
import pList from '@/utils/pnameList'

export default {
  components: {
    'van-popup': Popup,
    'van-picker': Picker
  },
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
    searchEmpty: false,
    position: {},
    // 当前城市
    curCity: '',
    cityList: pList,
    showSelector: false
  }),
  computed: {
    ...mapState(['search', 'release', 'trip', 'history']),
    valueIsEmpty () {
      return isEmpty(this.searchValue)
    }
  },
  methods: {
    // 搜索城市发生改变
    handleCurCityChange (city) {
      this.curCity = city ? city.replace(/(市|省|自治区)/, '') : '重庆'
      this.showSelector = false
      this.initSearch()
    },
    // 初始化地点搜索模块
    async initMap () {
      try {
        // 地图加载器
        const AMap = await AMapLoader()
        // 保存到当前组件状态
        this.AMap = AMap
      } catch (error) {
        console.log(error)
        this.$toast({ message: '请检查网络或稍后再试', duration: 1200 })
      }
    },
    async initSearch () {
      const AMap = this.AMap
      // 初始化搜索模块
      const placeSearch = await initPlaceSearch(AMap, this.curCity)
      // 监听搜索成功事件
      AMap.Event.addListener(placeSearch, 'complete', this.handleRender)
      this.placeSearch = placeSearch
    },
    // 清空搜索框内容
    clear () {
      this.searchValue = ''
    },
    // 监听用户输入
    handleSearch: debounce(function (e) {
      const { value } = e.target
      if (isEmpty(value)) {
        this.searchEmpty = false
        this.searchList = this.history.passPoint
        return
      }
      this.placeSearch.search(value)
    }, 200),
    // 输入框获取焦点
    handleInputFoucs () {
      if (isEmpty(this.searchValue)) {
        this.searchEmpty = false
        this.searchList = this.history.passPoint
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
    async handleSelect (e, record) {
      const { lng, lat } = record.location
      // 通过经纬度获取城镇街道信息
      const detail = await getPosition(this.AMap, [lng, lat])
      const { township, street } = detail.addressComponent
      const town = isEmpty(township) ? street : township
      record.township = town
      // 添加到历史搜索记录
      this.handleAddSearchHistory(record)
      // 将位置信息记录到store中
      this.$emit('search', record)
      setTimeout(() => {
        this.$emit('close', false)
      }, 150)
    },
    // 添加到历史记录
    handleAddSearchHistory (record) {
      const { lng, lat } = record.location
      const result = cloneDeep(record)
      result.isHistory = true
      result.location = { lng, lat }
      this.$store.commit('addPassPointHistory', result)
    }
  },
  created () {
    // 初始化页面类型
    const type = this.$route.query.type
    if (type) this.type = type
    // 获取历史搜索记录
    this.searchList = this.history.passPoint
  },
  mounted: async function () {
    // 从store中获取出发点信息
    const key = this.type === 'common' ? 'search' : this.type
    this.position = this[key].endAddr
    this.searchValue = this[key].endAddr.name
    this.$refs.input.focus()
    await this.initMap()
    this.handleCurCityChange(this.$store.state.position.selected.city.name)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/placeSearch.scss';

.container{
  width: 100vw;
  height: 100vh;
  background-color: #FFFFFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  overflow-y: auto;
}

.search{
  max-height: calc(100vh - 0.8rem);
  overflow-y: auto;
}

.cancel-button{
  @include font (.14rem, $sub-text);
  margin-left: 5px;
  flex-shrink: 0;
}
</style>
