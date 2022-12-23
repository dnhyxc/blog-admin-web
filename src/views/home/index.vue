<template>
  <div class="home">
    <div class="cardList">
      <Card v-for="card in [1, 2, 3, 4]" :key="card">
        <template #title>
          <div class="title">标题{{ card }}</div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/Card/index.vue';
</script>

<style scoped lang="less">
@import '@/styles/color.less';

.home {
  border: 1px solid red;
  height: 100%;

  .cardList {
    display: flex;
    justify-content: space-between;

    .title {
      display: flex;
      align-items: center;
      border: 1px solid red;
    }
  }
}
</style>
