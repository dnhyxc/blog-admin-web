import { defineStore } from 'pinia';
import { LoginParams, UserInfoParams } from '@/typings/comment';
import { login, register } from '@/server/index';
import { normalizeResult, encrypt } from '@/utils';
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore('user', {
  state: (): UserInfoParams => ({
    token: localStorage.getItem('token'),
    userId: '',
    username: '',
  }),

  actions: {
    // 账号注册
    async onRegister(data: LoginParams) {
      try {
        // 密码加密传到后端
        const password = encrypt(data.password);
        const res = normalizeResult<UserInfoParams>(
          await register({
            username: data.username,
            password,
          }),
        );
        if (res.success) {
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
        return res;
      } catch (error) {
        throw error;
      }
    },

    // 登录
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

    // 退出登录
    onLogout() {
      this.token = '';
      this.userId = '';
      this.username = '';
      localStorage.removeItem('token');
    },
  },
});
