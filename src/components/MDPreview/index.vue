<!--
 * 文章预览页面
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div class="preview-wrap">
    <MdPreview
      ref="previewRef"
      :editor-id="MD_EDITER_ID"
      :model-value="markdown"
      code-foldable
      :auto-fold-threshold="100"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview } from 'md-editor-v3';
import { MD_EDITER_ID } from '@/constant';
import 'md-editor-v3/lib/preview.css';

interface IProps {
  markdown: string;
  onPreviewImage?: (e: Event) => void;
}

defineProps<IProps>();

const previewRef = ref<any>(null);
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.preview-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px 25px;
  background-color: @fff;
}
</style>
