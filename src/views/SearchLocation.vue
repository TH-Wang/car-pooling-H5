<template>
  <div>
    <!-- 顶部搜索框 -->
    <div class="header">
      <van-icon name="arrow-left" />
      <input
        type="text"
        placeholder="搜索您的位置"
        @input="handleSearch"
        @focus="searchShow = true"
        @blur="handleInputBlur"
      />
    </div>

    <!-- 搜索结果列表 -->
    <div class="search" v-show="searchShow && searchList.length > 0">
      <div class="search-item"
        v-for="item in searchList"
        :key="item.id"
        @click="handleSelect($event, item)">
        <div class="search-item-main">
          <van-icon name="location" size=".15rem" color="#555555" />
          <div class="search-item-info">
            <div class="search-item-result">{{item.name}}</div>
            <div class="search-item-address ellipsis-two">{{item.address}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 地图视图 -->
    <div id="SEARCH_MAP" class="map"></div>

    <!-- 地图模糊遮罩 -->
    <div class="map-mask-top"></div>
    <div class="map-mask-bottom"></div>

    <!-- 底部结果显示卡片 -->
    <div class="result">
      <div class="result-title">出发地点</div>
      <div class="result-name" v-show="name">{{name}}</div>
      <div class="result-placeholder" v-show="!name">请搜索您的位置</div>
      <div class="result-address">{{address}}</div>
      <main-button :color="name === '' ? 'gray' : 'yellow'">确认</main-button>
      <!-- 定位按钮 -->
      <div class="get-cur-button" @click="handleGetPosition">
        <van-icon name="aim" size=".20rem" />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, isEmpty } from 'lodash'
import { AMapLoaderAndUI } from '@/utils/mapLoader'
import { initPlaceSearch, initGeolocation } from '@/utils/mapPlugin'
import MainButton from '@/components/MainButton'

export default {
  components: {
    'main-button': MainButton
  },
  data: () => ({
    // 地图加载器
    AMap: null,
    // 地图视图实例
    map: null,
    // 当前位置点标记
    marker: null,
    placeSearch: null,
    geolocation: null,
    name: '',
    address: '',
    // 搜索结果列表
    searchList: [],
    // 显示搜索结果列表
    searchShow: false,
    // 未搜索到结果
    searchEmpty: false
  }),
  methods: {
    // 初始化地图视图及功能模块
    async initMap () {
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
        this.searchList = []
        return
      }
      this.placeSearch.search(value)
    }, 200),
    // 输入框失焦
    handleInputBlur () {
      setTimeout(() => {
        this.searchShow = false
      }, 150)
    },
    // 获得搜索结果
    handleRender (res) {
      if (res.info === 'OK') {
        this.searchList = res.poiList.pois
      } else if (res.info === 'NO_DATA') {
        this.searchEmpty = true
      }
    },
    // 选择搜索地点
    handleSelect (e, record) {
      const { lng, lat } = record.location
      this.map.setCenter([lng, lat], true, 1000)
      this.setMarker([lng, lat])
      this.name = record.name
      this.address = record.address
      setTimeout(() => {
        this.searchShow = false
      }, 150)
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
    }
  },
  mounted () {
    this.initMap()
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
