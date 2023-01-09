import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { PAGESIZE } from '@/constant';
import { ArticleListResult } from '@/typings/comment';
import { normalizeResult } from '@/utils';
import { userStore } from '@/store';

interface IProps extends ArticleListResult {
  loading: boolean;
}

export const useArticleStore = defineStore('article', {
  state: (): IProps => ({
    list: [],
    total: 0,
    loading: false,
  }),

  getters: {},

  actions: {
    async getArticleList(pageNo: number) {
      try {
        this.loading = true;
        const res = normalizeResult<ArticleListResult>(
          await Service.getArticleList({
            pageNo,
            pageSize: PAGESIZE,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          const { list, total } = res.data;
          this.list = list;
          this.total = total;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 下架文章
    async removeArticle(articleIds: string[]) {
      if (!articleIds.length) {
        ElMessage.info('没有可下架的文章');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult<ArticleListResult>(
          await Service.removeArticle({
            articleIds,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          console.log(res.data, 'removeArticle');
          this.list.forEach((i) => {
            if (articleIds.includes(i.id)) {
              i.isDelete = true;
            }
          });
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 上架文章
    async shelvesArticle(articleIds: string[]) {
      if (!articleIds.length) {
        ElMessage.info('没有可上架的文章');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult<ArticleListResult>(
          await Service.shelvesArticle({
            articleIds,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          this.list.forEach((i) => {
            if (articleIds.includes(i.id)) {
              delete i.isDelete;
            }
          });
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 删除文章（支持批量删除）
    async batchDelArticle(articleIds: string[], pageNo: number) {
      if (!articleIds.length) {
        ElMessage.info('没有可删除的文章');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult<number>(
          await Service.batchDelArticle({
            articleIds,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          this.getArticleList(pageNo);
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 清除文章列表数据
    removeArticleList() {
      this.list = [];
      this.total = 0;
    },
  },
});
