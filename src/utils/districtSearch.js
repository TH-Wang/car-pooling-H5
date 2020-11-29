// 高德定位获取经纬度
export function getLngLatByMap (AMap) {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true
      })

      geolocation.getCurrentPosition(function (status, result) {
        status === 'complete'
          ? resolve(result.position)
          : reject(result)
      })
    })
  })
}

// 浏览器定位获取经纬度
export function getLngLatByBrowser () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve(position)
    }, function (error) {
      reject(error)
    }, {
      enableHighAccuracy: true
    })
  })
}

// 通过经纬度逆编码获取位置信息
export function getPosition (AMap, lnglat) {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geocoder', function () {
      var geocoder = new AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: '全国'
      })

      geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // result为对应的地理位置详细信息
          resolve(result.regeocode)
        } else {
          reject(result)
          // console.log(result)
        }
      })
    })
  })
}

// 获取城市信息
export function getCity (AMap) {
  AMap.plugin('AMap.CitySearch', function () {
    var citysearch = new AMap.CitySearch()
    // 自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        console.log(result)
        // if (result && result.city && result.bounds) {
        //   var cityinfo = result.city
        //   var citybounds = result.bounds
        //   document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo
        //   // 地图显示当前城市
        //   map.setBounds(citybounds)
        // }
      } else {
        console.log(result)
      }
    })
  })
}

// 将GPS坐标转换为高德坐标
export function transform (AMap, lnglat) {
  return new Promise((resolve, reject) => {
    AMap.convertFrom(lnglat, 'gps', function (status, result) {
      if (result.info === 'ok') {
        resolve(result)
      } else reject(result)
    })
  })
}
