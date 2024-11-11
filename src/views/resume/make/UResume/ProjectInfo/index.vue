<!--
 * 项目及作品
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div class="describe" @click="onClickOption('projectInfo')">
    <Title :data="data" :index="index" />
    <div v-for="(project, _index) in resumeStore.resumeInfo.projectInfo" :key="project.key" class="module-item">
      <ActionBar field="projectInfo" :active="project" :list="resumeStore.resumeInfo.projectInfo" :index="_index" />
      <div class="job-item">
        <div :style="jobCompanyStyle">
          <div class="name" :style="companyNameStyle">{{ project.name }}</div>
          <div v-if="project.time.start && project.time.end" class="time">
            {{ formatDate(project.time.start as number, 'YYYY年MM月') }} - {{ project.time.end }}
          </div>
        </div>
        <div class="job-position">{{ project.position }}</div>
        <div
          v-if="project.description && project.description !== '<p><br></p>'"
          class="job-desc"
          v-html="project.description"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resumeStore } from '@/store';
import { formatDate } from '@/utils';
import { ResumeElements } from '@/typings/comment';
import ActionBar from '../ActionBar/index.vue';
import Title from '../../Title/index.vue';

interface IProps {
  index?: number;
  data: ResumeElements;
  onClickOption: (option: string) => void;
}

const props = defineProps<IProps>();

const onClickOption = (option: string) => {
  props.onClickOption(option);
};

const jobCompanyStyle = computed(() => {
  const style = `
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${resumeStore.customStyles.childTitleMarginTop}px;
  `;
  return style;
});

const companyNameStyle = computed(() => {
  const style = `
    font-size: ${(resumeStore.customStyles.fontSize as number) + 2}px;
    font-weight: 700;
    margin-right: 10px;
    line-height: ${resumeStore.customStyles.lineHeight}px;
  `;
  return style;
});
</script>
