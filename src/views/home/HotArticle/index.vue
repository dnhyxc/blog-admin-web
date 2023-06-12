<template>
  <div class="hot-article-wrap">
    <div class="header">热门文章</div>
    <div class="card-list">
      <Card v-for="item in homeStore.popularArticleList" :key="item" class="card">
        <template #img>
          <div class="img">
            <Image :url="item.coverImage || SSM" :transition-img="SSM" class="el-image" />
          </div>
        </template>
        <template #article-info>
          <div class="title">{{ item.title }}</div>
          <div class="content">
            {{ item.abstract }}
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { homeStore } from '@/store';
import { SSM } from '@/constant';
import Card from '@/components/Card/index.vue';
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.hot-article-wrap {
  padding: 10px 0 0;
  border-radius: 5px;
  background-color: @fff;

  .header {
    text-align: center;
    margin-bottom: 10px;
    font-size: 18px;
  }

  .card-list {
    display: flex;
    justify-content: space-between;

    .card {
      flex: 1;
      height: auto;
      background-image: none;
      box-shadow: none;
      margin-right: 0;

      .img {
        width: 100%;
        height: 260px;

        .el-image {
          width: 100%;
          height: 100%;

          :deep {
            .image-item {
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
            }
          }
        }
      }

      .title {
        font-size: 16px;
        font-weight: 700;
        padding: 5px 10px 10px 10px;
        background-color: @info-light-9;
      }

      .content {
        flex: 1;
        padding: 5px 10px 10px 10px;
        font-size: 13px;
        background-color: @info-light-9;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
}
</style>
