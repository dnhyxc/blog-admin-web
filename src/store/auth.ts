import { defineStore } from 'pinia';
import { AuthParams } from '@/typings/comment';

export const useAuthStore = defineStore('auth', {
  state: (): AuthParams => ({
    redirectUrl: '',
  }),
  actions: {
    setAuth(params: AuthParams) {
      console.log(params, 'params');

      this.redirectUrl = params.redirectUrl;
    },
  },
});
