<template>
    <h1>{{ $router.options.routes[0].name }}</h1>
    <p>HoYoLive 二创切片的有力助手，免费且开源</p>
    <el-row justify="center" class="cards">
        <el-col :xs="20" :sm="19" :md="18" :lg="17" :xl="16">
            <el-row :gutter="16">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
                    <el-card shadow="hover" class="card">
                        <template #header>
                            <div class="card-header">
                                <span>字幕搜索</span>
                                <router-link class="link" to="/search">
                                <el-button type="success" plain>进入</el-button>
                                </router-link>
                            </div>
                        </template>
                        <p>包含 HoYoLive 成员录播字幕数据，字幕通过 AI 识别生成。</p>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.cards {
    margin-top: 64px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .link {
    text-decoration: none;
  }
}
.card p {
    font-size: var(--el-font-size-base);
    line-height: 1.5;
    text-align: start;
    color: #909399;
}

</style>
