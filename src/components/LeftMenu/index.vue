<template>
  <div class="menu-wrap">
    <div class="title">后台管理</div>
    <el-menu :default-active="route.name" class="el-menu">
      <el-menu-item v-for="menu in MENULIST" :key="menu.key" :index="menu.key" class="menuList" @click="onClick(menu)">
        <el-icon v-if="menu.icon === 'icon-menu'">
          <icon-menu />
        </el-icon>
        <el-icon v-if="menu.icon === 'document'">
          <document />
        </el-icon>
        <el-icon v-if="menu.icon === 'setting'">
          <setting />
        </el-icon>
        <div class="item" :to="menu.path">{{ menu.name }}</div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { MENULIST, MenuListParams } from '@/constant';

const router = useRouter();
const route = useRoute();

// 点击跳转页面
const onClick = (menu: MenuListParams) => {
  router.push(menu.path);
};
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
