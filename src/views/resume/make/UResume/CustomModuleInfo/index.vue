<!--
 * 自定义模块
 * @author: dnhyxc
 * @since: 2024-08-22
 * index.vue
-->
<template>
  <div class="describe" @click="onClickOption(data.key)">
    <Title :data="data" :index="index" />
    <div v-for="(custom, _index) in (resumeStore.resumeInfo as any)[data.key]" :key="custom.key" class="module-item">
      <ActionBar :field="data.key" :active="custom" :list="(resumeStore.resumeInfo as any)[data.key]" :index="_index" />
      <div class="job-item">
        <div :style="jobCompanyStyle">
          <div class="name" :style="companyNameStyle">{{ custom.name }}</div>
          <div v-if="custom.time.start && custom.time.end" class="time">
            {{ formatDate(custom.time.start as number, 'YYYY年MM月') }}
            - {{ custom.time.end }}
          </div>
        </div>
        <div
          v-if="custom.description && custom.description !== '<p><br></p>'"
          class="job-desc"
          v-html="custom.description"
        />
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
