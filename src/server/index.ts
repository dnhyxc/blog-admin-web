import { post } from '@/utils/request';
import { LoginParams, Params } from '@/typings/comment';
import * as API from './api';

// 登录
export const login = async (params: LoginParams) => {
  try {
    const res = await post(API.LOGIN, params);
    return res;
  } catch (error) {
    throw error;
  }
};

// 注册
export const register = async (params: LoginParams) => {
  try {
    const res = await post(API.REGISTER, params);
    return res;
  } catch (error) {
    throw error;
  }
};

// 获取账号列表
export const getAccountList = async (params: Params) => {
  const res = await post(API.GET_USER_LIST, params);
  return res;
};

// 批量删除账号
export const deleteUsers = async (params: { userIds: string[] }) => {
  const res = await post(API.DELETE_USERS, params);
  return res;
};
