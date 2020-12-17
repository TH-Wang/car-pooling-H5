// 获取起点、终点和途径点
export default function (data) {
  // 出发点、目的地、途径点
  const result = []
  const { startAddr, passPointList, endAddr } = data
  let sort = 0
  // 出发点
  result.push({
    ...filterPointParams(startAddr),
    sort: ++sort,
    type: 1
  })
  // 途径点
  for (let i = 0; i < passPointList.length; i++) {
    result.push({
      ...filterPointParams(passPointList[i]),
      sort: ++sort,
      type: 2
    })
  }
  // 目的地
  result.push({
    ...filterPointParams(endAddr),
    sort: ++sort,
    type: 3
  })
  return result
}

// 通过地点信息筛选参数
function filterPointParams (data) {
  const { pname, cityname, adname, name, location } = data

  // 直辖市
  const city = ['重庆市', '北京市', '上海市', '天津市']
  const result = {
    pointName: name,
    lon: location.lng,
    lat: location.lat
  }
  // 如果是直辖市
  if (city.indexOf(pname) !== -1) {
    return {
      ...result,
      pname: cityname,
      cityname: adname
      // fullName: `${cityname}${adname}${name}`
    }
  }
  // 普通城市
  return {
    ...result,
    pname,
    cityname
    // fullName: `${pname}${cityname}${name}`
  }
}
