<!--
 * 文章详情
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div v-loading="detailStore.loading" class="detail-wrap">
    <TopMenu class="top-menu" />
    <div class="content">
      <div class="prewiew">
        <div class="header">{{ detailStore.detail?.title }}</div>
        <div class="info">
          <div class="avatar">
            <el-avatar :size="60" fit="cover" :src="IMAGES.sea" @error="errorHandler">
              <img :src="detailStore.detail?.headUrl || IMAGES.sea" />
            </el-avatar>
          </div>
          <div class="art-info">
            <div class="username">{{ detailStore.detail.authorName }}</div>
            <div class="read-info">
              <span class="time">{{ formatDate(detailStore.detail?.createTime!) }}</span>
              <span class="read-count">阅读 {{ detailStore.detail?.readCount }}</span>
            </div>
          </div>
        </div>
        <div class="coverImg">
          <el-image class="el-image" :src="detailStore.detail?.coverImage" fit="cover" />
        </div>
        <div class="abstract">{{ detailStore.detail?.abstract }}</div>
        <Preview v-if="detailStore.detail.content" :mackdown="detailStore.detail?.content" class="preview-content" />
        <Comment
          v-if="detailStore.detail?.id!"
          :article-id="detailStore.detail?.id!"
          :author-id="detailStore.detail?.authorId!"
          class="comment-detail"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { detailStore, commentStore } from '@/store';
import { formatDate } from '@/utils';
import { IMAGES } from '@/constant';
import Preview from '@/components/Preview/index.vue';
import TopMenu from '@/components/TopMenu/index.vue';
import Comment from '@/components/Comment/index.vue';

const route = useRoute();

onMounted(() => {
  const { id } = route.params;
  if (id) {
    // 获取文章详情
    detailStore.getArticleDetail(id as string);
    // 获取文章评论
    commentStore.getCommentList(id as string);
  }
});

// 图片加载失败事件
const errorHandler = () => true;
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.detail-wrap {
  height: 100%;
  background-color: @bg-color-page;
  overflow-x: hidden;

  .top-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .content {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 10px;

    .prewiew {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 820px;
      margin: 0 10px;
      border-radius: 5px;

      .header {
        max-width: 100%;
        padding: 30px;
        font-size: 32px;
        line-height: 32px;
        font-weight: 700;
        background-color: @fff;
        border-radius: 5px;
      }

      .info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 30px;
        background-color: @fff;

        .art-info {
          margin-left: 12px;

          .read-info {
            color: @text-color;
            font-size: 14px;

            .read-count {
              margin-left: 10px;
            }
          }
        }
      }

      .coverImg {
        padding: 15px 30px 0;
        background-color: @fff;

        .el-image {
          border-radius: 5px;
        }
      }

      .abstract {
        padding: 0 30px;
        background-color: @fff;
      }

      .preview-content {
        max-width: 100%;
        overflow-x: auto;
        border-radius: 5px;
      }

      .comment-detail {
        margin-top: 10px;
        border-radius: 5px;
      }
    }
  }
}
</style>
