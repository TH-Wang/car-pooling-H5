<template>
  <div class="trip" @click="$emit('click')">
    <div class="main">
      <div class="trip-header">
        <!-- 标签 -->
        <div :class="`tag tag-${statusClass[orderState]}`">
          {{statusText[orderState]}}
        </div>
        <!-- 起止点 -->
        <start-end class="start-end" :start="record.startPoint" :end="record.endPoint" />
      </div>
      <!-- 时间、余座 -->
      <div class="trip-detail">
        <time-seat :time="record.startTime" :seat="record.seatNum" :state="orderState" />
      </div>
    </div>
    <!-- 删除按钮 -->
    <div v-show="showRemove" class="remove-button">
      <mini-button color="blue" @click="$emit('action')">操作</mini-button>
    </div>
  </div>
</template>

<script>
// import { Icon } from 'vant'
import { StartEnd, TimeSeat } from '@/components/Common'
import MiniButton from '@/components/MiniButton'

export default {
  components: {
    // 'van-icon': Icon,
    'start-end': StartEnd,
    'time-seat': TimeSeat,
    'mini-button': MiniButton
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    showRemove: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    statusText: {
      1: '进行中',
      2: '已撤下',
      3: '已完成'
    },
    statusClass: {
      1: 'doing',
      2: 'cancel',
      3: 'finish'
    }
  }),
  computed: {
    orderState () {
      return this.record.orderState
    }
  }
}
</script>

<style lang="scss" scoped>
// 容器
.trip{
  padding: .20rem 0 .18rem 0;
  margin: 0 .15rem;
  border-bottom: solid 1px #f3f3f3;
  position: relative;
  @include flex (space-between, center);

  .main{
    flex: 1
  }

  &-header{
    @include flex();
    margin-bottom: .05rem;

    .tag{
      width: 0.45rem;
      height: 0.16rem;
      margin-right: .10rem;
      flex-shrink: 0;
      border-radius: .02rem;
      @include flex (center, center);
      @include font (.11rem, #fff);
      transform: translateY(.03rem);

      &-doing{ background-color: $sub-color }

      &-cancel{ background-color: $aid-blue-color }

      &-finish{ background-color: $aid-green-color }
    }
  }

  // 删除按钮
  .remove-button{
    margin-left: .05rem;
  }
}
</style>
