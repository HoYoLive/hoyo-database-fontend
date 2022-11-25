<template>
  <el-config-provider :locale="zhCn" :button="{autoInsertSpace: true}">
    <DataBaseVue />
  </el-config-provider>
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

::-webkit-scrollbar {
  width: 6px
}

::-webkit-scrollbar:horizontal {
  height: 6px
}

::-webkit-scrollbar-track {
  border-radius: 10px
}

::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all .2s ease-in-out
}

::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background-color: #0000004d
}
</style>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import DataBaseVue from './views/DataBase.vue'
</script>
