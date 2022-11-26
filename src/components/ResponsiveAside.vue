<template>
  <div class="affix-container">
    <el-affix target=".affix-container" :offset="60">
      <Aside class="hidden-md-and-up hidden-xs-only" collapse />
      <Aside class="hidden-sm-and-down" />
    </el-affix>
  </div>
</template>

<script lang="ts" setup>
import Aside from '@/components/AsideComponent.vue'
import 'element-plus/theme-chalk/display.css'

</script>

<style lang="scss" scoped>

</style>
