<template>
  <el-drawer v-model="drawer" :with-header="false" direction="ltr" size="300">
    <el-menu :default-active="$route.path" :router="true" class="drawer-aside" @select="drawer = false">
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
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import {
  HomeFilled,
  Search
} from '@element-plus/icons-vue'

const props = defineProps({
  drawer: Boolean
})
const emit = defineEmits(['update:drawer'])
const drawer = computed({
  get () {
    return props.drawer
  },
  set (value) {
    emit('update:drawer', value)
    console.log(props.drawer)
  }
})
</script>

<style lang="scss" scoped>
.drawer-aside {
    margin: -20px;
}
</style>
