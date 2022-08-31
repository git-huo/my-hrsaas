<template>
  <div>
    12312
    {{ $attrs['user-id'] }}
    <button @click="mytest">123123</button></div>
</template>

<script>
export default {
  inheritAttrs: false,
  methods: {
    mytest() {
      this.$listeners
    }
  }
}
</script>

<style>

</style>
