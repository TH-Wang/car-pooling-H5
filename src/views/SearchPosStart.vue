<template>
  <div>
    <!-- 顶部搜索框 -->
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
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
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      />
      <van-icon
        name="clear"
        color="#D5D5D5"
        style="margin-left: 5px"
        v-show="searchValue"
        @click="searchValue = ''; position = {}; $refs.input.focus()" />
    </div>

    <!-- 搜索结果列表 -->
    <div class="search" v-show="searchShow">
      <van-empty v-show="searchEmpty">
        <div style="text-align:center;">
          <p>未找到相关位置</p>
          <p>可尝试加上<strong style="color:#FFCD00">当前城市</strong>后重试</p>
        </div>
      </van-empty>
      <div class="search-item"
        v-for="item in searchList"
        :key="item.id"
        @click="handleSelect($event, item, 'history')">
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
      <!-- 当前城市 + 地点 -->
      <div class="result-name">
        <span @click="showSelector = true">{{curCity}}</span> {{position.name}}
      </div>
      <!-- 详细地址 -->
      <div class="result-address">
        {{`${position.adname || ''}${position.address || ''}`}}
      </div>
      <main-button :color="buttonColor" @click="handleConfirm">确认</main-button>
      <!-- 定位按钮 -->
      <div class="get-cur-button" @click="handleGetPosition">
        <van-icon name="aim" size=".20rem" />
      </div>
    </div>

    <!-- 城市选择器 -->
    <van-popup v-model="showSelector" position="bottom" round>
      <van-picker
        show-toolbar
        :columns="cityList"
        @confirm="handleCurCityChange"
        @cancel="() => {showSelector = false}"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Popup, Picker } from 'vant'
import { debounce, isEmpty, cloneDeep } from 'lodash'
import { AMapLoaderAndUI } from '@/utils/mapLoader'
import { initPlaceSearch, initGeolocation } from '@/utils/mapPlugin'
import { getPosition } from '@/utils/districtSearch'
import MainButton from '@/components/MainButton'
import pList from '@/utils/pnameList'

export default {
  components: {
    'main-button': MainButton,
    'van-popup': Popup,
    'van-picker': Picker
  },
  data: () => ({
    // 页面类型 common: 公用，release: 发布页面使用，trip: 修改行程页面
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
    searchEmpty: false,
    // 当前城市
    showSelector: false,
    curCity: null,
    cityList: pList
  }),
  computed: {
    ...mapState(['search', 'release', 'trip', 'history']),
    // 判断用户是否什么都没选
    isNothing () {
      return isEmpty(this.position) ||
             isEmpty(this.searchValue) ||
             isEmpty(this.position.name)
    },
    buttonColor () {
      return this.isNothing ? 'gray' : 'yellow'
    }
  },
  methods: {
    // 搜索城市发生改变
    handleCurCityChange (city) {
      this.curCity = city ? city.replace(/(市|省|自治区)/, '') : '重庆'
      this.showSelector = false
      this.initSearch()
    },
    // 初始化地图视图及功能模块
    async initMap () {
      try {
        // 地图加载器
        const AMap = await AMapLoaderAndUI(['misc/PositionPicker'])
        // 初始化地图视图
        const map = new AMap.Map('SEARCH_MAP', { zoom: 16 })
        // 初始化定位模块
        const geolocation = await initGeolocation(AMap)
        // 为地图视图添加定位控制器
        map.addControl(geolocation)
        // 保存到当前组件状态
        this.AMap = AMap
        this.map = map
        this.geolocation = geolocation
      } catch (error) {
        console.log(error)
        this.$toast({ message: '位置加载失败，请检查网络或稍后再试', duration: 1200 })
      }
    },
    async initSearch () {
      const AMap = this.AMap
      // 初始化搜索模块
      const placeSearch = await initPlaceSearch(AMap, this.curCity)
      this.placeSearch = placeSearch
      // 监听搜索成功事件
      AMap.Event.addListener(placeSearch, 'complete', this.handleRender)
    },
    // 获取用户当前位置
    handleGetPosition () {
      this.geolocation.getCurrentPosition(async (status, result) => {
        if (status !== 'complete') {
          this.$toast({
            message: '定位失败，请检查是否打开定位信息后重试',
            duration: 1500
          })
        } else {
          // 通过经纬度获取位置信息
          const { lng, lat } = result.position
          const position = await getPosition(this.AMap, [lng, lat])
          // console.log(position)
          const data = this.transInfo(result.position, position)
          this.handleSelect(null, data)
        }
      })
    },
    // 转换位置信息对象
    transInfo (location, position) {
      const { lng, lat } = location
      // 将定位信息显示到地图上
      const { province, city, district } = position.addressComponent
      const address = position.formattedAddress
      const arr = ['streetNumber', 'street', 'township']
      // 获取地点名称的索引
      let matchName
      for (let i = 0; i < arr.length; i++) {
        const match = address.match(new RegExp(`(?<=${position.addressComponent[arr[i]]})`))
        if (!(arr[i] in position.addressComponent)) continue
        if (isEmpty(arr[i]) || !match) continue
        else {
          matchName = match
          break
        }
      }
      // 截取地点名称
      const name = address.slice(matchName.index)
      const data = {
        pname: province,
        cityname: city || province,
        adname: district,
        address: '',
        name,
        location: { lng, lat }
      }
      // console.log(data)
      return data
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
    async handleSelect (e, record, type) {
      const { lng, lat } = record.location
      // 通过经纬度获取城镇街道信息
      const detail = await getPosition(this.AMap, [lng, lat])
      const { township, street } = detail.addressComponent
      const town = isEmpty(township) ? street : township
      record.township = town
      // 在地图上设置标记点
      this.map.setCenter([lng, lat], true, 1000)
      this.setMarker([lng, lat])
      this.searchValue = record.name
      this.position = record
      // 添加到历史搜索记录
      this.handleAddSearchHistory(record)
      // 设置当前城市为该地点的城市
      if (type === 'history') this.handleCurCityChange(record.pname)
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
      let commitType
      switch (this.type) {
        case 'common': commitType = 'setSearchAddr'; break
        case 'release': commitType = 'setReleaseAddr'; break
        case 'trip': commitType = 'setTripAddr'; break
        default: commitType = 'setSearchAddr'; break
      }
      this.$store.commit(commitType, data)
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
    await this.handleCurCityChange(this.$store.state.position.city.name)
    // 从store中获取出发点信息
    const key = this.type === 'common' ? 'search' : this.type
    this.position = this[key].startAddr
    this.searchValue = this[key].startAddr.name
    // 如果没有内容则启用定位
    if (isEmpty(this.searchValue)) {
      this.handleGetPosition()
    }

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
  padding: 0 .10rem;
  box-sizing: border-box;
  border-radius: .06rem;
  background-color: #ffffff;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, .1);
  @include flex (space-between, center);
  position: fixed;
  top: .2rem;
  left: .15rem;
  z-index: 10;

  .city-select{
    height: .15rem;
    margin: 0 .08rem;
    padding-right: .06rem;
    border-right: solid 1px $tip-text;
    flex-shrink: 0;
    @include flex ($align: center);

    span{
      margin-right: .02rem;
    }

    .select-arrow{
      transform: rotateZ(90deg);
      border-right: solid 1px $light-color;
    }
  }

  input{
    // margin-left: .10rem;
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
