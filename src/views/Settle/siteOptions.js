export default [
  {
    type: 'picker',
    name: 'area',
    label: '申请区域',
    placeholder: '请选择申请区域',
    columns: ['渝北区', '渝中区', '南岸区', '江北区']
  },
  {
    type: 'picker',
    name: 'type',
    label: '站长类型',
    placeholder: '请选择站长类型',
    columns: ['站长', '副站长']
  },
  {
    type: 'picker',
    name: 'channel',
    label: '最初渠道',
    placeholder: '请选择最初渠道',
    columns: ['公众号', '拼车群']
  },
  {
    type: 'field',
    name: 'realname',
    label: '真实姓名',
    placeholder: '请输入真实姓名',
    clearable: true
  },
  {
    type: 'field',
    name: 'wechat',
    label: '微信号',
    placeholder: '请输入微信号',
    clearable: true
  },
  {
    type: 'field',
    name: 'public_number',
    label: '公众号',
    placeholder: '请输入公众号',
    clearable: true
  },
  {
    type: 'field',
    name: 'public_name',
    label: '公众号名',
    placeholder: '请输入公众号名',
    clearable: true
  },
  {
    type: 'field',
    name: 'phone',
    label: '手机号',
    placeholder: '请输入手机号',
    inputType: 'tel',
    clearable: true
  }
]
