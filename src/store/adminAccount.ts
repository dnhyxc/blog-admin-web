import { defineStore } from 'pinia';
import { Params, UserListRes } from '@/typings/comment';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { ElMessage } from 'element-plus';

interface IParams extends UserListRes {
  loading: boolean;
}

export const useAdminAccountStore = defineStore('adminAccount', {
  state: (): IParams => ({
    list: [],
    total: 0,
    loading: false,
  }),

  actions: {
    // 获取账号列表
    async getAdminUserList(params: Params) {
      try {
        this.loading = true;
        const res = normalizeResult<UserListRes>(await Service.getAdminUserList(params));
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

    // 移除账号
    async removeAccount(params: { userIds: string[]; type: number }) {
      try {
        this.loading = true;
        const res = normalizeResult<{ userIds: string[] }>(await Service.deleteUsers(params));
        this.loading = false;
        if (res.success) {
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 批量删除账号
    async batchDeleteUser(params: { userIds: string[] }) {
      try {
        this.loading = true;
        const res = normalizeResult<{ userIds: string[] }>(await Service.batchDeleteUser(params));
        this.loading = false;
        if (res.success) {
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 设置权限
    async setAuth(params: { userId: string; auth: number }) {
      try {
        this.loading = true;
        const res = normalizeResult<{ userId: string }>(await Service.setAuth(params));
        this.loading = false;
        if (res.success) {
          ElMessage.success(res.message);
          return true;
        } else {
          ElMessage.error(res.message);
          return false;
        }
      } catch (error) {
        throw error;
      }
    },
  },
});
