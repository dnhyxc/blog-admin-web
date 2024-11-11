<!--
 * 个人总结
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div v-if="isEmpty" class="describe" @click="onClickOption('honorInfo')">
    <Title :data="data" :index="index" hide-add />
    <div v-for="(honor, _index) in resumeStore.resumeInfo.honorInfo" :key="honor.key" class="module-item">
      <ActionBar
        field="honorInfo"
        :active="(honor as any)"
        :list="(resumeStore.resumeInfo.honorInfo as any[])"
        :index="_index"
      />
      <div class="job-item">
        <div v-if="honor.time" class="time" :style="timeStyle">
          {{ formatDate(honor.time, 'YYYY年MM月') }}
        </div>
        <div v-if="honor.name && honor.name !== '<p><br></p>'" class="skill-list" v-html="honor.name" />
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

const isEmpty = computed(() => {
  return resumeStore.resumeInfo.honorInfo?.[0].name !== '<p><br></p>';
});

const timeStyle = computed(() => {
  const style = `
    font-size: ${(resumeStore.customStyles.fontSize as number) + 2}px;
    font-weight: 700;
  `;
  return style;
});

const onClickOption = (option: string) => {
  props.onClickOption(option);
};
</script>
