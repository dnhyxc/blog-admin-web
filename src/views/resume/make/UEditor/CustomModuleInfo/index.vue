<!--
 * 自定义模块
 * @author: dnhyxc
 * @since: 2024-08-22
 * index.vue
-->
<template>
  <div class="form-describe">
    <div v-for="(custom, index) in (resumeStore.resumeInfo as any)[moduleKey]" :key="custom.key" class="form-item-list">
      <el-form-item label="自定义名称">
        <el-input v-model="custom.name" type="text" placeholder="请输入自定名称" />
      </el-form-item>
      <el-form-item label="时间" class="time-item">
        <el-date-picker
          v-model="custom.time.start"
          type="month"
          format="YYYY年MM月"
          class="time-input"
          placeholder="开始时间"
          value-format="x"
          :show-arrow="false"
        />
        <span class="line">-</span>
        <el-input v-model="custom.time.end" type="text" class="time-input" placeholder="结束时间" />
      </el-form-item>
      <el-form-item label="自定义描述" class="experience-item">
        <RichTextEditor :key="custom.key" v-model:content="custom.description" />
      </el-form-item>
      <div v-if="(resumeStore.resumeInfo as any)[moduleKey].length > 1" class="delete-module">
        <el-button link @click="deleteModule(index)">删除此项</el-button>
      </div>
    </div>
    <div :class="`add-new ${(resumeStore.resumeInfo as any)[moduleKey].length <= 1 && 'default-add-new'}`">
      <el-button type="primary" link class="add-new-btn" @click="addNewModule">新增自定义模块</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { resumeStore } from '@/store';

interface IProps {
  moduleKey: string;
}

const props = defineProps<IProps>();

const deleteModule = (index: number) => {
  ElMessageBox.confirm('删除后该项内容将不可恢复！', '确定要删除该项吗？').then(() => {
    resumeStore.removeModule(props.moduleKey, index);
  });
};

const addNewModule = () => {
  resumeStore.addModule(props.moduleKey);
};
</script>
