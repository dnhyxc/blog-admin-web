<!--
 * 
 * @author: dnhyxc
 * @since: 2024-08-16
 * index.vue
-->
<template>
  <div class="form-describe">
    <div v-for="(edu, index) in resumeStore.resumeInfo.educationInfo" :key="edu.key" class="form-item-list">
      <el-form-item label="学校">
        <el-input v-model="edu.school" type="text" placeholder="请输入学校名称" />
      </el-form-item>
      <el-form-item label="所在城市">
        <el-input v-model="edu.city" type="text" placeholder="请输入所在城市" />
      </el-form-item>
      <el-form-item label="在读时间" class="time-item">
        <el-date-picker
          v-model="edu.time.start"
          type="month"
          format="YYYY年MM月"
          class="time-input"
          placeholder="开始时间"
          value-format="x"
          :show-arrow="false"
        />
        <span class="line">-</span>
        <el-input v-model="edu.time.end" type="text" class="time-input" placeholder="结束时间" />
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="edu.major" type="text" placeholder="请输入专业名称" />
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="edu.education" placeholder="请选择学历" popper-class="custom-dropdown-styles">
          <el-option v-for="item in EDUCATION" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="学历类型">
        <el-select v-model="edu.educationType" placeholder="请输入学历类型" popper-class="custom-dropdown-styles">
          <el-option v-for="item in EDUCATION_TYPE" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="在校经历" class="experience-item">
        <RichTextEditor :key="edu.key" v-model:content="edu.experience" />
      </el-form-item>
      <div v-if="resumeStore.resumeInfo.educationInfo.length > 1" class="delete-module">
        <el-button link @click="deleteModule(index)">删除此项</el-button>
      </div>
    </div>
    <div :class="`add-new ${resumeStore.resumeInfo.educationInfo.length <= 1 && 'default-add-new'}`">
      <el-button type="primary" link class="add-new-btn" @click="addNewModule">新增教育经历</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resumeStore } from '@/store';
import { ElMessageBox } from 'element-plus';

interface IProps {
  moduleKey: string;
}

const props = defineProps<IProps>();

const EDUCATION = ['中专', '高中', '大专', '本科', '硕士', '博士', 'MBA'];

const EDUCATION_TYPE = ['全日制', '非全日制', '交流/交换生'];

const deleteModule = (index: number) => {
  ElMessageBox.confirm('删除后该项内容将不可恢复！', '确定要删除该项吗？').then(() => {
    resumeStore.removeModule(props.moduleKey, index);
  });
};
const addNewModule = () => {
  resumeStore.addModule(props.moduleKey);
};
</script>
