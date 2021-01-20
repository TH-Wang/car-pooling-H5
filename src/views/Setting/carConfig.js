export default [
  {
    type: 'field',
    name: 'carModel',
    label: '车型',
    placeholder: '例如：奔驰E300L',
    rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carNumber',
    label: '车牌号',
    placeholder: '请输入您爱车的车牌号',
    maxLength: '10',
    rules: [{ required: true }]
  }, {
    type: 'field',
    inputType: 'tel',
    name: 'carSeat',
    label: '几座',
    placeholder: '请输入您爱车几座(数字)',
    rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carColour',
    label: '颜色',
    placeholder: '例如：白色',
    rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carLoad',
    label: '载重',
    placeholder: '输入车辆载重如 5000kg'
    // rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carBody',
    label: '长宽高',
    placeholder: '输入车长宽高如498*200*180'
    // rules: [{ required: true }]
  }, {
    type: 'field',
    name: 'carLoadBulk',
    label: '载重体积',
    placeholder: '输入载物体积长宽高如 50*200*180'
    // rules: [{ required: true }]
  }
]
