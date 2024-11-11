<!--
 * 工作经历
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div class="describe" @click="onClickOption('jobInfo')">
    <Title :data="data" :index="index" />
    <div v-for="(job, _index) in resumeStore.resumeInfo.jobInfo" :key="job.key" class="module-item">
      <ActionBar field="jobInfo" :active="job" :list="resumeStore.resumeInfo.jobInfo" :index="_index" />
      <div class="job-item">
        <div :style="jobCompanyStyle">
          <div class="name" :style="companyNameStyle">{{ job.name }}</div>
          <div v-if="job.time.start && job.time.end" class="time">
            {{ formatDate(job.time.start as number, 'YYYY年MM月') }}
            - {{ job.time.end }}
          </div>
        </div>
        <div class="job-position">{{ job.position }}</div>
        <div v-if="job.description && job.description !== '<p><br></p>'" class="job-desc" v-html="job.description" />
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
