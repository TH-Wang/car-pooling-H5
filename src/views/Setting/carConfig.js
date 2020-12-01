export default [
  {
    type: 'field',
    name: 'carModel',
    label: '车型',
    placeholder: '请输入您爱车的型号',
    rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carBrand',
    label: '品牌',
    placeholder: '请输入您爱车的品牌',
    rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carNumber',
    label: '车牌号',
    placeholder: '请输入您爱车的车牌号',
    maxLength: '7',
    rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carSeat',
    label: '几座',
    placeholder: '请输入您爱车几座',
    rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carColour',
    label: '颜色',
    placeholder: '请输入您爱车的颜色',
    rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carLoad',
    label: '载重',
    placeholder: '请输入载重量'
    // rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carBody',
    label: '长宽高',
    placeholder: '请输入长宽高'
    // rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carLoadBulk',
    label: '载重体积',
    placeholder: '请输入载重体积'
    // rules: [{ required: true }]
  }
]
