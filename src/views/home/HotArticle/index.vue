<template>
  <div class="hot-article-wrap">
    <div class="header">热门文章</div>
    <div class="card-list">
      <Card v-for="item in [1, 2]" :key="item" class="card">
        <template #img>
          <div class="img">
            <el-image
              style="width: 100%; height: 100%; border-radius: 5px"
              src="https://pic1.zhimg.com/80/v2-7f05d7f37056b61086790a2ffbb5b335_720w.webp?source=1940ef5c"
              fit="cover"
            />
          </div>
        </template>
        <template #title>
          <div class="title">React + Webpack 项目搭建</div>
        </template>
        <template #content>
          <div class="content">
            看完本篇文章，你将了解服务器环境搭建，前后端项目独立部署，以及使用同一个 nginx 部署多个前端项目
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/Card/index.vue';
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.hot-article-wrap {
  padding: 10px;
  border-radius: 5px;
  background-color: @fff;

  .header {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .card-list {
    display: flex;
    justify-content: space-between;

    .card {
      flex: 1;
      height: auto;
      background-image: none;
      box-shadow: 0 0 3px @info-light-5 !important;

      .img {
        width: 100%;
        height: 260px;
        border-radius: 5px;
      }

      .title {
        font-size: 16px;
        font-weight: 700;
        margin: 10px 0;
      }

      .content {
        .ellipsisMore(2);
        font-size: 13px;
      }
    }
  }
}
</style>
