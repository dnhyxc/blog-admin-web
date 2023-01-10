<!--
 * 文章详情
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div v-loading="detailStore.loading" class="detail-wrap">
    <TopMenu class="top-menu" />
    <div class="content">
      <Preview v-if="detailStore.detail.content" :mackdown="detailStore.detail.content" class="preview-container" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Preview from '@/components/Preview/index.vue';
import TopMenu from '@/components/TopMenu/index.vue';
import { detailStore } from '@/store';

const route = useRoute();

onMounted(() => {
  if (route.params.id) {
    detailStore.getArticleDetail(route.params.id as string);
  }
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.detail-wrap {
  height: 100%;
  background-color: @bg-color-page;
  overflow-x: hidden;

  .top-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .content {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 10px;

    .preview-container {
      max-width: 820px;
      overflow-x: auto;
      background-color: @fff;
      border-radius: 5px;
    }
  }
}
</style>
