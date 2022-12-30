<template>
  <div class="page-header">
    <div class="left">
      <span class="back" @click="onClick">
        <el-icon> <ArrowLeft /> </el-icon>
      </span>
      <span class="title"> {{ route.meta.title }} </span>
    </div>
    <div class="right">
      <slot></slot>
      <Popover :width="120">
        <template #click>
          <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
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
const route = useRoute();
const router = useRouter();

// 点击返回
const onClick = () => {
  router.back();
};

// 账号设置
const onSetting = () => {
  console.log('账号设置');
};

// 退出登录
const onLogout = () => {
  console.log('退出登录');
  router.replace('/login');
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

    .avatar {
      margin-left: 15px;
      cursor: pointer;
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
