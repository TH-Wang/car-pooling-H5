export default [
  {
    type: 'field',
    name: 'userWeixin',
    label: '群主微信',
    placeholder: '请输入群主微信',
    rules: [{ required: true }]
  },
  {
    type: 'picker',
    name: 'classify',
    label: '群分类',
    placeholder: '请选择',
    columns: [{ id: 1, label: '跨省群' }, { id: 2, label: '省内群' }],
    required: true
  },
  {
    type: 'field',
    name: 'groupName',
    label: '群名称',
    placeholder: '请输入群名称',
    rules: [{ required: true }]
  },
  {
    type: 'field',
    name: 'price',
    label: '群价格',
    placeholder: '请输入群价格',
    inputType: 'tel',
    rules: [
      { required: true },
      {
        validator: value => !isNaN(value),
        message: '请输入合理的价格'
      }
      // { pattern: /^\d+$/g, message: '请输入合理的价格' }
    ]
  },
  {
    type: 'picker',
    name: 'peopleNumber',
    label: '群人数',
    placeholder: '请输入',
    columns: [
      { id: 1, label: '200人以下' },
      { id: 2, label: '200-500人' },
      { id: 3, label: '500-1000人' },
      { id: 4, label: '1000人以上' }
    ],
    required: true
  }, {
    type: 'area',
    name: 'area',
    label: '归属地',
    title: '选择归属地',
    placeholder: '请选择',
    required: true
  },
  {
    type: 'field',
    name: 'keyword',
    label: '关键词',
    placeholder: '请输入关键词',
    rules: [{ required: true }]
  },
  {
    type: 'textarea',
    name: 'groupRequire',
    label: '入群要求',
    placeholder: '请输入入群要求',
    required: true
  },
  {
    type: 'textarea',
    name: 'groupIntroduce',
    label: '群介绍',
    placeholder: '请输入群介绍',
    required: true
  },
  {
    type: 'textarea',
    name: 'groupExplain',
    label: '群说明',
    placeholder: '请输入群说明',
    required: true
  }
]
