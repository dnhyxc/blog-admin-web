<!--
 * 个人总结
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div v-if="isEmpty" class="describe" @click="onClickOption('summaryInfo')">
    <Title :data="data" :index="index" hide-add />
    <div v-for="(summary, _index) in resumeStore.resumeInfo.summaryInfo" :key="summary.key" class="module-item">
      <ActionBar field="summaryInfo" :active="summary" :list="resumeStore.resumeInfo.summaryInfo" :index="_index" />
      <div
        v-if="summary.description && summary.description !== '<p><br></p>'"
        class="skill-list"
        v-html="summary.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resumeStore } from '@/store';
import { ResumeElements } from '@/typings/comment';
import ActionBar from '../ActionBar/index.vue';
import Title from '../../Title/index.vue';

interface IProps {
  index?: number;
  data: ResumeElements;
  onClickOption: (option: string) => void;
}

const props = defineProps<IProps>();

const isEmpty = computed(() => {
  return resumeStore.resumeInfo.summaryInfo?.[0].description !== '<p><br></p>';
});

const onClickOption = (option: string) => {
  props.onClickOption(option);
};
</script>
