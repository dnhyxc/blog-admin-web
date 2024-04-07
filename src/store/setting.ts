import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { userStore } from '@/store';
import { UserInfoParams } from '@/typings/comment';

interface bindUserInfoPrams {
  username: string;
  userId: string;
}

interface IParams {
  loading: boolean;
  bindUserInfo: bindUserInfoPrams[];
  bindUsernames: string[];
}

export const useSettingStore = defineStore('setting', {
  state: (): IParams => ({
    loading: false,
    bindUserInfo: [],
    bindUsernames: [],
  }),

  actions: {
    // 绑定账户
    async getBindUserInfo() {
      try {
        this.loading = true;
        await userStore.getUserInfo();
        const res = normalizeResult<bindUserInfoPrams[]>(
          await Service.getBindUsers({
            userId: userStore?.userId!,
            userIds: userStore?.bindAccount!,
          }),
        );

        this.loading = false;
        this.bindUserInfo = res.data;

        if (res.success) {
          return res;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 修改用户信息
    async updateUserInfo(params: { username: string; headUrl: string }) {
      this.loading = true;
      const res = normalizeResult<UserInfoParams>(await Service.updateUserInfo(params));
      this.loading = false;
      if (res.success) {
        ElMessage.success(res.message);
        userStore.updateUserInfo({
          username: res.data.username,
          headUrl: res.data.headUrl,
        } as UserInfoParams);
      } else {
        ElMessage.error(res.message);
      }
    },

    // 设置修改的绑定信息
    setBindUsernames(params: bindUserInfoPrams[]) {
      this.bindUserInfo = params;
    },

    // 清除绑定用户名
    onReset() {
      this.bindUserInfo = [];
      this.bindUsernames = [];
    },
  },
});
