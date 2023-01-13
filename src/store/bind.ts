import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult, ssnSetItem } from '@/utils';
import { BindUserRes } from '@/typings/comment';
import { userStore } from '@/store';

interface IParams {
  loading: boolean;
  bindUserIds: string[];
}

export const useBindAccountStore = defineStore('bindAccount', {
  state: (): IParams => ({
    loading: false,
    bindUserIds: [],
  }),

  actions: {
    // 绑定账户
    async bindAccount(params: { usernames: string[] }) {
      if (new Set(params.usernames).size !== params.usernames.length) {
        ElMessage.error('绑定用户名重复，请重新填写后再试');
        return;
      }

      try {
        this.loading = true;
        const res = normalizeResult<BindUserRes>(
          await Service.bindAccount({
            userId: userStore?.userId!,
            ...params,
          }),
        );
        this.loading = false;
        if (res.success) {
          const { notFindUsers, bindUserIds } = res.data;
          userStore.bindAccount = bindUserIds;
          ssnSetItem('bindAccount', JSON.stringify(bindUserIds));
          if (notFindUsers.length) {
            const notFindUsernames = notFindUsers.join('，');
            ElMessage({
              message: `${notFindUsernames}${notFindUsers.length}个用户不存在，请确认后再绑定`,
              type: 'info',
              duration: 5000,
            });
          } else {
            ElMessage.success(res.message);
          }
          return res.data;
        } else {
          ElMessage.error(res.message);
          return false;
        }
      } catch (error) {
        return false;
      }
    },
  },
});
