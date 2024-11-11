<!--
 * 研究经历
 * @author: dnhyxc
 * @since: 2024-09-08
 * index.vue
-->
<template>
  <div class="describe" @click="onClickOption('otherExperiencesInfo')">
    <Title :data="data" :index="index" />
    <div v-for="(other, _index) in resumeStore.resumeInfo.otherExperiencesInfo" :key="other.key" class="module-item">
      <ActionBar
        field="otherExperiencesInfo"
        :active="other"
        :list="(resumeStore.resumeInfo.otherExperiencesInfo as any[])"
        :index="_index"
      />
      <div class="job-item">
        <div :style="jobCompanyStyle">
          <div class="name" :style="companyNameStyle">{{ other.name }}</div>
          <div v-if="other.time.start && other.time.end" class="time">
            {{ formatDate(other.time.start as number, 'YYYY年MM月') }}
            - {{ other.time.end }}
          </div>
        </div>
        <div class="job-position">
          <span>{{ other.role }}</span>
          <span :style="jobPositionStyle">{{ other.dept }}</span>
          <span>{{ other.city }}</span>
        </div>
        <div
          v-if="other.description && other.description !== '<p><br></p>'"
          class="job-desc"
          v-html="other.description"
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
