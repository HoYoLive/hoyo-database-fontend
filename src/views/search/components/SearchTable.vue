<template>
    <el-input v-model="input" placeholder="请输入关键词" class="input" @change="search">
        <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 115px">
          <el-option label="All" value="" />
          <el-option v-for="(c,index) in characters" :key="index" :label="c" :value="c" />
        </el-select>
        </template>
    </el-input>
    <el-row justify="center">
        <el-col style="max-width: 80%">
            <el-table :data="tableData" tableLayout="auto" @sort-change="sortChange" @cell-dblclick="showDrawer">
            <el-table-column prop=date sortable label="日期" width="90" />
            <el-table-column prop=time label="时间" width="80" />
            <el-table-column prop=video label="视频" width="120">
                <template #default="scope">
                    <el-link @click="goVideo(scope.row)" type="primary">{{scope.row.video}}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop=title label="标题" />
            <el-table-column prop=type label="类型"
            :filters="[
                { text: '游戏', value: 'game' },
                { text: '杂谈', value: 'chat' },
                { text: '绘画', value: 'paint' },
                { text: '歌曲', value: 'song' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            width="180"
            >
                <template #default="scope">
                <el-tag class="tag" v-for="t in scope.row.type" :key="t" :type="typeColorFormatter(t)" disable-transitions>{{ typeFormatter(t) }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop=match label="匹配关键词数" sortable="custom" :formatter="getMatch" width="150"/>
            <el-table-column fixed="right" align="center" label="下载" width="100">
                <template #default="scope">
                  <el-button size="small" @click="handleDownload(scope.$index, scope.row)">
                    <el-icon>
                        <Download />
                    </el-icon>
                  </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[15, 30, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableAllData.length"
        class="pag"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
        </el-col>
    </el-row>
    <el-dialog v-model="dialogDownloadVisible" title="下载字幕">
      <el-button v-for="(url,index) in downloadList" :key="index" @click="download(url)">
        <el-icon>
            <Download />
        </el-icon>
        下载地址 {{index + 1}}
      </el-button>
    </el-dialog>
    <el-drawer v-model="drawer" :title="subtitleRename(currentLive)">
      <el-button size="small" @click="goVideo(currentLive)">
        <el-icon><VideoPlay /></el-icon>
        打开录播
      </el-button>
      <el-button size="small" v-for="(url,index) in downloadList" :key="index" @click="download(url)">
        <el-icon>
            <Download />
        </el-icon>
        下载地址 {{index + 1}}
      </el-button>
      <el-auto-resizer style="height: calc(100% - 100px); margin-top: 16px;">
        <template #default="{ height, width }">
      <el-table :data="filterSrtData" :height="height" :style="`width: ${width}px;`">
        <el-table-column fixed prop="id" label="序号" width="70"/>
        <el-table-column prop="startTime" label="时间" width="130"/>
        <el-table-column>
          <template #header>
            <el-input v-model="input" size="small" placeholder="筛选" />
          </template>
          <template #default="scope">
            {{scope.row.text}}
          </template>
        </el-table-column>
      </el-table>
      </template>
      </el-auto-resizer>
      <!--
      <el-input size="small" v-model="input" placeholder="筛选" style="width: 200px; margin-left: 16px;" />
      <el-auto-resizer style="height: calc(100% - 100px); margin-top: 16px;">
        <template #default="{ height, width }">
          <el-table-v2
            ref="srtTableRef"
            :columns="srtColumns"
            :data="filterSrtData"
            :width="width"
            :height="height"
            fixed
          />
        </template>
      </el-auto-resizer>-->
    </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { Download, VideoPlay } from '@element-plus/icons-vue'
import { ElMessage, MessageHandler } from 'element-plus'
import type { Column, TableV2Instance } from 'element-plus'
import axios from 'axios'
import parser from 'subtitles-parser'

// 定义录播数据结构
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

interface srtObj {
  id: string
  startTime: string
  endTime: string
  text: string
}

const characters = ref([]) // 角色列表
const input = ref('') // 输入框内容
const select = ref('') // 输入框内容
const currentPage = ref(1)// 当前页
const pageSize = ref(15) // 每页数量
const dialogDownloadVisible = ref(false) // 下载对话框可见性
const downloadList = ref<string[]>([]) // 下载地址列表
const drawer = ref(false)
let currentLive : LiveObj // 当前录播对象

/* 输入框部分 */
// 角色列表 ["yaoyao"]
axios({
  url: '/database/characters',
  method: 'get'
}).then(res => {
  characters.value = res.data.character
})
// 搜索事件
const search = () => {
  axios({
    url: '/database/ss',
    method: 'get',
    params: {
      words: input.value,
      character: select.value
    }
  }).then(res => {
    tableAllData = res.data
    tableData.value = tableAllData.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value)
  })
}
search()
/* 表格部分 */
// 表格数据
let tableAllData: LiveObj[] = []
const tableData = ref<LiveObj[]>([])
// 排序事件
const sortChange = (obj : {column: TableColumnCtx<LiveObj>, prop: string, order: string}) => {
  // console.log(obj)
  if (obj.prop === 'match') {
    currentPage.value = 1 // 排序后返回第一页
    if (obj.order === 'descending') {
      tableAllData.sort((a: LiveObj, b: LiveObj) => b.match - a.match)
    } else if (obj.order === 'ascending') {
      tableAllData.sort((a: LiveObj, b: LiveObj) => a.match - b.match)
    }
    tableData.value = tableAllData.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value)
  } else if (obj.prop === 'date') {
    currentPage.value = 1 // 排序后返回第一页
    if (obj.order === 'descending') {
      tableAllData.sort((a: LiveObj, b: LiveObj) => date2num(b.date) - date2num(a.date))
    } else if (obj.order === 'ascending') {
      tableAllData.sort((a: LiveObj, b: LiveObj) => date2num(a.date) - date2num(b.date))
    }
    tableData.value = tableAllData.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value)
  }
}
const date2num = (date : string) : number => {
  return parseInt(date.split('-').join(''))
}
// 获取匹配数
const getMatch = (row: LiveObj, column: TableColumnCtx<LiveObj>) => {
  return row.match ?? 0
}
const goVideo = (row: LiveObj) => {
  let url
  switch (row.source) {
    case 'acfun':
      url = `https://www.acfun.cn/v/${row.video}_${row.p}`
      break
    case 'bilibili':
      url = `https://www.bilibili.com/video/${row.video}?p=${row.p}`
      break
  }
  window.open(url, '_blank')
}
// 下载原始字幕操作
const handleDownload = (index: number, row: LiveObj) => {
  console.log(index, row)
  axios({
    url: '/database/getsrt',
    method: 'get',
    params: {
      srt: row.srt
    }
  }).then(res => {
    console.log(res.data)
    currentLive = row
    downloadList.value = res.data
    dialogDownloadVisible.value = true
  })
}
const download = (url: string) => {
  const fileName = subtitleRename(currentLive)
  ElMessage({
    message: '字幕下载中，请留意浏览器下载提示。',
    type: 'success'
  })
  axios({
    url: url,
    method: 'get',
    responseType: 'blob'
  }).then(res => {
    const u = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = u // 给a标签赋上下载地址
    a.download = `${fileName}`
    a.style.display = 'none' // 让a标签不显示
    a.click() // a标签自点击
    URL.revokeObjectURL(a.href)
    // dialogDownloadVisible.value = false
  })
}
// 标签筛选方法
const filterTag = (value: string, row: LiveObj) => {
  return row.type.indexOf(value) > -1
}
// 标签命名与颜色设定
const typeFormatter = (t: string) => {
  switch (t) {
    case 'game':
      return '游戏'
    case 'chat':
      return '杂谈'
    case 'paint':
      return '绘画'
    case 'song':
      return '歌曲'
  }
}
const typeColorFormatter = (t: string) => {
  switch (t) {
    case 'game':
      return ''
    case 'chat':
      return 'success'
    case 'paint':
      return 'info'
    case 'song':
      return 'warning'
  }
}
const srtData = ref<srtObj[]>([])
const srtTableRef = ref<TableV2Instance>()
// 展示具体字幕
const showDrawer = (row: LiveObj, column: TableColumnCtx<LiveObj>, cell: any, event: any) => {
  let srtLoadMsg : MessageHandler
  axios({
    url: '/database/getsrt',
    method: 'get',
    params: {
      srt: row.srt
    }
  }).then(res => {
    console.log(res.data)
    currentLive = row
    downloadList.value = res.data
    srtLoadMsg = ElMessage({
      message: '字幕载入中'
    })
    return axios({
      url: downloadList.value[downloadList.value.length - 1],
      method: 'get'
    })
  }).then(res => {
    srtData.value = parser.fromSrt(res.data)
  }).then(() => {
    drawer.value = true
  }).then(() => {
    srtLoadMsg.close()
    ElMessage({
      message: '字幕载入完毕',
      type: 'success'
    })
    srtTableRef.value?.scrollToTop(0)
  })
}
const subtitleRename = (live: LiveObj) => {
  return live ? `${live.date}_${live.video}_${live.p}_${live.title}.srt` : 'subtitle.srt'
}
const filterSrtData = computed(() =>
  srtData.value.filter(
    (data: srtObj) =>
      !input.value ||
      data.text.toLowerCase().includes(input.value.toLowerCase())
  )
)
const srtColumns: Column<srtObj>[] = [
  {
    key: 'id',
    title: '序号',
    dataKey: 'id',
    width: 70
  },
  {
    key: 'startTime',
    title: '时间',
    dataKey: 'startTime',
    width: 130
  },
  {
    key: 'text',
    title: '文本',
    dataKey: 'text',
    width: 500
  }
]

/* 分页部分 */
// 每页数量改变
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  tableData.value = tableAllData.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value)
}
// 当前页改变
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  tableData.value = tableAllData.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value)
}
</script>

<style lang="scss">
.input{
  max-width: 800px;
  margin-bottom: 16px;
}
.pag {
  margin-top: 16px;
  justify-content: flex-end;
}
.tag {
  margin: 4px;
}
</style>
