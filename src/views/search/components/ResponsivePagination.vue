<template>
<div class="pag">
    <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[15, 30, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="$emit('sizeChange')"
    @current-change="$emit('currentChange')"
    class="hidden-sm-and-down"
    />
    <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[15, 30, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    :small="true"
    @size-change="$emit('sizeChange')"
    @current-change="$emit('currentChange')"
    class="hidden-md-and-up hidden-xs-only"
    />
    <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[15, 30, 50, 100]"
    layout="sizes, prev, pager, next"
    :total="total"
    :small="true"
    @size-change="$emit('sizeChange')"
    @current-change="$emit('currentChange')"
    class="hidden-sm-and-up"
    />
</div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, PropType, defineEmits } from 'vue'
import 'element-plus/theme-chalk/display.css'

const props = defineProps<{
  currentPage?: number
  pageSize?: number
  total?: number
  characters?: string[]
}>()

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'sizeChange', 'currentChange'])

const currentPage = computed({
  get () {
    return props.currentPage
  },
  set (value) {
    emit('update:currentPage', value)
  }
})

const pageSize = computed({
  get () {
    return props.pageSize
  },
  set (value) {
    emit('update:pageSize', value)
  }
})
</script>

<style lang="scss" scoped>
.pag {
  display: flex;
  margin-top: 16px;
  justify-content: flex-end;
}
</style>
