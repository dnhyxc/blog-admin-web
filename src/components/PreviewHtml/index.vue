<!--
 * 预览HTML组件
 * @author: dnhyxc
 * @since: 2023-01-10
 * index.vue
-->
<template>
  <div class="preview-wrap">
    <v-md-preview-html :html="html" preview-class="vuepress-markdown-body"></v-md-preview-html>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  html: string;
}

withDefaults(defineProps<IProps>(), {
  html: '',
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';
</style>
