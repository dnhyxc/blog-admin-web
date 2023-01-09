import { defineStore } from 'pinia';
import { Params, UserListRes } from '@/typings/comment';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { ElMessage } from 'element-plus';
import { PAGESIZE } from '@/constant';
import { userStore } from '.';

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

    // 废除、恢复账号
    async manageAccount(params: { userIds: string[]; type: number }) {
      try {
        this.loading = true;
        const res = normalizeResult<{ userIds: string[] }>(await Service.manageAdminUsers(params));
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
                i.isDelete = false;
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

    // 批量删除后台账号
    async deleteAdminUsers(params: { userIds: string[]; pageNo: number }) {
      try {
        this.loading = true;
        const res = normalizeResult<{ userIds: string[] }>(await Service.deleteAdminUsers(params));
        this.loading = false;
        if (res.success) {
          console.log(params.pageNo, '-----');

          this.getAdminUserList({ pageNo: params.pageNo, pageSize: PAGESIZE, userId: userStore?.userId! });
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 设置后台账户权限
    async setAdminUserAuth(params: { userId: string; auth: number }) {
      try {
        this.loading = true;
        const res = normalizeResult<{ userId: string }>(await Service.setAdminUserAuth(params));
        this.loading = false;
        if (res.success) {
          this.list.forEach((i) => {
            if (i.id === params.userId) {
              i.auth = params.auth;
            }
          });
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
