<template>
  <Loading :loading="commentStore.loading" class="comment">
    <el-collapse v-model="activeNames" class="el-collapse">
      <el-scrollbar ref="scrollRef" class="tag-list">
        <div v-if="isMounted" class="infinite-list-wrapper">
          <div
            v-infinite-scroll="load"
            class="list"
            :infinite-scroll-disabled="disabled"
            infinite-scroll-immediate
            infinite-scroll-distance="5"
          >
            <el-collapse-item v-for="item in dataSource.list" :key="item.id" :name="item.id" class="collapse-item">
              <template #title>
                <div class="title">{{ item.title }}</div>
              </template>
              <Comment
                v-model:comment-list="item.commentList"
                :article-id="item.authorId!"
                :author-id="item.authorId!"
                class="comment-detail"
                :reset-comment-list="resetCommentList"
              />
            </el-collapse-item>
          </div>
          <p v-if="loading" class="loading">Loading...</p>
          <p v-if="noMore" class="no-more">没有更多了～～～</p>
        </div>
      </el-scrollbar>
    </el-collapse>
    <ToTopIcon v-if="scrollTop >= 500" :on-scroll-to="onScrollTo" />
  </Loading>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import { commentStore } from '@/store';
import { scrollTo } from '@/utils';
import { useScroller } from '@/hooks';
import { ArticleItem, CommentParams } from '@/typings/comment';
import Comment from '@/components/Comment/index.vue';

type loadType = boolean;

const activeNames = ref<string[]>([]);
const dataSource = ref<{ list: ArticleItem[]; total: number }>({ list: [], total: 0 });
const loading = ref<loadType>(false);
const noMore = computed(() => dataSource.value.list.length >= dataSource.value.total);
const disabled = computed(() => loading.value || noMore.value);
const isMounted = ref<boolean>(false);
const pageNo = ref<number>(1);

const { scrollRef, scrollTop } = useScroller();

onBeforeMount(() => {
  commentStore.comments = [];
});

onMounted(async () => {
  isMounted.value = true;
  loading.value = true;
  const res = await commentStore.getArticlesComments({ pageNo: pageNo.value });
  loading.value = false;
  dataSource.value = res!;
  if (dataSource.value.list.length < res?.total!) {
    pageNo.value++;
  }
  activeNames.value = res?.list.filter((i) => i.commentList?.comments.length!).map((j) => j.id) || [];
});

// 评论删除、恢复、作废操作回调
const resetCommentList = async ({
  comment,
  isRestore,
  isDelete,
}: {
  comment: CommentParams;
  isRestore: boolean;
  isDelete: boolean;
}) => {
  // 删除
  if (isDelete) {
    dataSource.value.list.forEach((i) => {
      if (i.commentList?.comments?.length) {
        i.commentList?.comments.forEach((j, index) => {
          if (j.id === comment.id && isDelete) {
            i.commentList?.comments.splice(index, 1);
            return;
          }
          if (j.replyList?.length) {
            j.replyList.forEach((k, index) => {
              if (k._id === comment._id && isDelete) {
                j.replyList?.splice(index, 1);
              }
            });
          }
        });
      }
    });
  }

  // 恢复、作废
  dataSource.value.list.forEach((i) => {
    if (i.commentList?.comments?.length) {
      i.commentList?.comments.forEach((j) => {
        if (j.id === comment.id) {
          j.isDelete = !j.isDelete;
          return;
        }

        if (j.replyList?.length) {
          j.replyList.forEach((k) => {
            if (k._id === comment._id) {
              if (isRestore) {
                k.isDelete = false;
              } else {
                k.isDelete = true;
              }
            }
          });
        }
      });
    }
  });
};

// 滚动加载事件
const load = async () => {
  loading.value = true;
  const res = await commentStore.getArticlesComments({ pageNo: pageNo.value });
  loading.value = false;
  dataSource.value = {
    list: [...dataSource.value.list, ...res?.list!],
    total: res?.total!,
  };
  const ids = res?.list.filter((i) => i.commentList?.comments.length!).map((j) => j.id) || [];
  activeNames.value = [...activeNames.value, ...ids] || [];
  if (dataSource.value.list.length < res?.total!) {
    pageNo.value++;
  }
};

// 滚动到顶部
const onScrollTo = () => {
  scrollTo(scrollRef, 0);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.comment {
  .layoutStyles();
  padding-right: 0;
  overflow: hidden;

  :deep(.el-collapse) {
    padding: 0;
    border-top: none;
    background-color: @bg-color-page;
  }

  .tag-list {
    box-sizing: border-box;
    height: calc(100vh - 70px);

    .infinite-list-wrapper {
      height: 100%;

      .list {
        margin-right: 2px;

        .title {
          font-size: 18px;
          padding-left: 10px;
        }

        .commentWrap {
          display: flex;
          justify-content: space-between;
          padding-top: 30px;
          padding-left: 10px;

          .avatar {
            margin-right: 10px;

            .avatar-img {
              width: 50px;
              height: 50px;
              border-radius: 50px;
            }
          }

          .commentContent {
            flex: 1;

            .userInfo {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;

              .name {
                flex: 1;
                font-size: 16px;
                font-weight: 600;
                cursor: default;

                .ellipsisMore(1);

                .isAuthor {
                  margin-left: 10px;
                  font-weight: 400;
                  font-size: 14px;
                }

                .replyInfo {
                  font-weight: 400;
                  font-size: 14px;
                  margin-left: 10px;

                  .fromUsername {
                    font-size: 16px;
                    margin-left: 10px;
                    font-weight: 600;
                  }
                }
              }

              .date {
                margin-left: 10px;
                min-width: 105px;
                color: @000;
              }
            }

            .formContent {
              margin-top: 10px;
              border: 1px solid @info-light-7;
              padding: 5px 20px 6px 20px;
              background-color: @bg-color-page;
              border-radius: 5px;
            }

            .commentChild {
              background-color: @bg-color-light;
              margin-top: 15px;
              padding: 15px;
              border-radius: 5px;

              .commentChildItem {
                display: flex;
                margin-bottom: 20px;

                .commentChildItemContent {
                  width: 100%;
                }

                .avatar {
                  width: 45px;
                  height: 45px;

                  .avatar-img {
                    width: 45px;
                    height: 45px;
                  }
                }

                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }

        .collapse-item {
          margin-right: 10px;
        }
      }
    }

    .loading,
    .no-more {
      text-align: center;
      margin: 15px 0 5px 0;
    }
  }
}
</style>
