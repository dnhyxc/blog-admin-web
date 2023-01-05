import { defineStore } from 'pinia';
import { LoginParams, UserLoginParams, UserInfoParams } from '@/typings/comment';
import * as Service from '@/server';
import { normalizeResult, encrypt, locGetItem, locSetItem, locRemoveItem } from '@/utils';
import { ElMessage } from 'element-plus';

interface IProps extends UserLoginParams {
  userInfo: any;
  bindAccount: string;
}

export const useUserStore = defineStore('user', {
  state: (): IProps => ({
    token: locGetItem('token'),
    userId: locGetItem('userId'),
    username: locGetItem('username'),
    auth: Number(locGetItem('auth')), // 管理员权限
    registerTime: 0, // 注册时间
    bindAccount: '',
    userInfo: {},
  }),

  actions: {
    // 账号注册
    async onRegister(data: LoginParams) {
      try {
        // 密码加密传到后端
        const password = encrypt(data.password);
        const res = normalizeResult<UserLoginParams>(
          await Service.register({
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
        const res = normalizeResult<UserLoginParams>(
          await Service.login({
            username: data.username,
            password,
          }),
        );
        if (res.success) {
          const { token, userId, username, auth, registerTime } = res.data;
          this.token = token;
          this.userId = userId;
          this.username = username;
          this.auth = auth;
          this.registerTime = registerTime;
          locSetItem('token', token!);
          locSetItem('userId', userId!);
          locSetItem('username', username!);
          locSetItem('auth', JSON.stringify(auth!));
        } else {
          ElMessage.error(res.message);
        }
        return res;
      } catch (error) {
        throw error;
      }
    },

    // 获取用户信息
    async getUserInfo(data: { userId: string }) {
      try {
        const res = normalizeResult<UserInfoParams>(
          await Service.getUserInfo({
            userId: data.userId,
          }),
        );
        if (res.success) {
          this.userInfo = res.data;
        }
        return res.data;
      } catch (error) {
        throw error;
      }
    },

    // 退出登录
    onLogout() {
      this.token = '';
      this.userId = '';
      this.username = '';
      this.auth = 0;
      this.registerTime = 0;
      locRemoveItem('token');
      locRemoveItem('userId');
      locRemoveItem('username');
      locRemoveItem('auth');
    },
  },
});
