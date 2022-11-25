<template>
    <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect"
    active-text-color="#67C23A"
    >
        <div class="logo" >
            <img src="@/assets/images/hoyolive_green.svg" alt=""/>
        </div>

        <el-menu-item index="1">数据库</el-menu-item>
        <div class="flex-grow" />
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss">
.flex-grow {
    flex-grow: 1;
}

.logo {
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-right: 160px;

    img {
        height: 36px;
    }
}
</style>
