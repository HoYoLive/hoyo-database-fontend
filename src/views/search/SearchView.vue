<template>
  <h1>{{$router.options.routes[1].name}}</h1>
  <SearchPage />
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import SearchPage from './components/SearchTable.vue'
</script>

<style lang="scss">

</style>
