<template>
  <div class="map" id="START_END_MAP_VIEW"></div>
</template>

<script>
import mapLoader from '@/utils/mapLoader'

export default {
  mounted: async function () {
    const AMap = await mapLoader()
    // eslint-disable-next-line no-unused-vars
    const map = new AMap.Map('START_END_MAP_VIEW', {
      // center: [116.397428, 39.90923],
      zoom: 12,
      mapStyle: 'amap://styles/whitesmoke',
      dragEnable: false
    })
  }
}
</script>

<style lang="scss" scoped>
.map{
  width: 100%;
  height: 1.70rem;
  // background-color: $linecard-color;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);
}
</style>
