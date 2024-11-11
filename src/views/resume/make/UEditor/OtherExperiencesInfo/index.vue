<!--
 * 其他经历
 * @author: dnhyxc
 * @since: 2024-09-08
 * index.vue
-->
<template>
  <div class="form-describe">
    <div v-for="(other, index) in resumeStore.resumeInfo.otherExperiencesInfo" :key="other.key" class="form-item-list">
      <el-form-item label="经历名称">
        <el-input v-model="other.name" type="text" placeholder="请输入经历名称" />
      </el-form-item>
      <el-form-item label="经历时间" class="time-item">
        <el-date-picker
          v-model="other.time.start"
          type="month"
          format="YYYY年MM月"
          class="time-input"
          placeholder="开始时间"
          value-format="x"
          :show-arrow="false"
        />
        <span class="line">-</span>
        <el-input v-model="other.time.end" type="text" class="time-input" placeholder="结束时间" />
      </el-form-item>
      <el-form-item label="所属角色">
        <el-input v-model="other.role" type="text" placeholder="请输入所属角色" />
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input v-model="other.dept" type="text" placeholder="请输入所属部门" />
      </el-form-item>
      <el-form-item label="所在城市">
        <el-input v-model="other.city" type="text" placeholder="请输入所在城市" />
      </el-form-item>
      <el-form-item label="经历详情" class="experience-item">
        <RichTextEditor :key="other.key" v-model:content="other.description" />
      </el-form-item>
      <div v-if="resumeStore.resumeInfo.otherExperiencesInfo!.length > 1" class="delete-module">
        <el-button link @click="deleteModule(index)">删除此项</el-button>
      </div>
    </div>
    <div :class="`add-new ${resumeStore.resumeInfo.otherExperiencesInfo!.length <= 1 && 'default-add-new'}`">
      <el-button type="primary" link class="add-new-btn" @click="addNewModule">新增其他经历</el-button>
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
