<template>
  <!-- 拼车 -->
  <div v-if="type === 'carpool'">
    <carpool-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      @click="handleLinkDetail($event, item.pprId)"
    ><template #button>
        <mini-button
          color="yellow"
          @click="handleLinkDetail($event, item.pprId)"
        >立即预订</mini-button>
      </template>
    </carpool-order>
  </div>

  <!-- 车主找人 -->
  <div v-else-if="type === 'pending'">
    <pending-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      @click="handleLinkDetail($event, item.pprId)"
    ><template #button>
        <driver-reserve-button :record="item" />
      </template>
    </pending-order>
  </div>

  <!-- 上下班拼车：车主信息 -->
  <div v-else-if="type === 'hitDri'">
    <hitchhike-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      color="yellow"
      showCar showLineDetail
      @click="handleLinkDetail($event, item.pprId)"
    >
      <!-- 预约按钮 -->
      <template #button>
        <mini-button
          color="yellow"
          @click="handleLinkDetail($event, item.pprId)"
        >立即预订</mini-button>
      </template>
    </hitchhike-order>
  </div>

  <!-- 上下班拼车：乘客信息 -->
  <div v-else-if="type === 'hitCus'">
    <hitchhike-order
      v-for="(item, index) in list"
      :key="index"
      :record="item"
      color="green"
    ><template #button>
        <driver-reserve-button :record="item" />
      </template>
    </hitchhike-order>
  </div>
</template>

<script>
export default {
  props: {
    // 业务订单类型
    type: {
      type: String,
      default: 'carpool'
    },
    // 数据列表
    list: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
