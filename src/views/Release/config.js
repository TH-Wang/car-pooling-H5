// 共用的车主发布拼车配置生成函数
const driCarpool = (carConfig) => ([
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
    columns: carConfig,
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
])

// 车主发布的表单配置项
export const getDriverOpts = (carConfig = []) => {
  const carpoolList = driCarpool(carConfig)
  return {
    // 拼车
    1: carpoolList,
    2: carpoolList,
    3: carpoolList,
    // 上下班拼车
    4: [{
      id: '2-1',
      type: 'timer',
      name: 'startTime',
      label: '出发时间',
      title: '出发时间',
      placeholder: '请选择出发时间',
      clearable: true
    }, {
      id: '2-2',
      type: 'timer',
      name: 'endTime',
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
      name: 'vehicleType',
      label: '车型',
      placeholder: '请选择车型',
      columns: carConfig
    }, {
      id: '2-5',
      type: 'field',
      name: 'seatNum',
      label: '余座',
      placeholder: '请输入余座',
      inputType: 'tel',
      maxLength: 1
    }, {
      id: '2-6',
      type: 'field',
      name: 'cost',
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
    5: [
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
        id: '3-1',
        type: 'timer',
        name: 'startTime',
        label: '时间',
        placeholder: '请选择时间',
        clearable: true
      }, {
        id: '3-2',
        type: 'picker',
        name: 'vehicleType',
        label: '车型',
        placeholder: '请选择车型',
        columns: carConfig
      }, {
        id: '3-3',
        type: 'field',
        name: 'weight',
        label: '重量',
        placeholder: '请输入重量'
      }, {
        id: '3-4',
        type: 'field',
        name: 'volume',
        label: '体积',
        placeholder: '请输入体积'
      }, {
        id: '3-5',
        type: 'field',
        name: 'cost',
        label: 'A费',
        placeholder: '请设置费用'
      }
    ],
    // 旅游包车
    6: [{
      id: '4-1',
      type: 'timer',
      name: 'startTime',
      label: '出发时间',
      title: '出发时间',
      placeholder: '请选择出发时间',
      clearable: true
    }, {
      id: '4-2',
      type: 'timer',
      name: 'endTime',
      label: '返程时间',
      title: '返程时间',
      placeholder: '请选择返程时间',
      clearable: true
    }, {
      id: '4-3',
      type: 'picker',
      name: 'vehicleType',
      label: '车型',
      placeholder: '请选择车型',
      columns: carConfig
    }, {
      id: '4-4',
      type: 'field',
      name: 'seatNum',
      label: '余座',
      placeholder: '请输入余座',
      inputType: 'tel',
      maxLength: 1
    }, {
      id: '4-5',
      type: 'field',
      name: 'cost',
      label: 'A费',
      placeholder: '请设置费用'
    }]
  }
}

// 共用的乘客拼车配置
const cusCarpool = [
  {
    id: '1-2',
    type: 'timer',
    name: 'passengerStartTime',
    label: '时间',
    placeholder: '请选择时间',
    clearable: true
  }, {
    id: '1-3',
    type: 'field',
    name: 'orderNum',
    label: '人数',
    inputType: 'tel',
    maxLength: 1,
    placeholder: '请输入乘坐人数',
    rules: [{ required: true }]
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
    name: 'cost',
    label: 'A费',
    placeholder: '请设置费用'
  }
]
// 乘客发布的表单配置项
export const customer = {
  // 拼车
  1: cusCarpool,
  2: cusCarpool,
  3: cusCarpool,
  // 上下班拼车
  4: [{
    id: '2-1',
    type: 'timer',
    name: 'passengerStartTime',
    label: '出发时间',
    title: '出发时间',
    placeholder: '请选择出发时间',
    clearable: true
  }, {
    id: '2-2',
    type: 'timer',
    name: 'returnTime',
    label: '返程时间',
    title: '返程时间',
    placeholder: '请选择返程时间',
    clearable: true
  },
  {
    id: '2-4',
    type: 'field',
    name: 'orderNum',
    label: '人数',
    inputType: 'tel',
    maxLength: 1,
    placeholder: '请输入乘坐人数',
    rules: [{ required: true }]
  }, {
    id: '2-5',
    type: 'field',
    name: 'cost',
    label: 'A费',
    placeholder: '请设置费用'
  }],
  // 顺路带物
  5: [
    {
      id: '3-2',
      type: 'timer',
      name: 'passengerStartTime',
      label: '时间',
      placeholder: '请选择时间',
      clearable: true
    }, {
      id: '3-3',
      type: 'field',
      name: 'goodsNum',
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
      name: 'cost',
      label: 'A费',
      placeholder: '请设置费用'
    }
  ]
}
