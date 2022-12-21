<template>
  <div class="wrap">
    <el-container>
      <el-aside width="200px">
        <LeftMenu />
      </el-aside>
      <el-main class="el-main">
        <Header>
          <div>看我插入了这个插槽</div>
        </Header>
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
@import url('./index.less');
</style>
