import { defineStore } from 'pinia';
import { Params, UserListRes } from '@/typings/comment';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { ElMessage } from 'element-plus';
import { PAGESIZE } from '@/constant';
import { userStore } from '@/store';

interface IParams extends UserListRes {
  loading: boolean;
}

export const useAccountStore = defineStore('account', {
  state: (): IParams => ({
    list: [],
    total: 0,
    loading: false,
  }),

  actions: {
    // 获取账号列表
    async getAccountList(params: Params) {
      try {
        this.loading = true;
        const res = normalizeResult<UserListRes>(
          await Service.getAccountList({
            ...params,
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

    // 移除账号：1 删除，0 恢复
    async manageAccount(params: { userIds: string[]; type: number }) {
      if (!params.userIds.length) {
        ElMessage.info(params.type === 1 ? '没有可作废的账号' : '没有可恢复的账号');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult<{ userIds: string[] }>(await Service.deleteUsers(params));
        this.loading = false;
        if (res.success) {
          if (params.type === 1) {
            this.list.forEach((i) => {
              if (params.userIds.includes(i.id)) {
                i.isDelete = true;
              }
            });
          } else {
            this.list.forEach((i) => {
              if (params.userIds.includes(i.id)) {
                delete i.isDelete;
              }
            });
          }
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 批量删除账号
    async batchDeleteUser(params: { userIds: string[]; pageNo: number }) {
      if (!params.userIds.length) {
        ElMessage.info('没有可删除的账号');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult<{ userIds: string[] }>(await Service.batchDeleteUser(params));
        this.loading = false;
        if (res.success) {
          this.getAccountList({ pageNo: params.pageNo, pageSize: PAGESIZE, userId: userStore?.userId! });
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
