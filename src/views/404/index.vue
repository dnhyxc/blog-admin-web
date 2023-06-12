<template>
  <div class="not-fond">
    <div class="info">抱歉！页面不翼而飞了</div>
    <el-button type="primary" @click="goHome">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/home');
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.not-fond {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 15vh;

  .info {
    margin-bottom: 50px;
    color: @warning;
  }
}
</style>
