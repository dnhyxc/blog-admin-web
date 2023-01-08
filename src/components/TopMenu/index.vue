<template>
  <div class="container">
    <div v-for="menu in menuList" :key="menu.key" class="menuList">
      <router-link class="item" :to="menu.path">{{ menu.name }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MENULIST, AUTH_CONFIG } from '@/constant';
import { userStore } from '@/store';

// 判断是否是超级管理员
const menuList = computed(() => {
  if (userStore.auth === AUTH_CONFIG.SUPER) {
    return MENULIST;
  } else {
    const menus = MENULIST.filter((i) => {
      if (userStore.auth === AUTH_CONFIG.ADMIN) {
        return i.key !== 'users' && i.key !== 'account';
      }
      return i.key !== 'users' && i.key !== 'account' && i.key !== 'home';
    });
    return menus;
  }
});
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
