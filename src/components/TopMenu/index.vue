<template>
  <div class="container">
    <div v-for="menu in MENULIST" :key="menu.key" class="menuList">
      <router-link class="item" :to="menu.path">{{ menu.name }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MENULIST } from '@/constant';
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
