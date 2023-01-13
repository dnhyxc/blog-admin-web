<!--
 * 评论组件
 * @author: dnhyxc
 * @since: 2023-01-13
 * index.vue
-->
<template>
  <div class="Comments">
    <div v-if="commentStore.comments?.length > 0" class="title">
      全部评论
      <span class="replyCount">{{ getCommentCount(commentStore.comments) }}</span>
    </div>
    <div v-for="i in commentStore.comments" :key="i.commentId" class="commentWrap">
      <div class="avatar">
        <el-avatar class="image" fit="cover" :src="IMAGES.sea" @error="errorHandler">
          <img :src="i.headUrl || IMAGES.sea" />
        </el-avatar>
      </div>
      <div class="commentContent">
        <div class="commentMain">
          <div class="userInfo">
            <span class="name">{{ i.username }}</span>
            <div class="date">
              {{ formatGapTime(i.date) }}
              <el-button v-if="i?.isDelete" type="primary" link class="deleteComment" @click="onRestoreComment(i)">
                恢复评论
              </el-button>
              <el-button v-else type="warning" link class="deleteComment" @click="onRemoveComment(i, true)">
                作废评论
              </el-button>
              <el-button type="danger" link class="deleteComment" @click="onDeleteComment(i)">删除评论</el-button>
            </div>
          </div>
          <div class="desc">{{ i.content }}</div>
        </div>
        <div v-if="i.replyList && i.replyList?.length! > 0" class="commentChild">
          <div v-for="j in checkReplyList(i.replyList, i.commentId!)" :key="j.commentId" class="commentChildItem">
            <div class="avatar">
              <el-avatar class="image" fit="cover" :src="IMAGES.sea" @error="errorHandler" @click="() => {}">
                <img :src="j.headUrl || IMAGES.sea" />
              </el-avatar>
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
                  {{ formatGapTime(j.date) }}
                  <el-button
                    v-if="j?.isDelete"
                    type="primary"
                    link
                    class="deleteComment"
                    @click="onRestoreComment(j, true)"
                  >
                    恢复评论
                  </el-button>
                  <el-button v-else type="warning" link class="deleteComment" @click="onRemoveComment(j, true)">
                    作废评论
                  </el-button>
                  <el-button type="danger" link class="deleteComment" @click="onDeleteComment(j, true)">
                    删除评论
                  </el-button>
                </div>
              </div>
              <div v-if="j.content" class="desc">{{ j.content }}</div>
              <div v-if="j.formContent" class="formContent">
                {{ `“${j.formContent}”` }}
              </div>
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
import { ref, onMounted } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { IMAGES } from '@/constant';
import { formatGapTime } from '@/utils';
import { CommentParams, ManageCommentParams } from '@/typings/comment';
import { commentStore } from '@/store';
import Message from '@/components/Message/index.vue';

const viewMoreComments = ref<string[]>([]);
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const deleteParams = ref<ManageCommentParams>({
  commentId: '',
  articleId: '',
});

const props = defineProps<{ authorId: string; articleId: string }>();

onMounted(() => {
  console.log(props.articleId, 'props.articleId');
  if (props.articleId) {
    commentStore.getCommentList(props.articleId);
  }
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
const onRemoveComment = (comment: CommentParams, isThreeTier?: boolean) => {
  console.log(comment, '作废');
  if (!props.articleId) return;
  const params = isThreeTier
    ? {
        commentId: comment.commentId!,
        fromCommentId: comment.commentId!,
        articleId: props.articleId,
      }
    : {
        commentId: comment.commentId!,
        articleId: props.articleId,
      };
  commentStore.removeComment(params, props.articleId);
};

// 恢复评论
const onRestoreComment = (comment: CommentParams, isThreeTier?: boolean) => {
  console.log(comment, '恢复评论');
  if (!props.articleId) return;
  const params = isThreeTier
    ? {
        commentId: comment.commentId!,
        fromCommentId: comment.commentId!,
        articleId: props.articleId,
      }
    : {
        commentId: comment.commentId!,
        articleId: props.articleId,
      };
  commentStore.restoreComment(params, props.articleId);
};

// 删除评论
const onDeleteComment = (comment: CommentParams, isThreeTier?: boolean) => {
  console.log(comment, '删除评论');
  if (!props.articleId) return;
  const params = isThreeTier
    ? {
        commentId: comment.commentId!,
        fromCommentId: comment.commentId!,
        articleId: props.articleId,
      }
    : {
        commentId: comment.commentId!,
        articleId: props.articleId,
      };
  deleteParams.value = params;
  messageVisible.value = true;
};

// 确认删除评论
const onSubmitDelete = async () => {
  commentStore.deleteComment(deleteParams.value, props.articleId);
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

// 图片加载失败事件
const errorHandler = () => true;
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.Comments {
  background-color: @fff;
  padding: 0 20px 20px 20px;
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
