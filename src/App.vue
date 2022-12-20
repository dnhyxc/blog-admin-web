<template>
  <div class="wrap">
    <div class="menu">
      <div class="pageIcon">后台管理</div>
      <Menu />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/Menu/index.vue';
</script>

<style scoped lang="less">
.wrap {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;

  .menu {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    margin-bottom: 20px;
    height: 50px;
    padding: 0 50px;
    box-shadow: 0 0 10px #ccc;

    .pageIcon {
      height: 50px;
      line-height: 50px;
      margin-right: 20px;
    }
  }

  .content {
    flex: 1;
  }
}
</style>
