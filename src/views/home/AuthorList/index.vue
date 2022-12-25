<!--
 * 作者列表
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="wrap">
    <div class="header">作者列表</div>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <div v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
        <List v-for="i in count" :key="i" class="list-item">
          <template #left>
            <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </template>
          <template #title>
            <div class="title">
              <div>{{ i }}</div>
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import List from '@/components/List/index.vue';

type countType = number;
type loadType = boolean;

const count = ref<countType>(10);
const loading = ref<loadType>(false);
const noMore = computed(() => count.value >= 20);
const disabled = computed(() => loading.value || noMore.value);

const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 2000);
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.webkitScrollbarStyle(transparent, transparent);

.wrap {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 5px;
  background-color: @fff;
  padding: 10px 2px 10px 10px;

  .header {
    padding-bottom: 10px;
    margin-right: 10px;
    font-size: 18px;
    text-align: center;
  }

  .infinite-list-wrapper {
    height: 410px;

    .list {
      padding: 0;
      margin: 0;
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
</style>
