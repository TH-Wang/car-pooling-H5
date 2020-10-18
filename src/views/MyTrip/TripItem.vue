<template>
  <div class="trip">
    <div class="trip-header">
      <div :class="`tag tag-${record.type}`">{{tagText()}}</div>
      <start-end class="start-end" :start="record.start" :end="record.end" />
    </div>
    <div class="trip-detail">
      <time-seat :time="record.time" :seat="record.seat" :type="record.type" />
    </div>
    <!-- 删除按钮 -->
    <div v-show="showRemove" class="remove-button">
      <mini-button color="red" @click="$emit('remove', record.id)">删除</mini-button>
    </div>
  </div>
</template>

<script>
import { StartEnd, TimeSeat } from '@/components/Common'
import MiniButton from '@/components/MiniButton'

export default {
  components: {
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
  methods: {
    tagText () {
      switch (this.record.type) {
        case 'doing': return '进行中'
        case 'cancel': return '已撤下'
        case 'finish': return '已完成'
        default: return '已完成'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 容器
.trip{
  padding: .20rem 0.70rem .18rem 0;
  margin: 0 .15rem;
  border-bottom: solid 1px $light-color;
  position: relative;

  &-header{
    @include flex();
    margin-bottom: .05rem;

    .tag{
      width: 0.52rem;
      height: 0.16rem;
      margin-right: .10rem;
      flex-shrink: 0;
      border-radius: .02rem;
      @include flex (center, center);
      @include font (.11rem, #fff);
      transform: translateY(.03rem);

      &-doing{
        background-color: $sub-color;
      }

      &-cancel{
        background-color: $aid-blue-color;
      }

      &-finish{
        background-color: $aid-green-color;
      }
    }
  }

  // 删除按钮
  .remove-button{
    position: absolute;
    top: .20rem;
    right: 0;
  }
}
</style>
