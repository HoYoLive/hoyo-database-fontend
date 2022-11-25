<template>
    <div class="footer-main">
        <h4>链接</h4>
        <a href="https://github.com/HoYoLive" class="footer-main-link" target="_blank">GitHub</a>
    </div>
    <div class="footer-main end">
        <div class="footer-main-link">© 2022 HoYoLive Production All rights reserved.</div>
        <a href="https://beian.miit.gov.cn/" class="footer-main-link" target="_blank">互联网ICP备案：京ICP备2022030336号-1</a>
        <div class="footer-main-link">京公网安备 11010802040623号</div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.footer-main {
    font-size: 0;
    vertical-align: top;
    margin-right: 130px;

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
        text-align: end;
        flex: 1 1 auto;

        .footer-main-link{
            color: #c8c9cc;
        }
    }
}
</style>
