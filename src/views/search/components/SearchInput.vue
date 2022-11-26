<template>
    <el-input v-model="input" placeholder="请输入关键词" class="input" @change="$emit('change')">
        <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 115px">
          <el-option label="All" value="" />
          <el-option v-for="c in characters" :key="c" :label="c" :value="c" />
        </el-select>
        </template>
    </el-input>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, PropType, defineEmits } from 'vue'

const props = defineProps<{
  input?: string
  select?: string
  characters?: string[]
}>()

const emit = defineEmits(['update:input', 'update:select', 'change'])

const input = computed({
  get () {
    return props.input
  },
  set (value) {
    emit('update:input', value)
  }
})

const select = computed({
  get () {
    return props.select
  },
  set (value) {
    emit('update:select', value)
  }
})
</script>

<style lang="scss" scoped>

</style>
