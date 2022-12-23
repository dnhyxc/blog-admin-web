import { defineStore } from 'pinia';
import { LoginParams, UserInfoParams } from '@/typings/comment';
import { login } from '@/server/index';

export const useUserStore = defineStore('user', {
  state: (): UserInfoParams => ({
    token: localStorage.getItem('token'),
    userInfo: { username: '', password: '' },
  }),

  actions: {
    async onLogin(data: LoginParams) {
      try {
        const res = await login(data);
        this.token = res.data.token;
        localStorage.setItem('token', res.data.token);
      } catch (error) {
        throw error;
      }
    },

    onLogout() {
      this.token = '';
      this.userInfo = { username: '' };
      localStorage.removeItem('token');
    },
  },
});
