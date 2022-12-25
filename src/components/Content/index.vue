<!--
 * new page
 * @author: dnhyxc
 * @since: 2022-12-24
 * index.vue
-->
<template>
  <div class="card-content">
    <div class="title">
      <slot name="title">title</slot>
    </div>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import '@/styles/index.less';

.card-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 10px;
  box-shadow: 0 0 10px @info-light-7;
  border-radius: 5px;
  background-color: @fff;

  .title {
    font-size: 18px;
  }
}
</style>
