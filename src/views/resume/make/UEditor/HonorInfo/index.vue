<!--
 * 荣誉奖项
 * @author: dnhyxc
 * @since: 2024-09-07
 * index.vue
-->
<template>
  <div class="form-describe">
    <div v-for="(honor, index) in resumeStore.resumeInfo.honorInfo" :key="honor.key" class="form-item-list">
      <el-form-item label="获奖时间" class="time-item">
        <el-date-picker
          v-model="honor.time"
          type="month"
          format="YYYY年MM月"
          class="time-input"
          placeholder="获奖时间"
          value-format="x"
          :show-arrow="false"
        />
      </el-form-item>
      <el-form-item label="获奖名称" class="experience-item">
        <RichTextEditor :key="honor.key" v-model:content="honor.name" />
      </el-form-item>
      <div v-if="resumeStore.resumeInfo.honorInfo!.length > 1" class="delete-module">
        <el-button link @click="deleteModule(index)">删除此项</el-button>
      </div>
    </div>
    <div :class="`add-new ${resumeStore.resumeInfo.honorInfo!.length <= 1 && 'default-add-new'}`">
      <el-button type="primary" link class="add-new-btn" @click="addNewModule">新增荣誉奖项</el-button>
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
