import { defineStore } from 'pinia';
import { LoginParams, UserInfoParams } from '@/typings/comment';
import { login } from '@/server/index';
import { normalizeResult, encrypt } from '@/utils';
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore('user', {
  state: (): UserInfoParams => ({
    token: localStorage.getItem('token'),
    userId: '',
    username: '',
  }),

  actions: {
    async onLogin(data: LoginParams) {
      try {
        // 密码加密传到后端
        const password = encrypt(data.password);
        const res = normalizeResult<UserInfoParams>(
          await login({
            username: data.username,
            password,
          }),
        );
        if (res.success) {
          const { token, userId, username } = res.data;
          this.token = token;
          this.userId = userId;
          this.username = username;
          localStorage.setItem('token', res.data.token!);
        } else {
          ElMessage.error(res.message);
        }
        return res;
      } catch (error) {
        throw error;
      }
    },

    onLogout() {
      this.token = '';
      this.userId = '';
      this.username = '';
      localStorage.removeItem('token');
    },
  },
});
