import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult, locSetItem } from '@/utils';
import { userStore } from '@/store';

interface IParams {
  loading: boolean;
}

export const useBindAccountStore = defineStore('bindAccount', {
  state: (): IParams => ({
    loading: false,
  }),

  actions: {
    // 绑定账户
    async bindAccount(params: { userId: string; usernames: string[] }) {
      if (new Set(params.usernames).size !== params.usernames.length) {
        ElMessage.error('绑定用户名重复，请重新填写后再试');
        return;
      }

      try {
        this.loading = true;
        const res = normalizeResult<{ notFindUsers: string[]; findUsernames: string[] }>(
          await Service.bindAccount(params),
        );
        this.loading = false;
        if (res.success) {
          const { notFindUsers, findUsernames } = res.data;
          userStore.bindAccount = findUsernames;
          locSetItem('bindAccount', JSON.stringify(findUsernames));
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
          return true;
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
