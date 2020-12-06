export function getPointText (passPointList) {
  return passPointList
    ? passPointList.map(i => i.pointName).join('-')
    : '无'
}

export function getLineText (passPointList) {
  let start, line, end
  for (let i = 0; i < passPointList.length; i++) {
    const { type, pointName } = passPointList[i]
    switch (type) {
      case 1: start = pointName; break
      case 2: line = pointName; break
      case 3: end = pointName; break
    }
  }
  return line ? `${start}出发，${line}，目的地：${end}` : `${start}出发，目的地：${end}`
}
