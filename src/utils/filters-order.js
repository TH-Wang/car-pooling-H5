export default {
  area: {
    value: 0,
    options: [
      { text: '全城', value: 0 },
      { text: '江北区', value: 1 },
      { text: '渝中区', value: 3 },
      { text: '南岸区', value: 4 },
      { text: '沙坪坝区', value: 5 }
    ]
  },
  time: {
    value: 0,
    options: [
      { text: '全天', value: 0 },
      { text: '上午', value: 1 },
      { text: '中午', value: 2 },
      { text: '下午', value: 3 },
      { text: '晚上', value: 4 }
    ]
  },
  price: {
    value: 0,
    options: [
      { text: '不限车价', value: 0 },
      { text: '100元以下', value: 1 },
      { text: '100-300元', value: 2 },
      { text: '300-500元', value: 3 },
      { text: '500-1000元', value: 4 },
      { text: '1000元以上', value: 5 }
    ]
  },
  seat: {
    value: 0,
    options: [
      { text: '不限座位', value: 0 },
      { text: '靠窗', value: 1 },
      { text: '前排', value: 2 },
      { text: '后排', value: 3 }
    ]
  }
}
