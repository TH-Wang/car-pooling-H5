<template>
  <div class="card" @click="$emit('click')">
    <div class="start"><span>{{record.startAddrAll}}</span></div>
    <img class="arrow" src="../assets/icons/line-arrow.png" alt="">
    <div class="end"><span>{{record.endAddrAll}}</span></div>

    <!-- 拼单数量 -->
    <div :class="`num-tag-${tagColor}`">{{countTag}}</div>

    <!-- 常用tag -->
    <img
      v-if="record.isUsd"
      class="common-tag"
      src="@/assets/icons/common-tag.png"
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
    },
    addrName () {
      const {
        publishType,
        pname,
        adname,
        township,
        endpname,
        endadname,
        endtownship
      } = this.record
      switch (publishType) {
        case 1: return { start: `${pname}${adname}`, end: `${endpname}${endadname}` }
        case 2: return { start: adname, end: endadname }
        case 3: return { start: township, end: endtownship }
        default: return { start: '', end: '' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  margin: 0.25rem 0 0 0.15rem;
  padding: .15rem 0rem;
  width: 1.65rem;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 0.14rem;
  color: $main-text;
  display: flex;
  align-items: center;
  background-color: $linecard-color;
  position: relative;

  .start, .end{
    width: .7rem;
    text-align: center;
    // @include flex(center, center);
  }

  &:active{
    background-color: #eee;
  }

  // 线路箭头
  .arrow{
    width: 0.15rem;
    height: 0.15rem;
    margin: 0 .02rem;
  }

  // 号码标签
  .num-tag{
    width: 0.34rem;
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
