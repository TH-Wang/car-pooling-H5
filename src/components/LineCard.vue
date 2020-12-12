<template>
  <div class="card" @click="$emit('click')">
    <div class="start">{{record.startAddrAll}}</div>
    <img class="arrow" src="../assets/icons/line-arrow.png" alt="">
    <div class="end">{{record.endAddrAll}}</div>

    <!-- 拼单数量 -->
    <div :class="`num-tag-${tagColor}`">{{countTag}}</div>

    <!-- 常用tag -->
    <img
      v-if="record.common"
      class="common-tag"
      src="../assets/icons/common-tag.png"
      alt=""
    >
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    // ['yellow', 'green']
    tagColor: {
      type: String,
      default: 'yellow'
    }
  },
  computed: {
    countTag () {
      return this.record.num > 999 ? '999+' : this.record.num
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  margin: 0.25rem 0 0 0.15rem;
  padding: 15px 10px;
  width: 1.45rem;
  border-radius: 5px;
  font-size: 0.14rem;
  color: $main-text;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $linecard-color;
  position: relative;

  &:active{
    // opacity: 0.8;
    background-color: #eee;
  }

  // 线路箭头
  .arrow{
    width: 0.15rem;
    height: 0.15rem;
  }

  // 号码标签
  .num-tag{
    width: 0.54rem;
    height: 0.20rem;
    line-height: 0.20rem;
    border-radius: 0.20rem;
    color: white;
    font-size: 0.12rem;
    text-align: center;
    position: absolute;
    top: -0.08rem;
    right: -0.06rem;
  }

  .num-tag-yellow{
    @extend .num-tag;
    background-color: $main-color;
  }

  .num-tag-green{
    @extend .num-tag;
    background-color: $aid-green-color;
  }

  // 常用标签
  .common-tag{
    width: 0.33rem;
    height: 0.17rem;
    position: absolute;
    top: -0.03rem;
    left: 0.03rem;
  }
}
</style>
