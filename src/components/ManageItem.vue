<template>
  <div class="manage-item">
    <div>{{record.name}}</div>
    <div>{{record.percent}}</div>
    <div>{{record.published}}</div>
    <van-switch
      :value="value"
      size=".23rem"
      active-color="#FFCD00"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { Switch } from 'vant'

export default {
  components: {
    'van-switch': Switch
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    record: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    active: true
  }),
  methods: {
    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-item{
  height: .60rem;
  margin: 0 .15rem;
  @include flex (space-between, center);
  @include font (.14rem, $main-text);
}
</style>
