export default function (list) {
  if (list.length === 0 || !list) return ''
  let start = null
  let end = null
  // 起点信息
  const startAddr = list.find(i => i.type === 1)
  // 终点信息
  const endAddr = list.find(i => i.type === 3)

  if (startAddr.pname !== endAddr.pname) {
    // 跨省路线
    start = startAddr.pname + '' + startAddr.adname
    end = endAddr.pname + '' + endAddr.adname
  } else if (startAddr.cityname !== endAddr.cityname) {
    // 城际路线
    start = startAddr.adname
    end = endAddr.adname
  } else if (startAddr.adname !== endAddr.adname) {
    // 城际路线
    start = startAddr.adname
    end = endAddr.adname
  } else {
    // 短途路线
    start = startAddr.township
    end = endAddr.township
  }
  return start + '-' + end
}
