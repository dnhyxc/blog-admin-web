import { defineStore } from 'pinia';
import { Params, UserListRes, UserInfoParams } from '@/typings/comment';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { ElMessage } from 'element-plus';
import { PAGESIZE } from '@/constant';
import { userStore } from '@/store';

interface IParams extends UserListRes {
  loading: boolean;
  pageNo: number;
  pageSize: number;
  userList: UserInfoParams[];
}

export const useAccountStore = defineStore('account', {
  state: (): IParams => ({
    list: [],
    total: 0,
    loading: false,
    pageNo: 0,
    pageSize: PAGESIZE,
    userList: [],
  }),

  actions: {
    // 滚动获取用户列表
    async getUserListByScroll(keyword?: string) {
      if (this.userList.length !== 0 && this.userList.length >= this.total) return;
      this.pageNo = this.pageNo + 1;
      this.loading = true;

      const params: Params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };

      if (keyword) {
        params.keyword = keyword;
      }

      const res = normalizeResult<UserListRes>(await Service.getAccountList(params));
      this.loading = false;
      if (res.success) {
        this.userList = [...this.userList, ...res.data.list];
        this.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    },

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
          return true;
        } else {
          ElMessage.error(res.message);
          return false;
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
    async setAuth(params: { userId: string; auth: number; menus: { key: string; name: string }[] }) {
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

    // 获取用户菜单权限
    async getUserMenuRoles(userId: string) {
      console.log(userId, 'userId');

      try {
        const res = normalizeResult<{ id: string; menus: { key: string; name: string }[] }>(
          await Service.getUserMenuRoles(userId),
        );
        console.log(res, '>>>>>>>menus');

        if (res.success) {
          return res.data?.menus;
        }
      } catch (error) {
        throw error;
      }
    },

    // 搜索时重新更新用户列表
    updateUserList(keyword: string) {
      const findUser = this.userList.filter((i) => i.username.includes(keyword));
      this.userList = findUser;
    },

    clearUserListInfo() {
      this.pageNo = 0;
      this.userList = [];
      this.total = 0;
    },
  },
});
