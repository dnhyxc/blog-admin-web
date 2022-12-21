import { defineStore } from 'pinia';
import { LoginParams } from '@/typings/comment';
import { login } from '@/server/index';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token'),
    userInfo: null,
    menuList: [], // 左侧菜单
  }),
  actions: {
    async login(data: LoginParams) {
      try {
        const token = await login(data);
        this.token = token;
        localStorage.setItem('token', token);
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.userInfo = null;
      localStorage.removeItem('token');
    },
  },
});
