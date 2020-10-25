<template>
  <div class="card" @click="$emit('click')">
    <div class="card-title">{{title}}</div>
    <div class="card-detail">
      <div class="card-number">{{numberText()}}</div>
      <mini-button v-if="hasButton" color="green" @click="$emit('click-button')">
        支付欠费
      </mini-button>
    </div>
  </div>
</template>

<script>
import MiniButton from '@/components/MiniButton'

export default {
  components: {
    'mini-button': MiniButton
  },
  props: {
    title: {
      type: String,
      default: '钱包余额（元）'
    },
    number: {
      type: Number,
      default: 0
    },
    hasButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    numberText () {
      const textArr = this.number.toString().split('.')
      return textArr[1]
        ? textArr[0] + '0'.repeat(2 - textArr[1].length)
        : this.number + '.00'
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  width: 3.45rem;
  padding: .15rem;
  margin: .20rem auto;
  box-sizing: border-box;
  border-top-left-radius: .05rem;
  border-top-right-radius: .05rem;
  color: white;
  background: linear-gradient(135deg, #FFCD00 0%, #FFAE20 100%);

  &-title{
    font-size: .12rem;
  }

  &-detail{
    margin-top: .08rem;
    @include flex (space-between, center);
  }

  &-number{
    font-size: .36rem;
  }
}
</style>
