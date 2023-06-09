import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult, manageArticleStatistics } from '@/utils';
import { userStore } from '@/store';
import { ArticleStatistic, ArticleStatisticData, ArticleInfo } from '@/typings/comment';

interface IParams {
  loading: boolean;
  articleStatisticData: ArticleStatisticData | null;
  articleStatisticYears: string[];
  registerStatistic: { count: number; month: string }[];
  classifyList: { value: number; name: string }[];
  classifyTotal: number;
  classifyMaxItem: { value?: number; name?: string };
  tagTotal: number;
  tagMaxItem: { value?: number; name?: string };
  authors: { count?: number; authorName?: string }[];
  authorTotal: number;
  popularArticle: ArticleInfo | null;
  articleTotalCount: number;
}

export const useHomeStore = defineStore('home', {
  state: (): IParams => ({
    loading: false,
    // 文章统计数据
    articleStatisticData: null,
    // 文章统计年份
    articleStatisticYears: [],
    // 分类统计
    classifyList: [],
    // 分类总和
    classifyTotal: 0,
    // 实用最多的分类
    classifyMaxItem: {},
    // 当前年用户注册情况统计
    registerStatistic: [],
    // 作者人数统计
    authors: [],
    // 作者数总和
    authorTotal: 0,
    popularArticle: null,
    // 文章总数
    articleTotalCount: 0,
    // 标签总数
    tagTotal: 0,
    // 使用最多的标签
    tagMaxItem: {},
  }),

  actions: {
    // 文章统计
    async getArticlesStatistics() {
      if (!userStore?.userId) return;
      try {
        this.loading = true;
        const res = normalizeResult<ArticleStatistic[]>(await Service.getArticlesStatistics());
        this.loading = false;
        if (res.success) {
          const { years, dataSource, maxArticle, totalCount } = manageArticleStatistics(res.data);
          this.articleStatisticData = dataSource;
          this.articleStatisticYears = years;
          this.popularArticle = maxArticle;
          this.articleTotalCount = totalCount;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 用户当前年注册情况统计
    async getRegisterStatistics() {
      if (!userStore?.userId) return;
      try {
        this.loading = true;
        const res = normalizeResult<{ count: number; month: string }[]>(await Service.getRegisterStatistics());
        this.loading = false;
        if (res.success) {
          this.registerStatistic = res.data;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 分类统计
    async getClassifyList(type?: string) {
      if (!userStore?.userId) return;
      try {
        this.loading = true;
        const res = normalizeResult<{ value: number; name: string }[]>(await Service.getTagList(type || 'classify'));
        this.loading = false;
        if (res.success) {
          this.classifyList = res.data;
          this.classifyTotal = res.data.length;
          this.classifyMaxItem = res.data.reduce((max, cur) => (cur.value > max.value ? cur : max), {
            value: -Infinity,
          });
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 标签统计
    async getTagList(type?: string) {
      if (!userStore?.userId) return;
      try {
        this.loading = true;
        const res = normalizeResult<{ value: number; name: string }[]>(await Service.getTagList(type || 'tag'));
        this.loading = false;
        if (res.success) {
          this.tagTotal = res.data.length;
          this.tagMaxItem = res.data.reduce((max, cur) => (cur.value > max.value ? cur : max), {
            value: -Infinity,
          });
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 作者人数
    async getAuhthorList() {
      if (!userStore?.userId) return;
      try {
        this.loading = true;
        const res = normalizeResult<{ count: number; authorName: string }[]>(await Service.getAuhthorList());
        this.loading = false;
        if (res.success) {
          this.authors = res.data;
          const total = res.data.reduce((acc, cur) => acc + cur.count, 0);
          this.authorTotal = total;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },
  },
});
