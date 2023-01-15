import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { CreateArticleParams } from '@/typings/comment';
import { normalizeResult } from '@/utils';

interface IProps {
  loading: boolean;
  id: string;
}

export const useCreateStore = defineStore('create', {
  state: (): IProps => ({
    loading: false,
    id: '',
  }),

  actions: {
    // 创建文章
    async createArticle(params: CreateArticleParams) {
      this.loading = true;
      try {
        const res = normalizeResult<{ id: string }>(await Service.createArticle(params));
        this.loading = false;
        if (res.success) {
          this.id = res.data.id;
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 更新文章
    async updateArticle(params: CreateArticleParams) {
      this.loading = true;
      try {
        const res = normalizeResult<{ id: string }>(await Service.updateArticle(params));
        this.loading = false;
        if (res.success) {
          this.id = res.data.id;
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    clearId() {
      this.id = '';
    },
  },
});
