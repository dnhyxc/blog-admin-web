<template>
  <div class="menu-wrap">
    <div class="title">后台管理</div>
    <el-menu :default-active="route.name" class="el-menu">
      <el-menu-item v-for="menu in MENULIST" :key="menu.key" :index="menu.key" class="menuList" @click="onClick(menu)">
        <el-icon v-if="menu.icon === 'home'">
          <Grid />
        </el-icon>
        <el-icon v-if="menu.icon === 'document'">
          <document />
        </el-icon>
        <el-icon v-if="menu.icon === 'setting'">
          <setting />
        </el-icon>
        <el-icon v-if="menu.icon === 'tag'">
          <Discount />
        </el-icon>
        <el-icon v-if="menu.icon === 'classify'">
          <Menu />
        </el-icon>
        <el-icon v-if="menu.icon === 'account'">
          <Postcard />
        </el-icon>
        <el-icon v-if="menu.icon === 'comment'">
          <ChatLineSquare />
        </el-icon>
        <el-icon v-if="menu.icon === 'create'">
          <Position />
        </el-icon>
        <el-icon v-if="menu.icon === 'users'">
          <User />
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
