<template>
  <div class="menu-wrap">
    <div class="title">
      <img :src="SEA_SVG" alt="" class="icon" />
      <span>墨客管理</span>
    </div>
    <el-menu :default-active="route.name" class="el-menu">
      <el-menu-item v-for="menu in menuList" :key="menu.key" :index="menu.key" class="menuList" @click="onClick(menu)">
        <el-icon class="icon">
          <Grid v-if="menu.key === 'home'" />
          <document v-if="menu.key === 'article'" />
          <Menu v-if="menu.key === 'classify'" />
          <Discount v-if="menu.key === 'tag'" />
          <Postcard v-if="menu.key === 'account'" />
          <User v-if="menu.key === 'users'" />
          <ChatLineSquare v-if="menu.key === 'comment'" />
          <Tickets v-if="menu.key === 'interact'" />
          <setting v-if="menu.key === 'pageSet'" />
          <Position v-if="menu.key === 'create'" />
          <Notification v-if="menu.key === 'tools'" />
        </el-icon>
        <div class="item" :to="menu.path">{{ menu.name }}</div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import {
  Document,
  Grid,
  Setting,
  Discount,
  Menu,
  Postcard,
  ChatLineSquare,
  Position,
  User,
  Tickets,
  Notification,
} from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { MENULIST, AUTH_CONFIG, SUPER_ADMIN_POWER_PAGES, SEA_SVG } from '@/constant';
import { MenuListParams } from '@/typings/comment';
import { userStore } from '@/store';

const router = useRouter();
const route = useRoute();

// 判断是否是超级管理员
const menuList = computed(() => {
  if (userStore.auth === AUTH_CONFIG.SUPER) {
    return MENULIST;
  } else {
    const menus = MENULIST.filter((i) => {
      if (userStore.auth === AUTH_CONFIG.ADMIN) {
        return i.key !== 'users' && i.key !== 'account';
      }
      return !SUPER_ADMIN_POWER_PAGES.includes(i.key);
    });
    return menus;
  }
});

// 点击跳转页面
const onClick = (menu: MenuListParams<typeof Grid>) => {
  if (route.name === menu.key) return;
  router.push(menu.path);
};
</script>

<style scoped lang="less">
@import url('./index.less');

.el-menu {
  overflow: auto;
}
</style>
