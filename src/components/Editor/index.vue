<template>
  <div class="container">
    <v-md-editor v-model="mackdown.text" :height="height"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface IProps {
  height?: string;
}

withDefaults(defineProps<IProps>(), {
  height: 'calc(100vh - 70px)',
});

type mackdownType = {
  text: string;
};

const mackdown = reactive<mackdownType>({ text: 'text' });
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.container {
  background-color: @fff;

  :deep {
    .v-md-textarea-editor pre,
    .v-md-textarea-editor textarea {
      background-color: @fff;
    }
    .vuepress-markdown-body:not(.custom) {
      padding: 16px 20px;
    }
  }
}
</style>
