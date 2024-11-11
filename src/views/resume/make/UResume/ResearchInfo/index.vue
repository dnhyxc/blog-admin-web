<!--
 * 研究经历
 * @author: dnhyxc
 * @since: 2024-09-08
 * index.vue
-->
<template>
  <div class="describe" @click="onClickOption('researchInfo')">
    <Title :data="data" :index="index" />
    <div v-for="(research, _index) in resumeStore.resumeInfo.researchInfo" :key="research.key" class="module-item">
      <ActionBar
        field="researchInfo"
        :active="research"
        :list="(resumeStore.resumeInfo.researchInfo as any[])"
        :index="_index"
      />
      <div class="job-item">
        <div :style="jobCompanyStyle">
          <div class="name" :style="companyNameStyle">{{ research.name }}</div>
          <div v-if="research.time.start && research.time.end" class="time">
            {{ formatDate(research.time.start as number, 'YYYY年MM月') }}
            - {{ research.time.end }}
          </div>
        </div>
        <div class="job-position">
          <span>{{ research.role }}</span>
          <span :style="jobPositionStyle">{{ research.dept }}</span>
          <span>{{ research.city }}</span>
        </div>
        <div
          v-if="research.description && research.description !== '<p><br></p>'"
          class="job-desc"
          v-html="research.description"
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

const jobPositionStyle = computed(() => {
  const style = `
    margin: 0 10px;
  `;
  return style;
});
</script>
