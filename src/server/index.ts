import { post } from '@/utils/request';
import { LoginParams, PageConfigParams, Params } from '@/typings/comment';
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

// 获取用户信息
export const getUserInfo = async (params: { userId: string }) => {
  try {
    const res = await post(API.GET_USER_INFO, params);
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

// 批量移除账号 type: 0 恢复，1 删除
export const deleteUsers = async (params: { userIds: string[]; type: number }) => {
  const res = await post(API.UPDATE_USERS, params);
  return res;
};

// 批量作废、恢复后台账号 type: 0 恢复，1 删除
export const manageAdminUsers = async (params: { userIds: string[]; type: number }) => {
  const res = await post(API.MANAGE_ADMIN_USERS, params);
  return res;
};

// 批量删除后台账号
export const deleteAdminUsers = async (params: { userIds: string[] }) => {
  const res = await post(API.DELETE_ADMIN_USERS, params);
  return res;
};

// 批量删除账号
export const batchDeleteUser = async (params: { userIds: string[] }) => {
  const res = await post(API.BATCH_DELETE_USER, params);
  return res;
};

// 设置权限
export const setAuth = async (params: { auth: number; userId: string }) => {
  const res = await post(API.SET_AUTH, params);
  return res;
};

// 设置权限
export const setAdminUserAuth = async (params: { auth: number; userId: string }) => {
  const res = await post(API.SET_ADMIN_USER_AUTH, params);
  return res;
};

// 获取后台账号列表
export const getAdminUserList = async (params: Params) => {
  const res = await post(API.GET_ADMIN_USER_LIST, params);
  return res;
};

// 绑定账户
export const bindAccount = async (params: { userId: string; usernames: string[] }) => {
  const res = await post(API.BIND_ACCOUNT, params);
  return res;
};

// 主题设置
export const pageConfig = async (params: PageConfigParams) => {
  const res = await post(API.PAGE_CONFIG, params);
  return res;
};

// 主题设置
export const getBindUsers = async (params: { userIds: string[]; userId: string }) => {
  const res = await post(API.FIND_BIND_USERS, params);
  return res;
};

// 获取文章列表
export const getArticleList = async (params: Params) => {
  const res = await post(API.ARTICLE_LIST, params);
  return res;
};

// 下架文章
export const removeArticle = async (params: { articleIds: string[]; userId: string }) => {
  const res = await post(API.REMOVE_ARTICLE, params);
  return res;
};

// 上架文章
export const shelvesArticle = async (params: { articleIds: string[]; userId: string }) => {
  const res = await post(API.SHELVES_ARTICLE, params);
  return res;
};

// 批量删除文章
export const batchDelArticle = async (params: { articleIds: string[]; userId: string }) => {
  const res = await post(API.BATCH_DEL_ARTICLE, params);
  return res;
};

// 获取文章详情
export const getArticleDetail = async (params: { id: string; userId: string }) => {
  const res = await post(API.ARTICLE_DETAIL, params);
  return res;
};
