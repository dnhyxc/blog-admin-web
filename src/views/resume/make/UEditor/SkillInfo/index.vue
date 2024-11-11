<!--
 * 专业技能编辑页面
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div class="form-describe">
    <div v-for="(skill, index) in resumeStore.resumeInfo.skillInfo" :key="skill.key" class="form-item-list">
      <el-form-item v-if="resumeStore.resumeInfo.skillInfo.length > 1" label="技能类别">
        <el-input v-model="skill.title" type="text" placeholder="请输入技能类别" />
      </el-form-item>
      <el-form-item label="技能描述" class="experience-item">
        <RichTextEditor :key="skill.key" v-model:content="skill.description" />
      </el-form-item>
      <div v-if="resumeStore.resumeInfo.skillInfo.length > 1" class="delete-module">
        <el-button link @click="deleteModule(index)">删除此项</el-button>
      </div>
    </div>
    <div :class="`add-new ${resumeStore.resumeInfo.skillInfo.length <= 1 && 'default-add-new'}`">
      <el-button type="primary" link class="add-new-btn" @click="addNewModule">新增专业技能</el-button>
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
