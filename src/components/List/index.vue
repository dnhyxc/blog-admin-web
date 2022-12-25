<!--
 * 列表组件
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="list-wrap">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <div class="title">
        <slot name="title">title</slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import '@/styles/index.less';

.list-wrap {
  display: flex;
  justify-content: space-between;
  background-color: @fff;
  padding: 10px;
  border-bottom: 1px solid @info-light-9;

  // &:first-child {
  //   border-top-left-radius: 5px;
  //   border-top-right-radius: 5px;
  // }

  // &:last-child {
  //   border-bottom-left-radius: 5px;
  //   border-bottom-right-radius: 5px;
  // }

  .left {
    width: auto;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
