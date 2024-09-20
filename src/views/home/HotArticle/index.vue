<template>
  <div class="hot-article-wrap">
    <div class="header">热门文章</div>
    <div class="card-list">
      <Card
        v-for="item in homeStore.popularArticleList"
        :key="item.id"
        class="card"
        :on-click="() => toDetail(item.id)"
      >
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
import { useRouter } from 'vue-router';
import { homeStore } from '@/store';
import { SSM } from '@/constant';
import Card from '@/components/Card/index.vue';

const router = useRouter();

const toDetail = (id: string) => {
  router.push(`/detail/${id}`);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.hot-article-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px 0 0;
  border-radius: 5px;
  background-color: @fff;
  max-height: 405px;

  .header {
    text-align: center;
    margin-bottom: 10px;
    font-size: 18px;
  }

  .card-list {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .card {
      flex: 1;
      height: auto;
      background-image: none;
      box-shadow: none;
      margin-right: 0;
      cursor: pointer;

      .img {
        width: 100%;

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
