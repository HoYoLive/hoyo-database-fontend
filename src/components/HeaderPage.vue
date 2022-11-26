<template>
    <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect"
    active-text-color="#67C23A"
    >
        <div class="logo hidden-xs-only" >
            <img src="@/assets/images/hoyolive_green.svg" alt=""/>
        </div>
        <div class="show-menu hidden-sm-and-up" @click="showMenu = !showMenu">
            <el-icon><Menu /></el-icon>
        </div>
        <el-menu-item index="1" class="">数据库</el-menu-item>
        <div class="flex-grow" />
    </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { Menu } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const props = defineProps({
  showMenu: Boolean
})
const emit = defineEmits(['update:showMenu'])
const showMenu = computed({
  get () {
    return props.showMenu
  },
  set (value) {
    emit('update:showMenu', value)
    console.log(props.showMenu)
  }
})
</script>

<style lang="scss">

.flex-grow {
    flex-grow: 1;
}

.logo {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    height: 56px;

    img {
        display: inline-block;
        height: 36px;
    }
}

.show-menu {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 56px;
}
</style>
