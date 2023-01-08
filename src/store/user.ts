import { defineStore } from 'pinia';
import { LoginParams, UserLoginParams, UserInfoParams } from '@/typings/comment';
import * as Service from '@/server';
import { normalizeResult, encrypt, locGetItem, locSetItem, locRemoveItem } from '@/utils';
import { ElMessage } from 'element-plus';

interface IProps extends UserLoginParams {
  userInfo: UserInfoParams;
  bindAccount: string[] | null | undefined;
}

export const useUserStore = defineStore('user', {
  state: (): IProps => ({
    token: locGetItem('token'),
    userId: locGetItem('userId'),
    username: locGetItem('username'),
    auth: Number(locGetItem('auth')), // 管理员权限
    registerTime: 0, // 注册时间
    bindAccount: JSON.parse(locGetItem('bindAccount')!),
    userInfo: { id: '', username: '' },
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
          const { token, userId, username, auth, registerTime, bindUserIds } = res.data;
          this.token = token;
          this.userId = userId;
          this.username = username;
          this.auth = auth;
          this.registerTime = registerTime;
          this.bindAccount = bindUserIds;
          locSetItem('token', token!);
          locSetItem('userId', userId!);
          locSetItem('username', username!);
          locSetItem('auth', JSON.stringify(auth!));
          locSetItem('bindAccount', JSON.stringify(bindUserIds!));
        } else {
          ElMessage.error(res.message);
        }
        return res;
      } catch (error) {
        throw error;
      }
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        const res = normalizeResult<UserInfoParams>(
          await Service.getUserInfo({
            userId: this.userId!,
          }),
        );
        if (res.success) {
          this.userInfo = res.data;
          this.bindAccount = res.data.bindUserIds;
          locSetItem('bindAccount', JSON.stringify(res.data.bindUserIds));
        }
        return res.data.bindUserIds;
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
      locRemoveItem('bindAccount');
    },
  },
});
