import moment from 'moment'

export default getData

// 获取数据列表
function getData () {
  const result = []
  for (let i = 0; i < 15; i++) {
    const { text, date } = getDate(i)
    const hour = getHour(i)
    result.push({ text, date, children: hour })
  }
  return result
}

// 获取日期
function getDate (idx) {
  const itemMoment = moment().add(idx, 'days')
  const date = itemMoment.format('YYYY-MM-DD')
  let text = itemMoment.format('MM月DD号')
  if (idx === 0) text = '今天'
  else if (idx === 1) text = '明天'
  else if (idx === 2) text = '后天'
  return { text, date }
}

// 获取小时
function getHour (idx) {
  const list = []
  for (let h = 0; h < 24; h++) {
    const hour = h < 10 ? '0' + h : h

    let text
    if (h <= 5) text = '凌晨' + hour
    else if (h > 5 && h <= 8) text = '早上' + hour
    else if (h > 8 && h <= 11) text = '上午' + hour
    else if (h === 12) text = '中午' + hour
    else if (h > 12 && h <= 18) text = '下午' + hour
    else if (h > 18 && h <= 23) text = '晚上' + hour

    list.push({
      text: text + '点',
      date: hour,
      children: getMinute()
    })
  }
  if (idx === 0) {
    const minutes = getMinute(true)
    if (minutes.length === 0) return list.slice(1)

    const nowHour = moment().get('hours')
    const sliceList = list.slice(nowHour)
    sliceList[0].children = getMinute(true)
    return sliceList
  } else return list
}

// 获取分钟
function getMinute (slice) {
  const list = []
  if (slice) {
    var nowMinute = moment().get('minutes')
  }
  for (let i = 0; i < 56; i++) {
    if (slice && i < nowMinute) continue
    if (i % 5 === 0) {
      const minute = i < 10 ? '0' + i : i
      list.push({ text: minute + '分', date: minute })
    }
  }
  return list
}
