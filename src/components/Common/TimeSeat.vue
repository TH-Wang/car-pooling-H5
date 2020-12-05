<template>
  <div class="container">
    <img src="@/assets/icons/order/time.png" alt="">
    <div>{{time}}</div>
    <span class="line">|</span>
    <img src="@/assets/icons/order/seat.png" alt="">
    <div>余座 <span :class="['seatNum', seatClass]">{{seat}}</span></div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Number,
      default: 1
    },
    time: String,
    seat: [String, Number],
    stateType: {
      1: 'doing',
      2: 'cancel',
      3: 'finish'
    }
  },
  computed: {
    seatClass () {
      return this.state === 1 ? 'active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  @include flex ($align: center);
  @include font (.12rem, $tip-text);

  img{
    width: 0.12rem;
    height: 0.12rem;
    margin-right: .05rem;
  }

  .line{
    margin: 0 .15rem;
  }

  .seatNum{
    font-size: .14rem;
  }

  .active{
    font-weight: bold;
    color: $main-color;
  }
}
</style>
