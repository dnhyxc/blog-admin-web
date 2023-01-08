<!--
 * 文章预览页面
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div class="preview-wrap">
    <v-md-preview-html :html="mackdown" preview-class="vuepress-markdown-body"></v-md-preview-html>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  mackdown: string;
}

withDefaults(defineProps<IProps>(), {
  mackdown: '',
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';
</style>
