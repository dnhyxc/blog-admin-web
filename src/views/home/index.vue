<template>
  <Loading :loading="homeStore.loading" class="spin-wrap">
    <div class="home">
      <div class="card-list">
        <Card>
          <template #title>
            <div class="title">已发布过文章的作者人数</div>
          </template>
          <template #content>
            <div class="content">{{ homeStore.authors?.length }}</div>
          </template>
          <template #footer>
            <div v-if="homeStore.authors?.length > 0" class="footer">
              贡献文章最多的作者<span class="mack">{{ homeStore.authors?.[0].authorName }}</span>
            </div>
          </template>
        </Card>
        <Card>
          <template #title>
            <div class="title">文章总数</div>
          </template>
          <template #content>
            <div class="content">{{ homeStore.articleTotalCount }}</div>
          </template>
          <template #footer>
            <div class="footer">
              最受欢迎的文章<span class="mack">{{ homeStore.popularArticle?.title }}</span>
            </div>
          </template>
        </Card>
        <Card>
          <template #title>
            <div class="title">标签总数</div>
          </template>
          <template #content>
            <div class="content">{{ homeStore.tagTotal }}</div>
          </template>
          <template #footer>
            <div class="footer">
              使用最多的标签<span class="mack">{{ homeStore.tagMaxItem?.name }}</span> ，共
              {{ homeStore.tagMaxItem?.value }} 篇文章
            </div>
          </template>
        </Card>
        <Card>
          <template #title>
            <div class="title">分类总数</div>
          </template>
          <template #content>
            <div class="content">{{ homeStore.classifyTotal }}</div>
          </template>
          <template #footer>
            <div class="footer">
              使用最多的分类<span class="mack">{{ homeStore.classifyMaxItem?.name }} </span>， 共
              {{ homeStore.classifyMaxItem?.value }} 篇文章
            </div>
          </template>
        </Card>
      </div>
      <div v-if="homeStore.articleStatisticData && homeStore.classifyList?.length > 0" class="echarts-list">
        <ClassifyChart class="left" />
        <ArticleChart class="center" />
        <RegisterChart v-if="homeStore.registerStatistic?.length > 0" class="right" />
      </div>
      <div class="hot-article-list">
        <HotArticle />
      </div>
      <div class="list-container">
        <AuthorList class="list-content" />
        <TagList class="list-content" />
        <Blogger class="list-content" />
      </div>
      <div class="footer">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer"> 浙ICP备：2024111222号-1 </a>
      </div>
    </div>
  </Loading>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { homeStore, accountStore } from '@/store';
import Card from '@/components/Card/index.vue';
import ClassifyChart from './ClassifyChart/index.vue';
import ArticleChart from './ArticleChart/index.vue';
import RegisterChart from './RegisterChart/index.vue';
import AuthorList from './AuthorList/index.vue';
import TagList from './TagList/index.vue';
import Blogger from './Blogger/index.vue';
import HotArticle from './HotArticle/index.vue';

onMounted(() => {
  homeStore.getHomeData();
});

onUnmounted(() => {
  accountStore.clearUserListInfo();
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.home {
  .layoutStyles();

  .card-list {
    display: flex;
    justify-content: space-between;
    color: @text-color-primary;
    margin-bottom: 10px;

    .title {
      font-size: 18px;
    }

    .mack {
      font-weight: 700;
      margin-left: 5px;
      color: @primary;
    }

    .content {
      text-align: center;
      font-weight: 700;
      font-size: 32px;
    }

    .footer {
      .ellipsisMore(2);
    }
  }

  .echarts-list {
    height: 400px;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      width: 25%;
      text-align: center;
    }
    .center {
      flex: 1;
      margin: 0 10px;
      text-align: center;
    }
  }

  .list-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;

    .list-content {
      flex: 1;
      margin-right: 10px;
      height: 420px;
      box-sizing: border-box;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .footer {
    margin-top: 10px;
    font-size: 12px;
    text-align: center;
  }

  .hot-article-list {
    margin-top: 10px;
  }
}
</style>
