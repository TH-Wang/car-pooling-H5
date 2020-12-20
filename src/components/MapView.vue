<template>
  <div class="map">
    <div class="mapView" id="START_END_MAP_VIEW"></div>
    <!-- <div class="marker" id="START_MARKER" :style="startWidth">{{startName}}</div>
    <div class="marker" id="END_MARKER" :style="endWidth">{{endName}}</div> -->
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { isEmpty } from 'lodash'
import mapLoader from '@/utils/mapLoader'

// 途径点标记样式配置
const markerStyleConfig = {
  anchor: 'bottom-center',
  offset: [0, -2]
}

// 路线样式配置
const lineStyleConfig = {
  isOutline: true,
  outlineColor: '#ffeeee',
  borderWeight: 2,
  strokeWeight: 6,
  strokeOpacity: 0.8,
  strokeColor: '#0091ff',
  lineJoin: 'round',
  lineCap: 'round',
  showDir: true
}

export default {
  props: {
    info: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    mapView: null,
    driving: null
  }),
  computed: {
    ...mapState(['map']),
    startName () {
      if (isEmpty(this.info)) return ''
      return this.info.find(i => i.type === 1).pointName
    },
    endName () {
      if (isEmpty(this.info)) return ''
      return this.info.find(i => i.type === 3).pointName
    },
    startWidth () {
      if (isEmpty(this.info)) return ''
      return `width: ${this.startName.length * 14 + 15}px`
    },
    endWidth () {
      if (isEmpty(this.info)) return ''
      return `width: ${this.endName.length * 14 + 15}px`
    }
  },
  methods: {
    ...mapMutations(['setMapLoader']),
    // 渲染地图
    async renderMap () {
      if (isEmpty(this.map.AMap)) {
        const AMap = await mapLoader()
        this.setMapLoader(AMap)
      }
      // eslint-disable-next-line no-unused-vars
      const mapView = new this.map.AMap.Map('START_END_MAP_VIEW', {
        zoom: 12,
        mapStyle: 'amap://styles/whitesmoke'
        // dragEnable: false,
        // zoomEnable: false,
        // touchZoom: false
      })
      this.mapView = mapView
    },
    // 初始化路线规划类
    initDriving () {
      const AMap = this.map.AMap
      const start = this.info.find(i => i.type === 1)
      const end = this.info.find(i => i.type === 3)
      const waypoints = this.info.filter(i => i.type === 2).map(item => {
        return new AMap.LngLat(item.lon, item.lat)
      })
      AMap.plugin(['AMap.Driving'], () => {
        const driving = new AMap.Driving({
          policy: AMap.DrivingPolicy.LEAST_TIME,
          autoFitView: true
        })
        // 开始规划
        driving.search(
          new AMap.LngLat(start.lon, start.lat),
          new AMap.LngLat(end.lon, end.lat),
          { waypoints },
          (status, result) => {
            if (status === 'complete') {
              if (result.routes && result.routes.length) {
                this.renderLine(result.routes[0])
              }
            }
          }
        )
      })
    },
    // 渲染路线和起止点
    renderLine (route) {
      const AMap = this.map.AMap
      const mapView = this.mapView
      const path = this.parseRouteToPath(route)

      const list = []
      this.info.forEach(item => {
        // 标记对象dom元素
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.width = item.pointName.length * 14 + 15 + 'px'
        el.innerHTML = item.pointName
        // 添加的列表中
        list.push(new AMap.Marker({
          position: new AMap.LngLat(item.lon, item.lat),
          content: el,
          map: mapView,
          ...markerStyleConfig
        }))
      })
      // 路线绘制
      const routeLine = new AMap.Polyline({
        path: path,
        ...lineStyleConfig
      })
      list.forEach((item) => {
        this.mapView.add(item)
      })
      this.mapView.add(routeLine)
      this.mapView.setFitView([...list, routeLine], true, [40, 40, 40, 40])
    },
    // 转换路线格式
    parseRouteToPath (route) {
      var path = []
      for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i]
        for (var j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j])
        }
      }
      return path
    }
  },
  mounted: async function () {
    if (!this.info || this.info.length === 0) return
    console.log('mounted触发')
    await this.renderMap()
    this.initDriving()
  },
  watch: {
    info: async function (newVal) {
      if (!newVal) return
      console.log('watch触发')
      await this.renderMap()
      this.initDriving()
    }
  }
}
</script>
<style>
.marker{
  width: auto;
  display: block;
  padding: 2px 0px;
  text-align: center;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, .8);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
  font-size: 14px;
}
</style>
<style lang="scss" scoped>
.map{
  width: 100%;
  height: 1.70rem;
  // background-color: $linecard-color;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);
}
.mapView {
  width: 100%;
  height: 100%;
}
</style>
