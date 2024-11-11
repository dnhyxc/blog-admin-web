<!--
 * 专业技能
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div class="describe" @click="onClickOption('skillInfo')">
    <Title :data="data" :index="index" />
    <div v-for="(skill, _index) in resumeStore.resumeInfo.skillInfo" :key="skill.key" class="module-item">
      <ActionBar field="skillInfo" :active="skill" :list="resumeStore.resumeInfo.skillInfo" :index="_index" />
      <div v-if="resumeStore.resumeInfo.skillInfo.length > 1" :style="skillTitleStyle">
        {{ skill.title }}
      </div>
      <div
        v-if="skill.description && skill.description !== '<p><br></p>'"
        class="skill-list"
        v-html="skill.description"
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

const skillTitleStyle = computed(() => {
  const style = `
    margin-top: 5px;
    font-size: ${(resumeStore.customStyles.fontSize as number) + 1}px;
    font-weight: 700;
  `;
  return style;
});

const onClickOption = (option: string) => {
  props.onClickOption(option);
};
</script>
