<!--
 * 项目及作品编辑
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div class="form-describe">
    <div v-for="(project, index) in resumeStore.resumeInfo.projectInfo" :key="project.key" class="form-item-list">
      <el-form-item label="项目名称">
        <el-input v-model="project.name" type="text" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="起止时间" class="time-item">
        <el-date-picker
          v-model="project.time.start"
          type="month"
          format="YYYY年MM月"
          class="time-input"
          placeholder="开始时间"
          value-format="x"
          :show-arrow="false"
        />
        <span class="line">-</span>
        <el-input v-model="project.time.end" type="text" class="time-input" placeholder="结束时间" />
      </el-form-item>
      <el-form-item label="担任角色">
        <el-input v-model="project.position" type="text" placeholder="请输入项目职责" />
      </el-form-item>
      <el-form-item label="项目及作品描述" class="experience-item">
        <RichTextEditor :key="project.key" v-model:content="project.description" />
      </el-form-item>
      <div v-if="resumeStore.resumeInfo.projectInfo.length > 1" class="delete-module">
        <el-button link @click="deleteModule(index)">删除此项</el-button>
      </div>
    </div>
    <div :class="`add-new ${resumeStore.resumeInfo.projectInfo.length <= 1 && 'default-add-new'}`">
      <el-button type="primary" link class="add-new-btn" @click="addNewModule">新增项目及作品</el-button>
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
