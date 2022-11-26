<template>
    <!--
    <div class="footer-main">
        <h4>链接</h4>
        <a href="https://github.com/HoYoLive" class="footer-main-link" target="_blank">GitHub</a>
    </div>
    <div class="footer-main end">
        <div class="footer-main-link">© 2022 HoYoLive Production All rights reserved.</div>
        <a href="https://beian.miit.gov.cn/" class="footer-main-link" target="_blank">互联网ICP备案：京ICP备2022030336号-1</a>
        <div class="footer-main-link">京公网安备 11010802040623号</div>
    </div>-->
    <el-row justify="space-between" :gutter="16" style="width: 100%">
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="8" class="footer-main">
            <h4>链接</h4>
            <a href="https://github.com/HoYoLive" class="footer-main-link" target="_blank">GitHub</a>
        </el-col>
        <el-col :xs="0" :sm="0" :md="2" :lg="4" :xl="6"></el-col>
        <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="10" class="footer-main end">
            <div class="footer-main-link">© 2022 HoYoLive Production All rights reserved.</div>
            <a href="https://beian.miit.gov.cn/" class="footer-main-link" target="_blank">互联网ICP备案：京ICP备2022030336号-1</a>
            <div class="footer-main-link">京公网安备 11010802040623号</div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.footer-main {
    font-size: 0;
    vertical-align: top;
    margin-bottom: 30px;

    h4 {
        font-size: 18px;
        line-height: 1;
        margin: 0 0 15px;
        font-weight: 400;
        color: #303133;
    }

    .footer-main-link {
        display: block;
        margin: 0;
        line-height: 2;
        font-size: 14px;
        color: #606266;
        text-decoration-line: none;
    }
    &.end {
        .footer-main-link{
            color: #c8c9cc;
        }
    }
}
</style>
