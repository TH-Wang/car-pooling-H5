<template>
  <div>
    <van-dropdown-menu class="dropdown" active-color="#FFCD00">
      <van-dropdown-item
        v-for="(item, index) in filters"
        :key="index"
        v-model="item.value"
        :options="item.options"
      />
    </van-dropdown-menu>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from 'vant'
import { isEmpty } from 'lodash'
import OrderFilter from '@/utils/filters-order'

export default {
  components: {
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem
  },
  props: {
    filterList: Object
  },
  data: () => ({
    filters: OrderFilter
  }),
  mounted () {
    if (!isEmpty(this.filterList)) {
      this.filters = this.filterList
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
