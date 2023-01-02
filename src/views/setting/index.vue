<template>
  <div class="setting">
    <PreviewSet />
    <CardSet />
    <Coverset />
  </div>
</template>

<script setup lang="ts">
import PreviewSet from './PreviewSet/index.vue';
import CardSet from './CardSet/index.vue';
import Coverset from './CoverSet/indev.vue';
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.setting {
  .layoutStyles();
  padding-right: 2px;
}
</style>
