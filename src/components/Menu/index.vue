<template>
  <div class="container">
    <div v-for="menu in MENULIST" :key="menu.key" class="menuList">
      <router-link class="item" :to="menu.path">{{ menu.name }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue';
import { MENULIST } from '@/constant';
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;

  .menuList {
    margin-right: 20px;
    height: 100%;

    .item {
      display: block;
      position: relative;
      box-sizing: border-box;
      height: 100%;
      line-height: 50px;
      cursor: pointer;

      &:hover {
        color: red;

        &:before {
          content: '';
          position: absolute;
          top: auto;
          right: 0;
          bottom: 0;
          left: 0;
          height: 2px;
          background-color: red;
        }
      }
    }
  }
}
</style>
