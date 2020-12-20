// 余座选项
const seatOptions = new Array(6).fill('').map((e, i) => ({ id: i + 1, label: `${i + 1}座` }))

// 共用的车主发布拼车配置生成函数
const driCarpool = (carConfig) => ([
  {
    id: 'startTime',
    type: 'timer',
    name: 'startTime',
    label: '时间',
    placeholder: '请选择时间',
    clearable: true,
    required: true
  }, {
    id: 'vehicleType',
    type: 'picker',
    name: 'vehicleType',
    label: '车型',
    placeholder: '请选择车型',
    columns: carConfig,
    rules: [{ required: true }]
  }, {
    id: 'seatNum',
    type: 'picker',
    name: 'seatNum',
    label: '余座',
    placeholder: '请输入余座',
    columns: seatOptions,
    required: true
  }, {
    id: 'cost',
    type: 'field',
    name: 'cost',
    label: 'A费',
    placeholder: '请设置费用',
    rules: [{ required: true }]
  }
])

// 车主发布的表单配置项
export const getDriverOpts = (carConfig = []) => {
  const carpoolList = driCarpool(carConfig)
  return {
    // 拼车
    1: carpoolList,
    // 上下班拼车
    4: [{
      id: 'startTime',
      type: 'timer',
      name: 'startTime',
      label: '出发时间',
      title: '出发时间',
      placeholder: '请选择出发时间',
      clearable: true
    }, {
      id: 'returnTime',
      type: 'timer',
      name: 'returnTime',
      label: '返程时间',
      title: '返程时间',
      placeholder: '请选择返程时间',
      clearable: true
    },
    {
      id: 'vehicleType',
      type: 'picker',
      name: 'vehicleType',
      label: '车型',
      placeholder: '请选择车型',
      columns: carConfig
    }, {
      id: 'seatNum',
      type: 'picker',
      name: 'seatNum',
      label: '余座',
      placeholder: '请输入余座',
      columns: seatOptions,
      required: true
    }, {
      id: 'cost',
      type: 'field',
      name: 'cost',
      label: 'A费',
      placeholder: '请设置费用',
      rules: [{ required: true }]
    }],
    // 顺路带物
    5: [
      {
        id: 'startTime',
        type: 'timer',
        name: 'startTime',
        label: '时间',
        placeholder: '请选择时间',
        clearable: true
      }, {
        id: 'vehicleType',
        type: 'picker',
        name: 'vehicleType',
        label: '车型',
        placeholder: '请选择车型',
        columns: carConfig
      }, {
        id: 'weight',
        type: 'field',
        name: 'weight',
        label: '重量',
        placeholder: '请输入重量'
      }, {
        id: 'volume',
        type: 'field',
        name: 'volume',
        label: '体积',
        placeholder: '请输入体积'
      }, {
        id: 'cost',
        type: 'field',
        name: 'cost',
        label: 'A费',
        placeholder: '请设置费用',
        rules: [{ required: true }]
      }
    ],
    // 旅游包车
    6: [{
      id: 'startTime',
      type: 'timer',
      name: 'startTime',
      label: '出发时间',
      title: '出发时间',
      placeholder: '请选择出发时间',
      clearable: true
    }, {
      id: 'returnTime',
      type: 'timer',
      name: 'returnTime',
      label: '返程时间',
      title: '返程时间',
      placeholder: '请选择返程时间',
      clearable: true
    }, {
      id: 'vehicleType',
      type: 'picker',
      name: 'vehicleType',
      label: '车型',
      placeholder: '请选择车型',
      columns: carConfig
    }, {
      id: 'seatNum',
      type: 'picker',
      name: 'seatNum',
      label: '余座',
      placeholder: '请输入余座',
      columns: seatOptions,
      required: true
    }, {
      id: 'cost',
      type: 'field',
      name: 'cost',
      label: 'A费',
      placeholder: '请设置费用',
      rules: [{ required: true }]
    }]
  }
}

// 预约人数选项
const peopleOptions = new Array(6).fill('').map((e, i) => ({ id: i + 1, label: `${i + 1}人` }))

// 共用的乘客拼车配置
const cusCarpool = [
  {
    id: 'passengerStartTime',
    type: 'timer',
    name: 'passengerStartTime',
    label: '时间',
    placeholder: '请选择时间',
    clearable: true
  }, {
    id: 'orderNum',
    type: 'picker',
    name: 'orderNum',
    label: '人数',
    placeholder: '请选择乘坐人数',
    required: true,
    columns: peopleOptions
  },
  {
    id: 'cost',
    type: 'field',
    name: 'cost',
    label: 'A费',
    placeholder: '请设置费用',
    rules: [{ required: true }]
  }
]
// 乘客发布的表单配置项
export const customer = {
  // 拼车
  1: cusCarpool,
  // 上下班拼车
  4: [{
    id: 'passengerStartTime',
    type: 'timer',
    name: 'passengerStartTime',
    label: '出发时间',
    title: '出发时间',
    placeholder: '请选择出发时间',
    clearable: true
  }, {
    id: 'returnTime',
    type: 'timer',
    name: 'returnTime',
    label: '返程时间',
    title: '返程时间',
    placeholder: '请选择返程时间',
    clearable: true
  },
  {
    id: 'orderNum',
    type: 'picker',
    name: 'orderNum',
    label: '人数',
    placeholder: '请选择乘坐人数',
    required: true,
    columns: peopleOptions
  }, {
    id: 'cost',
    type: 'field',
    name: 'cost',
    label: 'A费',
    placeholder: '请设置费用',
    rules: [{ required: true }]
  }],
  // 顺路带物
  5: [{
    id: 'passengerStartTime',
    type: 'timer',
    name: 'passengerStartTime',
    label: '时间',
    placeholder: '请选择时间',
    clearable: true
  }, {
    id: 'goodsNum',
    type: 'field',
    name: 'goodsNum',
    label: '物品件数',
    placeholder: '请输入物品件数',
    inputType: 'tel'
  }, {
    id: 'weight',
    type: 'field',
    name: 'weight',
    label: '重量',
    placeholder: '请输入重量'
  }, {
    id: 'volume',
    type: 'field',
    name: 'volume',
    label: '体积',
    placeholder: '请输入体积'
  }, {
    id: 'cost',
    type: 'field',
    name: 'cost',
    label: 'A费',
    placeholder: '请设置费用',
    rules: [{ required: true }]
  }]
}
