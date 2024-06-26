<!--
 * 文章详情
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div id="__DETAIL__" v-loading="detailStore.loading" class="detail-wrap">
    <TopMenu class="top-menu" />
    <div ref="detailWrapRef" class="content" @scroll="onScroll">
      <div class="prewiew">
        <div class="header">{{ detailStore.detail?.title }}</div>
        <div class="info">
          <div class="avatar">
            <el-avatar :size="60" fit="cover" :src="detailStore.detail?.headUrl || IMAGES.sea" @error="errorHandler" />
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
        <Preview v-if="mackdown" :mackdown="mackdown" class="preview-content" />
        <Comment
          v-if="detailStore.detail?.id!"
          :article-id="detailStore.detail?.id!"
          :author-id="detailStore.detail?.authorId!"
          class="comment-detail"
        />
      </div>
      <div v-if="detailStore.tocTitles.length" target="#__DETAIL__" :offset="60" class="toc-affix">
        <Toc />
      </div>
    </div>
    <div v-if="scrollTop >= 500" class="back-top" @click="onScrollToTop">
      <i class="icon iconfont icon-huojian" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { detailStore, commentStore } from '@/store';
import { formatDate } from '@/utils';
import { IMAGES } from '@/constant';
import Preview from '@/components/Preview/index.vue';
import TopMenu from '@/components/TopMenu/index.vue';
import Comment from '@/components/Comment/index.vue';
import Toc from '@/components/Toc/index.vue';

const route = useRoute();

const mackdown = ref<string | undefined>('');
const detailWrapRef = ref<HTMLDivElement | null>(null);
const scrollTop = ref<number>(0);

onMounted(async () => {
  nextTick(() => {
    detailStore.setPreviewRef(detailWrapRef.value);
  });
  const { id } = route.params;
  if (id) {
    // 获取文章详情
    const res = await detailStore.getArticleDetail(id as string);
    // 使用 ref 存储文章正文内容，已到达实时更新文章目录的效果
    mackdown.value = res?.content;
    // 获取文章评论
    commentStore.getCommentList(id as string);
  }
});

onUnmounted(() => {
  detailStore.clearDetail();
  commentStore.clearComment();
});

const onScroll = (e: Event) => {
  scrollTop.value = (e.target as HTMLDivElement).scrollTop;
};

const onScrollToTop = () => {
  nextTick(() => {
    detailWrapRef.value?.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

// 图片加载失败事件
const errorHandler = () => true;
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.detail-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: @bg-color-page;
  box-sizing: border-box;
  overflow: hidden;

  .top-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .content {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 10px;
    height: calc(100vh - 70px);
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0 12%;

    .toc-affix {
      position: sticky;
      top: 0;
      box-sizing: border-box;
      width: 280px !important;
      height: calc(100vh - 70px);
    }

    .prewiew {
      display: flex;
      flex-direction: column;
      width: calc(100% - 280px);
      height: 100%;
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
          width: 100%;
          height: auto;
        }
      }

      .abstract {
        padding: 0 30px;
        background-color: @fff;
      }

      .preview-content {
        max-width: 100%;
        border-radius: 5px;
      }

      .comment-detail {
        margin-top: 10px;
        border-radius: 5px;
      }
    }
  }

  .back-top {
    position: fixed;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgb(255 255 255 / 20%);
    background-color: @fff;
    cursor: pointer;

    .icon {
      font-size: 25px;
    }
  }
}
</style>
