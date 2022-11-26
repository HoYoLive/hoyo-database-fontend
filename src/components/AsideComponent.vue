<template>
    <el-menu :default-active="$route.path" :router="true" class="aside" :collapse="collapse">
        <el-menu-item class="aside-item" index="/" >
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>{{$router.options.routes[0].name}}</span>
        </el-menu-item>
        <el-menu-item class="aside-item" index="/search">
            <el-icon>
              <Search />
            </el-icon>
            <span>{{$router.options.routes[1].name}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, PropType, defineEmits } from 'vue'
import {
  HomeFilled,
  Search
} from '@element-plus/icons-vue'
const props = defineProps({
  collapse: Boolean
})
</script>

<style lang="scss" scoped>
.aside {
  height: calc(100vh - 60px);
}
.aside-item span{
  padding-right: 100px;
}
</style>
