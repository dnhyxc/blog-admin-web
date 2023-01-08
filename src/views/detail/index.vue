<!--
 * 文章详情
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div class="detail-wrap">
    <div>
      <TopMenu />
    </div>
    <Preview :mackdown="mackdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Preview from '@/components/Preview/index.vue';
import TopMenu from '@/components/TopMenu/index.vue';

const mackdown = ref<string>('dnhyxc');
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.detail-wrap {
  height: 100%;
  background-color: @fff;
}
</style>
