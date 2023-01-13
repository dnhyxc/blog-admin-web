import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { CommentParams, ManageCommentParams } from '@/typings/comment';
import { normalizeResult } from '@/utils';

interface IProps {
  loading: boolean;
  comments: CommentParams[];
}

export const useCommentStore = defineStore('comment', {
  state: (): IProps => ({
    loading: false,
    comments: [],
  }),

  actions: {
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

    // 删除详情对应的文章评论
    async deleteComment(params: ManageCommentParams, id: string) {
      this.loading = true;
      try {
        const res = normalizeResult<string>(await Service.deleteComment(params));
        this.loading = false;
        if (res.success) {
          this.getCommentList(id);
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 作废详情对应的文章评论
    async removeComment(params: ManageCommentParams, id: string) {
      this.loading = true;
      try {
        const res = normalizeResult<string>(await Service.removeComment(params));
        this.loading = false;
        if (res.success) {
          this.getCommentList(id);
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 恢复详情对应的文章评论
    async restoreComment(params: ManageCommentParams, id: string) {
      this.loading = true;
      try {
        const res = normalizeResult<string>(await Service.restoreComment(params));
        this.loading = false;
        if (res.success) {
          this.getCommentList(id);
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },
  },
});
