<!--
 * 文章预览页面
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div class="preview-wrap">
    <v-md-preview id="__MD_PREVIEW__" ref="previewRef" :text="mackdown" default-show-toc></v-md-preview>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { detailStore } from '@/store';

interface IProps {
  mackdown: string;
}

const previewRef = ref<any>(null);

withDefaults(defineProps<IProps>(), {
  mackdown: '',
});

onMounted(() => {
  detailStore.setPreviewRef(previewRef.value);
  if (previewRef.value) {
    const anchors: HTMLHeadingElement[] = previewRef.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');

    const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());

    if (!titles.length) {
      detailStore.tocTitles = [];
      return;
    }

    detailStore.titles = titles;

    const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

    // 存储所有的标题标签
    detailStore.tocTitles = titles.map((el) => ({
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName),
    }));
  }
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';

:deep {
  .vuepress-markdown-body {
    padding: 30px;
  }
}
</style>
