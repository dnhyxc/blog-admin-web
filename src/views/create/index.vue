<template>
  <div class="edit-wrap">
    <Editor :mackdown="detailStore.detail.content" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Editor from '@/components/Editor/index.vue';
import { onMounted, onBeforeMount } from 'vue';
import { detailStore } from '@/store';

const route = useRoute();

onBeforeMount(() => {
  detailStore.clearDetail();
});

onMounted(() => {
  const { id } = route.query;
  if (id) {
    detailStore.getArticleDetail(id as string);
  }
});
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.edit-wrap {
  .layoutStyles();
}
</style>
