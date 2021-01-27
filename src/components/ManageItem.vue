<template>
  <div class="manage-item">
    <div>{{record.userName}}</div>
    <div>{{record.percent || ' '}}</div>
    <div>{{record.publishNum}}</div>
    <div>
      <van-switch
        class="switch"
        :value="record.isPublish === 1"
        size=".23rem"
        active-color="#FFCD00"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
import { Switch } from 'vant'

export default {
  components: {
    'van-switch': Switch
  },
  props: {
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

  & > div{
    flex: 1;
    width: 25%;
    text-align: center;
  }
}
</style>
