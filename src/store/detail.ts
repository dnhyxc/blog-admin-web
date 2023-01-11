import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { ArticleDetail } from '@/typings/comment';
import { normalizeResult } from '@/utils';
import { userStore } from '.';

interface IProps {
  loading: boolean;
  detail: ArticleDetail;
}

export const useDetailStore = defineStore('detail', {
  state: (): IProps => ({
    loading: false,
    detail: {},
  }),

  actions: {
    async getArticleDetail(id: string) {
      this.loading = true;
      try {
        const res = normalizeResult<ArticleDetail>(
          await Service.getArticleDetail({
            id,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          this.detail = { ...res.data };
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    clearDetail() {
      this.detail = {};
    },
  },
});
