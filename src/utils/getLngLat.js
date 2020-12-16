export default function (passPointList) {
  let startAddr, endAddr
  passPointList.forEach(item => {
    if (item.type === 1) startAddr = item
    else if (item.type === 3) endAddr = item
  })
  return {
    start: {
      name: startAddr.pointName,
      lnglat: [startAddr.lon, startAddr.lat]
    },
    end: {
      name: endAddr.pointName,
      lnglat: [endAddr.lon, endAddr.lat]
    }
  }
}
