<template>
  <div class="tabs">
    <div class="tabs-inner">
      <div
        v-for="item in tabs"
        :key="item.id"
        :class="`tabs-item${tabsId === item.id ? ' tabs-item-active' : ''}`"
        @click="handleChange($event, item.id)"
      >
        {{item.title}}
      </div>
    </div>

    <div class="icon">
      <van-icon name="arrow" size=".12rem" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: {
    'van-icon': Icon
  },
  model: {
    prop: 'tabsId',
    event: 'change'
  },
  props: {
    tabs: {
      type: Array,
      default: () => ([])
    },
    tabsId: null
  },
  data: () => ({

  }),
  methods: {
    handleChange (e, id) {
      this.$emit('change', id)
    }
  }
}
</script>

<style lang="scss" scoped>
$height: .23rem;

.tabs{
  width: 100%;
  height: $height;
  margin: .20rem 0;
  box-sizing: border-box;
  position: relative;

  &-inner{
    width: 100%;
    height: $height;
    padding-left: .15rem;
    box-sizing: border-box;
    white-space: nowrap;
    overflow-x: scroll;
    position: absolute;
    right: 0;
    top: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-item{
    padding: .03rem .09rem;
    border-radius: .12rem;
    margin-right: .10rem;
    font-size: .12rem;
    color: $main-text;
    display: inline-block;

    &-active{
      color: #ffffff;
      background: linear-gradient(135deg, #FFCD00 0%, #FFAE20 100%);
    }
  }

  .icon{
    @include flex ($align: center);
    width: .1rem;
    height: $height;
    padding-left: .05rem;
    padding-right: .15rem;
    background: linear-gradient(90deg, rgba($color: #fff, $alpha: 0.5) 0%,  rgba($color: #fff, $alpha: 1) 100%);
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
