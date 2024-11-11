<!--
 * 通过 pdf 预览简历
 * @author: dnhyxc
 * @since: 2024-08-19
 * index.vue
-->
<template>
  <div class="preview-wrap">
    <div class="content">
      <iframe
        v-if="pdfUrl"
        :src="`${pdfUrl}#toolbar=0&scrollbar=0`"
        frameborder="0"
        width="100%"
        height="100%"
        class="iframe"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  pdfUrl: string;
  download: () => void;
  onClose: () => void;
}

defineProps<IProps>();
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.preview-wrap {
  display: flex;
  flex-direction: column;
  position: relative;
  // 正常情况下是a4纸的宽度 210mm * 297mm，或者 793px * 1123px，但是这里需要减去在生成html2pdf配置中设置的0.2in的外边距
  width: 205mm;
  min-width: 205mm;
  height: calc(100vh - 149px);
  box-sizing: border-box;
  border: 1px solid @border;
  border-radius: 5px;
  margin-left: 10px;
  -webkit-user-drag: none;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    line-height: 45px;
    min-height: 45px;
    margin: 0 8px;

    .icon {
      color: @font-1;
    }
  }

  .content {
    flex: 1;
  }
}
</style>
