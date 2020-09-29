<template>
  <div id="button">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#button{
  width: 100%;
  height: 0.50rem;
  line-height: 0.50rem;
  border-radius: 0.05rem;
  text-align: center;
  color: white;
  font-size: 0.16rem;
  background-color: $main-color;
}
</style>
