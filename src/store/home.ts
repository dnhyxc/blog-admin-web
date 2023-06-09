import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult, manageArticleStatistics } from '@/utils';
import { userStore } from '@/store';

interface IParams {
  loading: boolean;
  articleStatisticData: any;
  articleStatisticYears: string[];
  registerStatistic: { count: number; month: string }[];
  classifyList: { value: number; name: string }[];
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
    // 当前年用户注册情况统计
    registerStatistic: [],
  }),

  actions: {
    // 文章统计
    async getArticlesStatistics() {
      if (!userStore?.userId) return;
      try {
        this.loading = true;
        const res = normalizeResult<any>(await Service.getArticlesStatistics());
        this.loading = false;
        if (res.success) {
          const { years, dataSource } = manageArticleStatistics(res.data);
          this.articleStatisticData = dataSource;
          this.articleStatisticYears = years;
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
          console.log(res.data, 'dataaaaaaaaaaaaaaaaaaaaa');
          this.registerStatistic = res.data;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 文章统计
    async getTagList(type?: string) {
      if (!userStore?.userId) return;
      try {
        this.loading = true;
        const res = normalizeResult<{ value: number; name: string }[]>(await Service.getTagList(type || 'classify'));
        this.loading = false;
        if (res.success) {
          this.classifyList = res.data;
          console.log(this.classifyList, 'classifyList');
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },
  },
});
