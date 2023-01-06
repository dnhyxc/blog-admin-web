import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { PageConfig } from '@/typings/comment';
import { userStore } from '@/store';

interface IParams {
  loading: boolean;
}

export const usePageConfigStore = defineStore('pageConfig', {
  state: (): IParams => ({
    loading: false,
  }),

  actions: {
    // 绑定账户
    async setPageConfig(params: PageConfig) {
      try {
        this.loading = true;
        const res = normalizeResult<any>(
          await Service.pageConfig({ ...params, userId: userStore?.userId!, bindUserIds: userStore.bindAccount! }),
        );

        console.log(res, 'res');

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
  },
});
