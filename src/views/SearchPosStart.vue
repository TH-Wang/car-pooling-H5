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
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      />
    </div>

    <!-- 搜索结果列表 -->
    <div class="search" v-show="searchShow">
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
            <div class="search-item-address ellipsis-two">{{addressDetail(item)}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 地图视图 -->
    <div id="SEARCH_MAP" class="map" @click="$ref.input.blur()"></div>

    <!-- 地图模糊遮罩 -->
    <div class="map-mask-top"></div>
    <div class="map-mask-bottom"></div>

    <!-- 底部结果显示卡片 -->
    <div class="result">
      <div class="result-title">出发地点</div>
      <div class="result-name" v-show="position.name">{{position.name}}</div>
      <div class="result-placeholder" v-show="!position.name">请搜索您的位置</div>
      <div class="result-address">{{addressDetail(position)}}</div>
      <main-button :color="buttonColor" @click="handleConfirm">确认</main-button>
      <!-- 定位按钮 -->
      <div class="get-cur-button" @click="handleGetPosition">
        <van-icon name="aim" size=".20rem" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce, isEmpty, cloneDeep } from 'lodash'
import { AMapLoaderAndUI } from '@/utils/mapLoader'
import { initPlaceSearch, initGeolocation } from '@/utils/mapPlugin'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'main-button': MainButton
  },
  data: () => ({
    // 页面类型 common: 公用，release: 发布页面使用
    type: 'common',
    // 地图加载器
    AMap: null,
    // 地图视图实例
    map: null,
    // 当前位置点标记
    marker: null,
    // 地点搜索模块
    placeSearch: null,
    // 定位模块
    geolocation: null,
    // 保存的位置信息
    position: {},
    // 用户搜索关键字
    searchValue: '',
    // 搜索结果列表
    searchList: [],
    // 显示搜索结果列表
    searchShow: false,
    // 未搜索到结果
    searchEmpty: false
  }),
  computed: {
    ...mapState(['search', 'release', 'history']),
    // 判断用户是否什么都没选
    isNothing () {
      return isEmpty(this.position) || isEmpty(this.searchValue) || isEmpty(this.position.name)
    },
    buttonColor () {
      return this.isNothing ? 'gray' : 'yellow'
    }
  },
  methods: {
    // 初始化地图视图及功能模块
    async initMap () {
      try {
        // 地图加载器
        const AMap = await AMapLoaderAndUI(['misc/PositionPicker'])
        // 初始化地图视图
        const map = new AMap.Map('SEARCH_MAP', { zoom: 16 })
        // 初始化搜索模块
        const placeSearch = await initPlaceSearch(AMap)
        // 监听搜索成功事件
        AMap.Event.addListener(placeSearch, 'complete', this.handleRender)
        // 初始化定位模块
        const geolocation = await initGeolocation(AMap)
        // 为地图视图添加定位控制器
        map.addControl(geolocation)
        // 保存到当前组件状态
        this.AMap = AMap
        this.map = map
        this.placeSearch = placeSearch
        this.geolocation = geolocation
      } catch (error) {
        console.log(error)
        this.$toast({ message: '位置加载失败，请检查网络或稍后再试', duration: 1200 })
      }
    },
    // 获取用户当前位置
    handleGetPosition () {
      this.geolocation.getCurrentPosition((status, result) => {
        if (status !== 'complete') this.$toast('定位失败，请稍后重试')
      })
    },
    // 监听用户输入
    handleSearch: debounce(function (e) {
      const { value } = e.target
      if (isEmpty(value)) {
        this.searchEmpty = false
        this.position = {}
        this.searchList = this.history.position
        return
      }
      this.placeSearch.search(value)
    }, 200),
    // 输入框获取焦点
    handleInputFocus () {
      this.searchShow = true
      if (isEmpty(this.searchValue)) {
        this.searchEmpty = false
        this.searchList = this.history.position
      }
    },
    // 输入框失焦
    handleInputBlur () {
      setTimeout(() => {
        this.searchShow = false
      }, 150)
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
      const { lng, lat } = record.location
      this.map.setCenter([lng, lat], true, 1000)
      this.setMarker([lng, lat])
      this.searchValue = record.name
      this.position = record
      this.handleAddSearchHistory(record)
      setTimeout(() => {
        this.searchShow = false
      }, 150)
    },
    // 详细地址
    addressDetail (record) {
      const { cityname, adname, address } = record
      const cityReg = new RegExp(cityname, 'g')
      const adReg = new RegExp(adname, 'g')
      let result = address
      if (!adReg.test(address)) result = adname + result
      if (!cityReg.test(address)) result = cityname + result
      return result
    },
    // 添加到历史记录
    handleAddSearchHistory (record) {
      const { lng, lat } = record.location
      const result = cloneDeep(record)
      result.isHistory = true
      result.location = { lng, lat }
      this.$store.commit('addPositionHistory', result)
    },
    // 设置标注点的位置
    setMarker (position) {
      const _this_ = this
      if (!this.marker) {
        const marker = new this.AMap.Marker({
          map: _this_.map,
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
          anchor: 'bottom-center',
          position
        })
        this.marker = marker
      } else {
        this.marker.setPosition(position)
      }
    },
    // 确认位置
    handleConfirm () {
      if (this.isNothing) return
      const position = this.position
      const data = { type: 'startAddr', value: position }
      if (this.type === 'common') {
        this.$store.commit('setSearchAddr', data)
      } else if (this.type === 'release') {
        this.$store.commit('setReleaseAddr', data)
      }
      this.$router.go(-1)
    },
    // 处理地图拖动事件
    onMapMove () {
      if (this.searchShow) {
        this.searchShow = false
        this.$refs.input.blur()
      }
    }
  },
  created () {
    // 初始化页面类型
    const type = this.$route.query.type
    if (type) this.type = type
  },
  mounted: async function () {
    await this.initMap()
    // 从store中获取出发点信息
    const key = this.type === 'common' ? 'search' : this.type
    this.position = this[key].startAddr
    this.searchValue = this[key].startAddr.name
    // 监听地图拖动事件
    if (this.map) {
      this.map.on('mapmove', this.onMapMove)
      this.map.on('click', this.onMapMove)
    }
  }
}
</script>

<style>
/* 去除高德水印 */
.amap-logo, .amap-copyright{ display: none !important; }
</style>
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
  max-height: calc(100vh - 1rem);
  overflow: auto;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: .06rem;
  position: fixed;
  top: .75rem;
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

// 地图视图
.map{
  width: 100vw;
  height: 80vh;
}

// 地图模糊遮罩
.map-mask{
  width: 100%;
  position: fixed;
  left: 0;
  z-index: 8;

  &-top{
    @extend .map-mask;
    top: 0;
    box-shadow: 0 25px .35rem .6rem rgba(255, 255, 255, .95);
  }
  &-bottom{
    @extend .map-mask;
    bottom: 0;
    box-shadow: 0 -50px .5rem 1.5rem rgba(255, 255, 255, .9);
  }
}

// 结果显示卡片
.result{
  width: calc(100% - .3rem);
  padding: .15rem;
  box-sizing: border-box;
  border-radius: .08rem;
  box-shadow: 0 4px 20px 0px rgba(0, 0, 0, .1);
  background-color: #ffffff;
  position: fixed;
  bottom: .25rem;
  left: .15rem;
  z-index: 10;

  &-title{
    padding-bottom: .05rem;
    border-bottom: solid 1px #f5f5f5;
    @include font (.14rem, $main-text);
  }
  &-name{
    margin-top: .1rem;
    @include font (.18rem, $main-text, bold);
  }
  &-address{
    margin-top: .03rem;
    margin-bottom: .15rem;
    @include font (.12rem, $sub-text);
  }
  &-placeholder{
    margin-top: .1rem;
    @include font (.18rem, $tip-text, bold);
  }
}

// 定位按钮
.get-cur-button{
  width: 0.35rem;
  height: 0.35rem;
  background-color: #ffffff;
  border-radius: .06rem;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
  @include flex (center, center);
  position: absolute;
  bottom: calc(100% + .10rem);
  right: 0;

  &:active{
    background-color: #f5f5f5;
  }
}
</style>
