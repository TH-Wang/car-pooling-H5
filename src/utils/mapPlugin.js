
// 初始化搜索模块
export async function initPlaceSearch (AMap, city) {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.PlaceSearch', function () {
      var placeSearch = new AMap.PlaceSearch({
      // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        city: city || '全国',
        pageSize: 15,
        extensions: 'all'
      })
      resolve(placeSearch)
    })
  })
}

// 初始化定位模块
export async function initGeolocation (AMap) {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true
      })
      resolve(geolocation)
    })
  })
}
