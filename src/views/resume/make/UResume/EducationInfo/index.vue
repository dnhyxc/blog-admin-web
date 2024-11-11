<!--
 * 教育经历
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div
    v-if="show"
    :class="`describe ${resumeStore.customStyles.type === 'doubleColumn' ? 'describe-between' : ''}`"
    @click="onClickOption('educationInfo')"
  >
    <Title :data="data" :index="index" />
    <div v-for="(edu, _index) in resumeStore.resumeInfo.educationInfo" :key="edu.key" class="module-item">
      <ActionBar field="educationInfo" :active="edu" :list="resumeStore.resumeInfo.educationInfo" :index="_index" />
      <div class="job-item">
        <div
          :style="jobCompanyStyle"
          :class="`${resumeStore.customStyles.type === 'doubleColumn' ? 'job-company-bettween' : ''}`"
        >
          <div class="name" :style="companyNameStyle">
            <span>{{ edu.school }}</span>
            <span :style="cityStyle">{{ edu.city }}</span>
          </div>
          <div v-if="edu.time.start && edu.time.end" class="time">
            {{ formatDate(edu.time.start as number, 'YYYY年MM月') }} - {{ edu.time.end }}
          </div>
        </div>
        <div :style="eduMajorStyle">
          <span>{{ edu.major }}</span>
          <span :style="educationStyle">{{ edu.educationType }}</span>
          <span>{{ edu.education }}</span>
        </div>
        <div v-if="edu.experience && edu.experience !== '<p><br></p>'" class="skill-list" v-html="edu.experience" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resumeStore } from '@/store';
import { ResumeElements } from '@/typings/comment';
import { formatDate } from '@/utils';
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

const show = computed(() => {
  return resumeStore.resumeInfo.educationInfo.find((edu) => edu.school);
});

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

const eduMajorStyle = computed(() => {
  const style = `
    display: flex;
    align-items: center;
  `;
  return style;
});

const educationStyle = computed(() => {
  const style = `
    margin: 0 10px;
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

const cityStyle = computed(() => {
  const style = `
    margin-left: 10px;
  `;
  return style;
});
</script>

<style lang="less" scoped>
.describe-between {
  .job-company-bettween {
    display: flex;
    flex-direction: column;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    margin-bottom: 0 !important;
  }

  .skill-list {
    margin-top: 4px;
  }
}
</style>
