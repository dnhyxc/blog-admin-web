<template>
  <div class="home">
    <div class="card-list">
      <Card>
        <template #title>
          <div class="title">作者人数</div>
        </template>
        <template #content>
          <div class="content">5</div>
        </template>
        <template #footer>
          <div class="footer">贡献文章最多的作者《dnhyxc》</div>
        </template>
      </Card>
      <Card>
        <template #title>
          <div class="title">文章总数</div>
        </template>
        <template #content>
          <div class="content">56</div>
        </template>
        <template #footer>
          <div class="footer">
            最受欢迎的文章《我的县长父亲》最受欢迎的文章《我的县长父亲》最受欢迎的文章《我的县长父亲》最受欢迎的文章《我的县长父亲》
          </div>
        </template>
      </Card>
      <Card>
        <template #title>
          <div class="title">标签总数</div>
        </template>
        <template #content>
          <div class="content">16</div>
        </template>
        <template #footer>
          <div class="footer">使用最多的标签《JavaScript》</div>
        </template>
      </Card>
      <Card>
        <template #title>
          <div class="title">分类总数</div>
        </template>
        <template #content>
          <div class="content">32</div>
        </template>
        <template #footer>
          <div class="footer">使用最多的分类《前端》</div>
        </template>
      </Card>
    </div>
    <div class="echarts-list">
      <ClassifyChart class="left" />
      <!-- <Content class="center">
        <template #title>
          <div class="title">文章统计</div>
        </template>
      </Content> -->
      <ArticleChart class="center" />
      <Content class="right">
        <template #title>
          <div class="title">标签统计</div>
        </template>
        <template #content>
          <div id="tag_chart" style="width: 100%; height: 400px"></div>
        </template>
      </Content>
    </div>
    <div class="list-container">
      <AuthorList class="list-content"></AuthorList>
      <Timeline class="list-content"></Timeline>
      <Blogger class="list-content"></Blogger>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import Content from '@/components/Content/index.vue';
import ClassifyChart from './ClassifyChart/index.vue';
import ArticleChart from './ArticleChart/index.vue';
import AuthorList from './AuthorList/index.vue';
import Timeline from './Timeline/index.vue';
import Blogger from './Blogger/index.vue';
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.home {
  box-sizing: border-box;
  height: calc(100vh - 70px);
  padding-right: 12px;
  color: @text-color-primary;
  overflow: auto;

  .card-list {
    display: flex;
    justify-content: space-between;
    color: @text-color-primary;
    margin-bottom: 10px;

    .title {
      font-size: 18px;
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
    height: 380px;
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
}
</style>
