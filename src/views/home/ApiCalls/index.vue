<template>
  <div class="api-calls-wrap">
    <div class="header">{{ apiCallsStore.total }}</div>
    <div class="card-list">api 调用列表</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { apiCallsStore } from '@/store';

onMounted(async () => {
  await Promise.all([apiCallsStore.getApiCallsTotal(), apiCallsStore.getApiCalledList()]);
  console.log(apiCallsStore.total, apiCallsStore.apiCalledList);
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.api-call-wrap {
  flex: 1;
  margin-right: 10px;
  background-color: #fff;
}
</style>
