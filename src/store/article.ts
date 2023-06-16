import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { PAGESIZE } from '@/constant';
import { ArticleListResult } from '@/typings/comment';
import { normalizeResult } from '@/utils';
import { userStore, uploadStore } from '@/store';

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
        const { auth, bindAccount, userId } = userStore;
        this.loading = true;
        if (auth !== 1 && !bindAccount?.length) {
          ElMessage.info('请先前往账号设置绑定前台账号');
          return;
        }
        const res = normalizeResult<ArticleListResult>(
          await Service.getArticleList({
            pageNo,
            pageSize: PAGESIZE,
            userId: userId!,
            authorIds: auth !== 1 ? bindAccount! : [],
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
    async batchDelArticle(params: {
      articleIds: string[];
      pageNo: number;
      classifys: string[];
      coverImages: string[];
    }) {
      console.log(params.coverImages, 'coverImages');

      if (!params.articleIds.length) {
        ElMessage.info('没有可删除的文章');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult<number>(
          await Service.batchDelArticle({
            ...params,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          await uploadStore.removeFile(params.coverImages);
          this.getArticleList(params.pageNo);
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
