export default [
  {
    type: 'area',
    name: 'area',
    label: '申请区域',
    placeholder: '请选择申请区域'
  },
  {
    type: 'picker',
    name: 'type',
    label: '站长类型',
    placeholder: '请选择站长类型',
    columns: [{ id: 1, label: '站长' }, { id: 2, label: '副站长' }]
  },
  {
    type: 'picker',
    name: 'way',
    label: '最初渠道',
    placeholder: '请选择最初渠道',
    columns: [{ id: 1, label: '公众号' }, { id: 2, label: '拼车群' }]
  },
  {
    type: 'field',
    name: 'realName',
    label: '真实姓名',
    placeholder: '请输入真实姓名',
    clearable: true
  },
  {
    type: 'field',
    name: 'vxNumber',
    label: '微信号',
    placeholder: '请输入微信号',
    clearable: true
  },
  {
    type: 'field',
    name: 'tencentIsux',
    label: '公众号',
    placeholder: '请输入公众号',
    clearable: true
  },
  {
    type: 'field',
    name: 'tencentIsuxName',
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
