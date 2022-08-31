<template>
  <div id="app">
    <!-- <PageTools /> -->
    <router-view />
    <!-- 21312321
    <TestIndex />
    <TestIndex1 /> -->
    <!-- <my-pagination :total="299" :total-pagess="current" @changePageEvent="changePageEvent" /> -->
  </div>
</template>

<script>
// import myPagination from '@/components/myPagination/index.vue'

export default {
  name: 'App',
  components: {
    // myPagination
  },
  data() {
    return {
      current: 1
    }
  },
  methods: {
    changePageEvent(val) {
      this.current = val
    }
  }
}
</script>

