<template>
  <div class="wrap">
    <el-container>
      <el-aside width="200px">
        <LeftMenu />
      </el-aside>
      <el-main class="el-main">
        <Header />
        <div class="content">
          <RouterView />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import LeftMenu from '@/components/LeftMenu/index.vue';
import Header from '@/components/Header/index.vue';
</script>

<style lang="less" scoped>
@import '@/styles/color.less';

.wrap {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100vh;

  .el-main {
    background-color: @bg-color-page;
    padding-top: 70px;
  }

  .content {
    box-sizing: border-box;
    flex: 1;
    height: 100%;
  }
}
</style>
