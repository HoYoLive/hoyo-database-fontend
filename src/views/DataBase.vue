<template>
    <el-container style="height: 100%;">
        <el-header>
            <el-affix :offset="0"><HeaderPage v-model:show-menu="showMenu"/></el-affix>
        </el-header>
        <el-container>
            <ResponsiveAside />
            <AsideDrawer v-model:drawer="showMenu"/>
            <el-container class="container">
                <el-main class="main">
                    <router-view />
                </el-main>
                <el-footer class="footer">
                    <FooterPage />
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
    <el-backtop />
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import FooterPage from '@/components/FooterPage.vue'
import HeaderPage from '@/components/HeaderPage.vue'
import AsideDrawer from '@/components/AsideDrawer.vue'
import ResponsiveAside from '@/components/ResponsiveAside.vue'

const showMenu = ref(false)
</script>

<style lang="scss" scoped>
.main {
    text-align: center;
}

.footer {
    display: flex;
    justify-content: center;
    height: initial;
    box-sizing: border-box;
    padding: 42px 64px 64px;
    background-color: #f4f4f5;
    margin-top: 64px;
}

.common-layout {
    height: 100%;
}

.container {
    flex-direction: column;
    justify-content: space-between;
}
</style>
