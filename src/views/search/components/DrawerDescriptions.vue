<template>
  <el-descriptions :column="24">
    <el-descriptions-item label="标题" :span="24">{{currentLive.title}}</el-descriptions-item>
    <el-descriptions-item label="视频" :span="8">
        <el-link @click="$emit('goVideo', currentLive)" type="primary">{{currentLive.video}}</el-link>
    </el-descriptions-item>
    <el-descriptions-item label="日期" :span="8">{{currentLive.date}}</el-descriptions-item>
    <el-descriptions-item label="时间" :span="8">{{currentLive.time}}</el-descriptions-item>
    <el-descriptions-item label="类型">
        <el-tag class="tag" size="small" v-for="t in currentLive.type" :key="t" :type="typeColorFormatter(t)" disable-transitions>
            {{ typeFormatter(t) }}
        </el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="下载" :span="24">
        <el-button size="small" v-for="(url,index) in downloadList" :key="index" @click="$emit('download', url)">
        <el-icon>
            <Download />
        </el-icon>
        地址 {{index + 1}}
      </el-button>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, inject } from 'vue'
import { Download } from '@element-plus/icons-vue'

interface LiveObj {
  date: string
  time: string
  source: string
  video: string
  p: number
  type: string[]
  title: string
  srt: string
  match: number
}

const props = defineProps<{
  currentLive?: LiveObj
  downloadList?: string[]
}>()

const emit = defineEmits(['goVideo', 'download'])

const currentLive = ref(props.currentLive!)
const downloadList = ref(props.downloadList!)

const typeColorFormatter = inject('typeColorFormatter') as (t: string) => (string)
const typeFormatter = inject('typeFormatter') as (t: string) => (string)
</script>

<style lang="scss" scoped>

</style>
