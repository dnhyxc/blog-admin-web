<template>
  <div class="tag-list-wrap">
    <el-tabs type="border-card">
      <el-tab-pane v-for="data in tabList" :key="data.tabName" :label="data.tabName">
        <div v-if="isMounted" class="tag-list">
          <div class="infinite-list-wrapper" style="overflow: auto">
            <div
              v-infinite-scroll="load"
              class="list"
              :infinite-scroll-disabled="disabled"
              infinite-scroll-immediate
              infinite-scroll-distance="1"
            >
              <List v-for="(item, index) in data.dataSoure" :key="index" class="list-item">
                <template #left>
                  <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </template>
                <template #title>
                  <div class="title">
                    <div>{{ item }}</div>
                    <div>right</div>
                  </div>
                </template>
                <template #content>
                  <div class="content">
                    <div class="desc">desc</div>
                  </div>
                </template>
              </List>
            </div>
            <p v-if="loading" class="loading">Loading...</p>
            <p v-if="noMore" class="no-more">没有更多了～～～</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <Card class="card" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import List from '@/components/List/index.vue';
import Card from '@/components/Card/index.vue';

type countType = number;
type loadType = boolean;

const count = ref<countType>(20);
const loading = ref<loadType>(false);
const noMore = computed(() => count.value >= 50);
const disabled = computed(() => loading.value || noMore.value);
const isMounted = ref<boolean>(false);
const tabList = computed(() => {
  return [
    {
      tabName: '已添加标签',
      dataSoure: count.value,
    },
    {
      tabName: '全部标签',
      dataSoure: count.value,
    },
  ];
});

onMounted(() => {
  isMounted.value = true;
});

const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 2000);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.tag-list-wrap {
  .layoutStyles();

  :deep(.el-tabs__content) {
    padding: 15px 0 15px 15px;
  }

  .tag-list {
    box-sizing: border-box;
    height: calc(100vh - 141px);

    .infinite-list-wrapper {
      height: 100%;

      .list {
        margin-right: 7px;
        list-style: none;

        .list-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar {
          margin-right: 10px;
        }
        .title {
          display: flex;
          justify-content: space-between;
        }

        .content {
          text-align: left;
        }
      }
    }

    .loading,
    .no-more {
      text-align: center;
    }
  }

  .card {
    width: 225px;
    height: 225px;
    box-sizing: border-box;
    background-image: none;
  }
}
</style>
