<!--
 * 时间轴
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="wrap">
    <div class="top">
      <div class="desc">
        <div class="text">
          {{ userStore.authorInfoEndArticleInfo?.authorInfo?.introduce }}
        </div>
      </div>
      <div class="info">
        <div class="left">
          <Image
            :url="userStore.authorInfoEndArticleInfo?.authorInfo?.headUrl || SEA"
            :transition-img="SEA"
            class="avatar-image"
          />
        </div>
        <div class="right">
          <div class="title">{{ userStore.authorInfoEndArticleInfo?.authorInfo?.username }}</div>
          <div class="content">{{ userStore.authorInfoEndArticleInfo?.authorInfo?.motto }}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="right">
        <Image
          :url="userStore.authorInfoEndArticleInfo?.authorInfo?.headUrl || SEA"
          :transition-img="SEA"
          class="image"
        />
      </div>
      <div class="left">
        <div class="header">博主发表的文章数量</div>
        <div class="number">{{ userStore.authorInfoEndArticleInfo?.articleInfo?.articleTotal }}</div>
        <div class="article-info">
          <span class="lately-article">最近发表：</span>
          <span class="title">《 {{ userStore.authorInfoEndArticleInfo?.articleInfo?.newArticle?.title }}》</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '@/store';
import { SEA } from '@/constant';
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.webkitScrollbarStyle(transparent, transparent);

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-radius: 5px;

  .top {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: @fff;
    border-radius: 5px;

    .desc {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      background-color: #798efa;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      z-index: 10;

      .text {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        padding: 0 10px;
        font-size: 14px;
        color: @fff;
        .ellipsisMore(3);
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 20px;
        width: 0;
        height: 0;
        border-top: 16px solid #798efa;
        border-right: 16px solid transparent;
        transform: rotate(90deg);
      }
    }

    .info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .avatar-image {
        width: 45px;
        height: 45px;
        border-radius: 45px;

        :deep {
          .image-item {
            border-radius: 45px;
          }
        }
      }

      .right {
        flex: 1;
        margin-left: 20px;

        .title {
          font-size: 18px;
        }

        .content {
          font-size: 13px;
        }
      }
    }
  }

  .bottom {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: @fff;
    border-radius: 5px;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 10px 0;

      .header {
        font-size: 18px;
      }

      .number {
        font-size: 32px;
        font-weight: 700;
        margin: 10px 0;
      }
    }

    .right {
      display: flex;
      align-items: center;
      height: 50%;

      .image {
        border-radius: 5px;
        height: 100%;

        :deep {
          .image-item {
            border-radius: 5px;
            display: block;
          }
        }
      }
    }
  }
}
</style>
