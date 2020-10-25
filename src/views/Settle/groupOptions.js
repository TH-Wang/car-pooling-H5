export default [
  {
    type: 'field',
    name: 'wechat',
    label: '群主微信',
    placeholder: '请输入群主微信'
  },
  {
    type: 'picker',
    name: 'type',
    label: '群分类',
    placeholder: '请选择',
    columns: ['跨省群', '省内群']
  },
  {
    type: 'field',
    name: 'name',
    label: '群名称',
    placeholder: '请输入群名称'
  },
  {
    type: 'field',
    name: 'price',
    label: '群价格',
    placeholder: '请输入群价格',
    inputType: 'tel'
  },
  {
    type: 'picker',
    name: 'people',
    label: '群人数',
    placeholder: '请输入',
    columns: ['200人以下', '200-500人', '500-1000人', '1000人以上']
  }, {
    type: 'picker',
    name: 'area',
    label: '归属地',
    placeholder: '请选择',
    columns: ['重庆', '四川', '北京', '广州', '上海']
  },
  {
    type: 'field',
    name: 'keyword',
    label: '关键词',
    placeholder: '请输入关键词'
  },
  {
    type: 'textarea',
    name: 'require',
    label: '入群要求',
    placeholder: '请输入入群要求'
  },
  {
    type: 'textarea',
    name: 'introduction',
    label: '群介绍',
    placeholder: '请输入群介绍'
  },
  {
    type: 'textarea',
    name: 'description',
    label: '群说明',
    placeholder: '请输入群说明'
  }
]
