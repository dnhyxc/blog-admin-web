<template>
  <div class="page-header">
    <div class="left">
      <span class="back" @click="onClick">
        <el-icon><ArrowLeft /></el-icon>
      </span>
      <span class="title"> {{ route.meta.title }} </span>
    </div>
    <div class="right">
      <div v-if="userStore.username" class="username">{{ userStore.username }}</div>
      <slot></slot>
      <Popover :width="120">
        <template #click>
          <Image :url="userStore.headUrl || IMAGES.sea" :transition-img="IMAGES.sea" class="avatar" />
        </template>
        <template #content>
          <div class="set-item" @click="onSetting">
            <el-icon> <setting /> </el-icon>
            <span class="text">账号设置</span>
          </div>
          <div class="set-item" @click="onLogout">
            <el-icon> <SwitchButton /> </el-icon>
            <span class="text">退出登录</span>
          </div>
        </template>
      </Popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Setting, SwitchButton } from '@element-plus/icons-vue';
import Popover from '@/components/Popover/index.vue';
import { userStore } from '@/store';
import { IMAGES } from '@/constant';

const route = useRoute();
const router = useRouter();

// 点击返回
const onClick = () => {
  router.back();
};

// 账号设置
const onSetting = () => {
  router.push('/setting');
};

// 退出登录
const onLogout = () => {
  router.replace('/login');
  // 清除store中的登录信息
  userStore.onLogout();
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.page-header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 200px;
  width: calc(100% - 200px);
  display: flex;
  align-items: center;
  padding: 15px;
  height: 50px;
  font-weight: 700;
  font-size: 16px;
  color: @000;
  background-color: #fff;
  box-shadow: 10px 0 10px @border-color;
  z-index: 999;

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 0.5;
    .back {
      display: flex;
      align-items: center;
      height: 100%;
      width: 30px;
      cursor: pointer;
    }
  }

  .right {
    flex: 0.5;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .username {
      font-size: 16px;
      font-weight: 700;
    }

    .avatar {
      margin-left: 15px;
      width: 40px;
      height: 40px;
      cursor: pointer;

      :deep {
        .image-item {
          border-radius: 10px;
        }
      }
    }
  }
}

.set-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: @primary;
  }

  .text {
    margin-left: 10px;
  }
}
</style>
