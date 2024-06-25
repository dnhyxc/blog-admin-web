<template>
  <div class="container">
    <div class="title" @click="toHome">
      <img :src="SEA_SVG" alt="" class="icon" />
      墨客管理
    </div>
    <div v-if="htmlWidth <= 1150" class="menuList">
      <el-dropdown trigger="click" @visible-change="onVisibleChange">
        <span class="el-dropdown-link">
          <span class="current-menu">文章详情</span>
          <el-icon class="el-icon-right">
            <ArrowDownBold v-if="!visible" />
            <ArrowUpBold v-else />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="menu in menuList" :key="menu.key" :icon="menu.icon" @click="onSelectMenu(menu)">
              {{ menu.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div v-for="menu in menuList" v-else :key="menu.key" class="menuList">
      <router-link class="link" :to="menu.path">
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
          <Tickets v-if="menu.key === 'interact'" />
          <Notification v-if="menu.key === 'tools'" />
        </el-icon>
        <span class="link-name">{{ menu.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  ArrowDownBold,
  ArrowUpBold,
  Tickets,
  Notification,
} from '@element-plus/icons-vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MENULIST, SUPER_ADMIN_POWER_PAGES, AUTH_CONFIG, SEA_SVG } from '@/constant';
import { MenuListParams } from '@/typings/comment';
import { userStore } from '@/store';

const router = useRouter();

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

const htmlWidth = ref<number>(document.body.clientWidth);
const visible = ref<boolean>(false);
const currentMenu = ref<MenuListParams<typeof Grid>>();

onMounted(() => {
  onResize();
});

// 监听页面缩放
const onResize = () => {
  window.addEventListener('resize', () => {
    htmlWidth.value = document.body.clientWidth;
  });
};

// 返回首页
const toHome = () => {
  router.push('/home');
};

// 下拉框显示隐藏事件
const onVisibleChange = (value: boolean) => {
  if (value) {
    visible.value = true;
  } else {
    visible.value = false;
  }
};

// 选中下拉框某个选项
const onSelectMenu = (item: any) => {
  currentMenu.value = item;
  router.push(item.path);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  line-height: 50px;
  background-color: @fff;
  padding: 0 20px;
  box-shadow: 0 0 8px @border-color;
  z-index: 10;

  .title {
    display: flex;
    align-items: center;
    margin-right: 30px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    color: @000;

    .icon {
      height: 32px;
      width: 32px;
      margin-right: 10px;
    }
  }

  .menuList {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;

      .current-menu {
        color: @primary;
      }

      .el-icon-right {
        margin-top: -2px;
        margin-left: 5px;
      }
    }

    .link {
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 100%;
      line-height: 50px;
      cursor: pointer;

      .icon {
        margin-top: -2px;
        margin-right: 5px;
      }

      &:hover {
        color: @primary;

        &:before {
          content: '';
          position: absolute;
          top: auto;
          right: 0;
          bottom: 0;
          left: 0;
          height: 2px;
          background-color: @primary;
        }
      }
    }
  }
}
</style>
