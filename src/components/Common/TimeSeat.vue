<template>
  <div class="container">
    <img src="@/assets/icons/order/time.png" alt="">
    <div>{{time}}</div>
    <span class="line">|</span>
    <img src="@/assets/icons/order/seat.png" alt="">
    <div>余座 <span :class="seatClass">{{seat}}</span></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: [String, Number],
      default: 'doing'
    },
    time: String,
    seat: [String, Number]
  },
  computed: {
    seatClass () {
      return this.type === 'doing' ? 'active' : ''
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

  .active{
    font-weight: bold;
    color: $main-color;
  }
}
</style>
