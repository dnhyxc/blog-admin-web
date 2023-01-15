import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { CommentParams, ArticleItem } from '@/typings/comment';
import { normalizeResult } from '@/utils';
import { PAGESIZE } from '@/constant';
import { userStore } from '.';

interface IProps {
  loading: boolean;
  comments: CommentParams[];
  articleList: {
    list: ArticleItem[];
    total: number;
  };
}

export const useCommentStore = defineStore('comment', {
  state: (): IProps => ({
    loading: false,
    comments: [], // 详情评论
    articleList: {
      list: [],
      total: 0,
    },
  }),

  actions: {
    // 获取评论列表
    async getArticlesComments(params: { pageNo: number }) {
      this.loading = true;
      try {
        const res = normalizeResult<{ list: ArticleItem[]; total: number }>(
          await Service.getArticlesComments({ ...params, pageSize: PAGESIZE, userId: userStore?.userId! }),
        );
        this.loading = false;
        if (res.success) {
          this.articleList = {
            list: [...this.articleList.list, ...res.data.list],
            total: res.data.total,
          };
          return res.data;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 获取详情对应的文章评论
    async getCommentList(id: string) {
      this.loading = true;
      try {
        const res = normalizeResult<CommentParams[]>(await Service.getCommentList({ id }));
        this.loading = false;
        if (res.success) {
          this.comments = res.data;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 处理参数
    manageParams(data: { comment: CommentParams; articleId: string; isThreeTier?: boolean }) {
      const { comment, articleId, isThreeTier } = data;
      const params = isThreeTier
        ? {
            commentId: comment.commentId!,
            fromCommentId: comment.commentId!,
            articleId,
          }
        : {
            commentId: comment.commentId!,
            articleId,
          };
      return params;
    },

    // 删除详情对应的文章评论
    async deleteComment(data: { comment: CommentParams; articleId: string; isThreeTier?: boolean }) {
      const { comment, articleId, isThreeTier } = data;
      const params = this.manageParams({ comment, articleId, isThreeTier });
      this.loading = true;
      try {
        const res = normalizeResult<string>(await Service.deleteComment(params));
        this.loading = false;
        if (res.success) {
          this.getCommentList(articleId);
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 作废详情对应的文章评论
    async removeComment(data: { comment: CommentParams; articleId: string; isThreeTier?: boolean }) {
      const { comment, articleId, isThreeTier } = data;
      console.log(isThreeTier, 'isThreeTier');

      const params = this.manageParams({ comment, articleId, isThreeTier });
      this.loading = true;
      try {
        const res = normalizeResult<string>(await Service.removeComment(params));
        this.loading = false;
        if (res.success) {
          this.getCommentList(articleId);
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 恢复详情对应的文章评论
    async restoreComment(data: { comment: CommentParams; articleId: string; isThreeTier?: boolean }) {
      const { comment, articleId, isThreeTier } = data;
      const params = this.manageParams({ comment, isThreeTier, articleId });
      this.loading = true;
      try {
        const res = normalizeResult<string>(await Service.restoreComment(params));
        this.loading = false;
        if (res.success) {
          this.getCommentList(articleId);
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 清除评论
    clearComment() {
      this.comments = [];
    },
  },
});
