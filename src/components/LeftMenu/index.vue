<template>
  <div class="menu-wrap">
    <div class="title">
      <img :src="IMAGES.pageIcon" alt="" class="icon" />
      <span>后台管理</span>
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
          <setting v-if="menu.key === 'pageSet'" />
          <Position v-if="menu.key === 'create'" />
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
} from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { MENULIST, AUTH_CONFIG, IMAGES } from '@/constant';
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
      return i.key !== 'users' && i.key !== 'account' && i.key !== 'home';
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
</style>
