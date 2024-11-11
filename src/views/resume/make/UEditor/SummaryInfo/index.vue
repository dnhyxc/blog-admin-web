<!--
 * 专业技能编辑页面
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div class="form-describe">
    <div v-for="summary in resumeStore.resumeInfo.summaryInfo" :key="summary.key" class="form-item-list">
      <el-form-item label="个人总结描述" class="experience-item">
        <RichTextEditor :key="summary.key" v-model:content="summary.description" />
      </el-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resumeStore } from '@/store';
</script>
