import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { PageConfig, ThemesParams } from '@/typings/comment';
import { userStore } from '@/store';

interface IParams {
  loading: boolean;
  themes: ThemesParams[];
}

export const usePageConfigStore = defineStore('pageConfig', {
  state: (): IParams => ({
    loading: false,
    themes: [],
  }),

  actions: {
    // 绑定账户
    async setPageConfig(params: PageConfig) {
      try {
        this.loading = true;
        const res = normalizeResult<any>(
          await Service.pageConfig({ ...params, userId: userStore?.userId!, bindUserIds: userStore.bindAccount! }),
        );

        this.loading = false;
        if (res.success) {
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 添加主题
    async addThemes(params: ThemesParams) {
      const res = normalizeResult<ThemesParams>(await Service.themes(params));
      console.log(res, '>>>>>res');

      if (res.success) {
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    },
  },
});
