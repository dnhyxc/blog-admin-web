import { defineStore } from 'pinia';
import { Params, UserListRes } from '@/typings/comment';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { ElMessage } from 'element-plus';

export const useAccountStore = defineStore('account', {
  state: (): UserListRes => ({
    list: [],
    total: 0,
  }),

  actions: {
    // 账号注册
    async getAccountList(params: Params) {
      try {
        // 密码加密传到后端
        const res = normalizeResult<UserListRes>(await Service.getAccountList(params));
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
  },
});
