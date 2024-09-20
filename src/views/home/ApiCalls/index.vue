<template>
  <div v-loading="loading" class="api-calls-wrap">
    <div class="top-title">
      接口调用情况
      <el-tooltip class="box-item" effect="dark" content="刷新接口调用情况" placement="top">
        <el-button :icon="RefreshRight" :disabled="loading" link @click="onRefreshApiCalls" />
      </el-tooltip>
    </div>
    <div class="header">
      <div class="total">
        <div class="title">接口总调用次数</div>
        <div class="count">{{ apiCallsStore.total }}</div>
      </div>
      <div class="day-total">
        <div class="title">今日接口调用次数</div>
        <div class="count">{{ apiCallsStore.dayTotal }}</div>
      </div>
    </div>
    <div class="card-list">
      <el-table :data="apiCallsStore.apiCalledList" border stripe height="261" style="width: 100%">
        <el-table-column prop="api" label="API" width="397" show-overflow-tooltip />
        <el-table-column prop="count" label="调用次数" />
        <el-table-column prop="updateTime" label="最新调用时间" width="157">
          <template #default="scope">
            <span>{{ formatDate(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RefreshRight } from '@element-plus/icons-vue';
import { apiCallsStore } from '@/store';
import { formatDate } from '@/utils';

const loading = ref<boolean>(false);

onMounted(() => {
  onRefreshApiCalls();
});

const onRefreshApiCalls = async () => {
  loading.value = true;
  try {
    await Promise.all([
      apiCallsStore.getApiCallsTotal(),
      apiCallsStore.getApiCalledList(),
      apiCallsStore.getApiCallsTotalByDay(),
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.api-calls-wrap {
  background-color: @fff;
  border-radius: 5px;
  padding: 10px;
  max-height: 405px;

  .top-title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 18px;
    text-align: center;

    .refresh-icon {
      position: absolute;
      right: 10px;
      cursor: pointer;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .total,
    .day-total {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      height: 50px;
      padding: 10px;
      border-radius: 5px;
      background-image: linear-gradient(-45deg, #a1c4fd 0%, #c2e9fb 100%);

      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .count {
        font-size: 25px;
        font-weight: 700;
      }
    }

    .total {
      margin-right: 10px;
    }
  }

  .card-list {
    margin-top: 10px;
  }
}
</style>
