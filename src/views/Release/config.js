// import store from '@/store'

// const userPhone = store.state.user.info.phone

export const driver = [
  // 占位
  [],
  // 拼车
  [
  //   {
  //   id: '1-1',
  //   type: 'field',
  //   name: 'mobilePhone',
  //   defaultValue: userPhone,
  //   label: '手机号',
  //   placeholder: '请输入手机号',
  //   inputType: 'tel',
  //   rules: [{ required: true }]
  // },
    {
      id: '1-2',
      type: 'timer',
      name: 'startTime',
      label: '时间',
      placeholder: '请选择时间',
      clearable: true,
      required: true
    }, {
      id: '1-3',
      type: 'picker',
      name: 'vehicleType',
      label: '车型',
      placeholder: '请选择车型',
      columns: [{ id: 0, label: '小面包车' }, { id: 1, label: '轿车' }, { id: 2, label: 'SUV' }],
      rules: [{ required: true }]
    }, {
      id: '1-4',
      type: 'field',
      name: 'seatNum',
      label: '余座',
      placeholder: '请输入余座',
      inputType: 'tel',
      maxLength: 1,
      rules: [{ required: true }]
    }, {
      id: '1-5',
      type: 'field',
      name: 'cost',
      label: 'A费',
      placeholder: '请设置费用',
      rules: [{ required: true }]
    }, {
      id: '1-6',
      type: 'picker',
      name: 'isTakeGoods',
      label: '是否带物',
      columns: [{ id: 0, label: '否' }, { id: 1, label: '是' }]
    // defaultIndex: 0
    }, {
      id: '1-7',
      type: 'field',
      name: 'weight',
      label: '重量',
      placeholder: '请输入重量'
    }, {
      id: '1-8',
      type: 'field',
      name: 'volume',
      label: '体积',
      placeholder: '请输入体积'
    }
  ],
  // 上下班拼车
  [{
    id: '2-1',
    type: 'timer',
    name: 'start_time',
    label: '出发时间',
    title: '出发时间',
    placeholder: '请选择出发时间',
    clearable: true
  }, {
    id: '2-2',
    type: 'timer',
    name: 'back_time',
    label: '返程时间',
    title: '返程时间',
    placeholder: '请选择返程时间',
    clearable: true
  },
  // {
  //   id: '2-3',
  //   type: 'field',
  //   name: 'phone',
  //   defaultValue: userPhone,
  //   label: '手机号',
  //   placeholder: '请输入手机号',
  //   inputType: 'tel'
  // },
  {
    id: '2-4',
    type: 'picker',
    name: 'car_type',
    label: '车型',
    placeholder: '请选择车型',
    columns: [{ id: 0, label: '小面包车' }, { id: 1, label: '轿车' }, { id: 2, label: 'SUV' }]
  }, {
    id: '2-5',
    type: 'field',
    name: 'seat',
    label: '余座',
    placeholder: '请输入余座',
    inputType: 'tel',
    maxLength: 1
  }, {
    id: '2-6',
    type: 'field',
    name: 'price',
    label: 'A费',
    placeholder: '请设置费用'
  }, {
    id: '2-7',
    type: 'field',
    name: 'weight',
    label: '重量',
    placeholder: '请输入重量'
  }, {
    id: '2-8',
    type: 'field',
    name: 'volume',
    label: '体积',
    placeholder: '请输入体积'
  }],
  // 顺路带物
  [
  //   {
  //   id: '1-1',
  //   type: 'field',
  //   name: 'phone',
  //   defaultValue: userPhone,
  //   label: '手机号',
  //   placeholder: '请输入手机号',
  //   inputType: 'tel'
  // },
    {
      id: '1-2',
      type: 'timer',
      name: 'time',
      label: '时间',
      placeholder: '请选择时间',
      clearable: true
    }, {
      id: '1-3',
      type: 'picker',
      name: 'car_type',
      label: '车型',
      placeholder: '请选择车型',
      columns: [{ id: 0, label: '小面包车' }, { id: 1, label: '轿车' }, { id: 2, label: 'SUV' }]
    }, {
      id: '2-7',
      type: 'field',
      name: 'weight',
      label: '重量',
      placeholder: '请输入重量'
    }, {
      id: '2-8',
      type: 'field',
      name: 'volume',
      label: '体积',
      placeholder: '请输入体积'
    }, {
      id: '2-6',
      type: 'field',
      name: 'price',
      label: 'A费',
      placeholder: '请设置费用'
    }
  ],
  // 旅游包车
  [{
    id: '4-1',
    type: 'timer',
    name: 'start_time',
    label: '出发时间',
    title: '出发时间',
    placeholder: '请选择出发时间',
    timerType: 'datetime',
    defaultTime: new Date(),
    clearable: true
  }, {
    id: '4-2',
    type: 'timer',
    name: 'back_time',
    label: '返程时间',
    title: '返程时间',
    placeholder: '请选择返程时间',
    timerType: 'datetime',
    defaultTime: new Date(),
    clearable: true
  }, {
    id: '4-3',
    type: 'picker',
    name: 'car_type',
    label: '车型',
    placeholder: '请选择车型',
    columns: [{ id: 0, label: '小面包车' }, { id: 1, label: '轿车' }, { id: 2, label: 'SUV' }]
  }, {
    id: '4-4',
    type: 'field',
    name: 'seat',
    label: '余座',
    placeholder: '请输入余座',
    inputType: 'tel',
    maxLength: 1
  }, {
    id: '4-5',
    type: 'field',
    name: 'price',
    label: 'A费',
    placeholder: '请设置费用'
  }]
]

export const customer = [
  // 占位
  [],
  // 拼车
  [
  //   {
  //   id: '1-1',
  //   type: 'field',
  //   name: 'phone',
  //   label: '手机号',
  //   placeholder: '请输入手机号',
  //   inputType: 'tel'
  // },
    {
      id: '1-2',
      type: 'timer',
      name: 'time',
      label: '时间',
      placeholder: '请选择时间',
      clearable: true
    }, {
      id: '1-3',
      type: 'field',
      name: 'people',
      label: '人数',
      inputType: 'tel',
      maxLength: 1,
      placeholder: '请输入乘坐人数',
      rules: [{ required: true }, { pattern: /^\d$/, message: '请输入数字' }]
    }, {
      id: '1-4',
      type: 'field',
      name: 'weight',
      label: '重量',
      placeholder: '请输入重量'
    }, {
      id: '1-5',
      type: 'field',
      name: 'volume',
      label: '体积',
      placeholder: '请输入体积'
    }, {
      id: '1-6',
      type: 'field',
      name: 'price',
      label: 'A费',
      placeholder: '请设置费用'
    }
  ],
  // 上下班拼车
  [{
    id: '2-1',
    type: 'timer',
    name: 'start_time',
    label: '出发时间',
    title: '出发时间',
    placeholder: '请选择出发时间',
    clearable: true
  }, {
    id: '2-2',
    type: 'timer',
    name: 'back_time',
    label: '返程时间',
    title: '返程时间',
    placeholder: '请选择返程时间',
    clearable: true
  },
  // {
  //   id: '2-3',
  //   type: 'field',
  //   name: 'phone',
  //   label: '手机号',
  //   placeholder: '请输入手机号',
  //   inputType: 'tel'
  // },
  {
    id: '2-4',
    type: 'field',
    name: 'people',
    label: '人数',
    inputType: 'tel',
    maxLength: 1,
    placeholder: '请输入乘坐人数',
    rules: [{ required: true }, { pattern: /^\d$/, message: '请输入数字' }]
  }, {
    id: '2-5',
    type: 'field',
    name: 'price',
    label: 'A费',
    placeholder: '请设置费用'
  }],
  // 顺路带物
  [
  //   {
  //   id: '3-1',
  //   type: 'field',
  //   name: 'phone',
  //   label: '手机号',
  //   placeholder: '请输入手机号',
  //   inputType: 'tel'
  // },
    {
      id: '3-2',
      type: 'timer',
      name: 'time',
      label: '时间',
      placeholder: '请选择时间',
      clearable: true
    }, {
      id: '3-3',
      type: 'field',
      name: 'count',
      label: '物品件数',
      placeholder: '请输入物品件数',
      inputType: 'tel'
    }, {
      id: '3-4',
      type: 'field',
      name: 'weight',
      label: '重量',
      placeholder: '请输入重量'
    }, {
      id: '3-5',
      type: 'field',
      name: 'volume',
      label: '体积',
      placeholder: '请输入体积'
    }, {
      id: '3-6',
      type: 'field',
      name: 'price',
      label: 'A费',
      placeholder: '请设置费用'
    }
  ]
]
