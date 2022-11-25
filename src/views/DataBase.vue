<template>
    <el-container style="height: 100%;">
        <el-header>
            <el-affix><HeaderPage /></el-affix>
        </el-header>
        <el-container>
            <el-aside width="300px">
                <AsidePage />
            </el-aside>
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
    <el-backtop :right="100" :bottom="100" />
</template>

<script lang="ts" setup>
import FooterPage from '@/components/FooterPage.vue'
import HeaderPage from '@/components/HeaderPage.vue'
import AsidePage from '@/components/AsidePage.vue'
</script>

<style lang="scss" scoped>
.main {
    text-align: center;
}

.footer {
    display: flex;
    justify-content: space-between;
    height: initial;
    box-sizing: border-box;
    padding: 42px 200px 64px;
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
