<template>
    <el-menu :default-active="$route.path" :router="true" style="height: 100%">
        <el-menu-item index="/" >
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>{{$router.options.routes[0].name}}</span>
        </el-menu-item>
        <el-menu-item index="/search">
            <el-icon>
              <Search />
            </el-icon>
            <span>{{$router.options.routes[1].name}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import {
  HomeFilled,
  Search
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>

</style>
