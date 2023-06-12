<!--
 * 作者列表
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="wrap">
    <div class="header">标签列表</div>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <!-- infinite-scroll-distance="1" 表示触发加载的距离阈值，单位为px。可解决只加载一次或几次后，滚动加载失效的问题 -->
      <div class="list">
        <List v-for="(i, index) in homeStore.tagList" :key="index" class="list-item">
          <template #title>
            <div class="title">
              <div class="username">{{ i.name }}</div>
            </div>
          </template>
          <template #content>
            <div class="content">
              <div class="desc">包含（{{ i.value }}）篇文章</div>
            </div>
          </template>
        </List>
        <div class="no-more">没有更多了～～～</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { homeStore } from '@/store';
import List from '@/components/List/index.vue';
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

        .avatar-image {
          width: 45px;
          height: 45px;
          border-radius: 45px;
          margin-right: 10px;

          :deep {
            .image-item {
              border-radius: 45px;
            }
          }
        }
      }

      .title {
        display: flex;
        justify-content: space-between;

        .username {
          flex: 1;
          .ellipsisMore(1);
          margin-right: 10px;
        }
      }

      .content {
        text-align: left;
        .ellipsisMore(2);
        margin-top: 5px;

        .desc {
          font-size: 14px;
        }
      }
    }
  }

  .no-more {
    text-align: center;
    padding: 15px 0 5px;
  }
}
</style>
