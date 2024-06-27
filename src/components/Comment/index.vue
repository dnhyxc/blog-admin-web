<!--
 * 评论组件
 * @author: dnhyxc
 * @since: 2023-01-13
 * index.vue
-->
<template>
  <div v-if="commentList.comments.length > 0 || commentStore.comments?.length > 0" class="Comments">
    <div v-if="commentList.comments.length > 0 || commentStore.comments?.length > 0" class="title">
      全部评论
      <span class="replyCount">
        {{ getCommentCount(commentList.comments.length ? commentList.comments : commentStore.comments) }}
      </span>
    </div>
    <div
      v-for="i in commentList.comments.length > 0 ? commentList.comments : commentStore.comments"
      :key="i.commentId"
      class="commentWrap"
    >
      <div class="avatar">
        <el-avatar class="image" fit="cover" :src="i.headUrl || IMAGES.sea" @error="errorHandler" />
      </div>
      <div class="commentContent">
        <div class="commentMain">
          <div class="userInfo">
            <span class="name">{{ i.username }}</span>
            <div class="date">
              {{ formatGapTime(i.date!) }}
              <el-button
                v-if="i?.isDelete"
                type="primary"
                link
                class="deleteComment"
                @click="onRestoreComment({ comment: i, articleId: commentList.articleId })"
              >
                恢复评论
              </el-button>
              <el-button
                v-else
                type="warning"
                link
                class="deleteComment"
                @click="onRemoveComment({ comment: i, articleId: commentList.articleId })"
              >
                作废评论
              </el-button>
              <el-button
                type="danger"
                link
                class="deleteComment"
                @click="onDeleteComment({ comment: i, articleId: commentList.articleId })"
                >删除评论</el-button
              >
            </div>
          </div>
          <div class="desc" @click.stop="onPreviewImage" v-html="replaceCommentContent(i.content!)" />
          <div class="comment-count">
            <span v-if="i.likeCount" class="like-count">点赞 {{ i.likeCount }}</span>
            <span v-if="i.replyList?.length" class="replay-count">评论 {{ i.replyList?.length }}</span>
          </div>
        </div>
        <div v-if="i.replyList && i.replyList?.length! > 0" class="commentChild">
          <div v-for="j in checkReplyList(i.replyList, i.commentId!)" :key="j.commentId" class="commentChildItem">
            <div class="avatar">
              <el-avatar
                class="image"
                fit="cover"
                :src="j.headUrl || IMAGES.sea"
                @error="errorHandler"
                @click="() => {}"
              />
            </div>
            <div class="commentChildItemContent">
              <div class="userInfo">
                <span class="name">
                  <span>{{ j.username }}</span>
                  <span v-if="j.userId === authorId" class="isAuthor">(作者)</span>
                  <span v-if="j.fromUsername" class="replyInfo">
                    回复
                    <span class="fromUsername">
                      {{ j.fromUsername }}
                    </span>
                  </span>
                </span>
                <div class="date">
                  {{ formatGapTime(j.date!) }}
                  <el-button
                    v-if="j?.isDelete"
                    type="primary"
                    link
                    class="deleteComment"
                    @click="onRestoreComment({ comment: j, isThreeTier: true, articleId: commentList.articleId })"
                  >
                    恢复评论
                  </el-button>
                  <el-button
                    v-else
                    type="warning"
                    link
                    class="deleteComment"
                    @click="onRemoveComment({ comment: j, isThreeTier: true, articleId: commentList.articleId })"
                  >
                    作废评论
                  </el-button>
                  <el-button
                    type="danger"
                    link
                    class="deleteComment"
                    @click="onDeleteComment({ comment: j, isThreeTier: true, articleId: commentList.articleId })"
                  >
                    删除评论
                  </el-button>
                </div>
              </div>
              <div
                v-if="j.content"
                class="desc"
                @click.stop="onPreviewImage"
                v-html="replaceCommentContent(j.content!)"
              />
              <div
                v-if="j.formContent"
                class="formContent"
                @click.stop="onPreviewImage"
                v-html="replaceCommentContent(j.formContent!)"
              />
            </div>
          </div>
          <div
            v-if="checkReplyList(i.replyList, i.commentId!).length !== i.replyList?.length"
            class="viewMore"
            @click="onViewMoreReply(i.commentId!)"
          >
            <span class="viewText">查看更多（{{ i.replyList && i.replyList.length - 2 }} 条）回复</span>
            <el-icon><ArrowDown /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <Message
      v-model:visible="messageVisible"
      title="删除评论"
      content="确定删除该账号吗？"
      :on-submit="onSubmitDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { IMAGES } from '@/constant';
import { formatGapTime, replaceCommentContent } from '@/utils';
import { CommentParams, CommentListParams } from '@/typings/comment';
import { commentStore } from '@/store';
import Message from '@/components/Message/index.vue';

interface IParams {
  comment: CommentParams;
  articleId: string;
  isThreeTier?: boolean;
}

interface IProps {
  authorId: string;
  articleId: string;
  commentList?: CommentListParams;
  resetCommentList?: Function;
  onPreviewImage?: (e: Event) => void;
}

interface manageParams {
  comment: CommentParams;
  articleId?: string;
  isThreeTier?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  authorId: '',
  articleId: '',
  commentList: () => ({
    comments: [],
    count: 0,
    articleId: '',
  }),
  resetCommentList: () => {},
  onPreviewImage: (e: Event) => {},
});

const viewMoreComments = ref<string[]>([]);
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const deleteParams = ref<IParams>({
  comment: {},
  isThreeTier: false,
  articleId: '',
});

// 计算评论数
const getCommentCount = (comments: CommentParams[]) => {
  let count = 0;
  comments.forEach((i) => {
    const length: number = i.replyList?.length || 0;
    count += length + 1;
  });

  return count;
};

// 作废评论
const onRemoveComment = async (params: manageParams) => {
  const { comment, isThreeTier, articleId } = params;
  if (!props.articleId) return;
  await commentStore.removeComment({ comment, isThreeTier, articleId: articleId || props.articleId });
  props.resetCommentList({ comment });
};

// 恢复评论
const onRestoreComment = async (params: manageParams) => {
  const { comment, isThreeTier, articleId } = params;
  if (!props.articleId && !articleId) return;
  await commentStore.restoreComment({ comment, isThreeTier, articleId: articleId || props.articleId });
  props.resetCommentList({ comment, isRestore: true });
};

// 删除评论
const onDeleteComment = (params: manageParams) => {
  const { comment, isThreeTier, articleId } = params;
  if (!props.articleId) return;
  deleteParams.value = {
    comment,
    isThreeTier,
    articleId: articleId || props.articleId,
  };
  messageVisible.value = true;
};

// 确认删除评论
const onSubmitDelete = async () => {
  await commentStore.deleteComment(deleteParams.value);
  props.resetCommentList({ comment: deleteParams.value.comment, isDelete: true });
};

// 判断viewMoreComments是否包含commentId，以此返回对应的replyList
const checkReplyList = (replyList: CommentParams[], commentId: string) => {
  if (viewMoreComments.value.includes(commentId)) {
    return replyList;
  }
  return replyList.slice(0, 2);
};

// 收集可以查看全部的commentId
const onViewMoreReply = (commentId: string) => {
  viewMoreComments.value = [...viewMoreComments.value, commentId];
};

const onPreviewImage = (e: Event) => {
  // if (target?.innerText && checkHref(target.innerText)) {
  //   window.open(target.innerText);
  // }
  props?.onPreviewImage?.(e);
};

// 图片加载失败事件
const errorHandler = () => true;
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.Comments {
  background-color: @fff;
  padding: 0 30px 20px 30px;
  border-radius: 5px;

  .draftInputWrap {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: @fff;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    padding: 20px 0 0;
    background-color: @fff;
  }

  .replyCount {
    margin-left: 5px;
  }

  .commentWrap {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;

    .avatar {
      margin-right: 20px;

      .image {
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
    }

    .iconWrap {
      margin-right: 20px;
      &:hover {
        color: @primary;
      }
      cursor: pointer;
      .clickNoSelectText();
    }

    .isLike {
      color: @primary;
    }

    .commentContent {
      flex: 1;

      .commentMain {
        &:hover {
          .deleteComment {
            display: block;
          }
        }
      }

      .userInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .name {
          font-size: 16px;
          font-weight: 600;

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
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: @text-color;
        }
      }

      .comment-count {
        margin-top: 10px;
        font-size: 14px;
        color: @text-color;

        .like-count {
          margin-right: 10px;
        }
      }

      .formContent {
        margin-top: 10px;
        border: 1px solid @border-color;
        padding: 5px 20px 6px 20px;
        background-color: @bg-color-page;
        border-radius: 5px;
      }

      .deleteComment {
        margin-left: 10px;
        padding: 0;
      }

      .action {
        margin-top: 10px;

        .actionContent {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .likeAndReplay {
            height: 32px;
            line-height: 32px;
          }
        }

        .draftContent {
          padding-left: 0;
        }

        .cancelReplay {
          color: @primary;
        }
      }

      .commentChild {
        background-color: @layer;
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
            width: 35px;
            height: 35px;

            .image {
              width: 35px;
              height: 35px;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        .viewMore {
          display: flex;
          align-items: center;
          margin-top: 10px;
          cursor: pointer;
          .clickNoSelectText();

          .viewText {
            margin-right: 5px;
            padding-left: 55px;
          }
        }
      }
    }
  }
}
</style>
