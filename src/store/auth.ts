import { defineStore } from 'pinia';
import { AuthParams } from '@/typings/comment';

export const useAuthStore = defineStore('user', {
  state: (): AuthParams => ({
    redirectUrl: '',
  }),
  actions: {
    setAuth(params: AuthParams) {
      this.redirectUrl = params.redirectUrl;
    },
  },
});
