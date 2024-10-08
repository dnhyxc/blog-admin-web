import { post, put } from '@/utils/request';
import { ssnGetItem } from '@/utils';
import {
  LoginParams,
  PageConfigParams,
  Params,
  CreateArticleParams,
  ManageCommentParams,
  ToolsParams,
  ThemesParams,
} from '@/typings/comment';
import * as API from './api';

// 处理请求参数，为请求自动加上userId
const copeParams = (params?: any) => {
  const userId = ssnGetItem('userId');
  const data = params?.userId ? params : { ...params, userId };
  return data;
};

// 自定义文件上传路径
export const uploadFile = async (params?: any) => {
  const res = await post(API.UPLOAD, params);
  return res;
};

// 删除文件
export const removeFile = async (url: string | string[]) => {
  const res = await post(API.REMOVE_FILE, copeParams({ url }));
  return res;
};

// 获取验证码
export const verifyCode = async (params: { id?: string }) => {
  return await post(API.VERIFY_CODE, params);
};

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

// 重置密码
export const resetPassword = async (params: { username: string; password: string }) => {
  const res = await put(API.RESET_PASSWORD, params);
  return res;
};

// 校验token是否过期
export const verify = async () => {
  try {
    const res = await post(API.VERIFY);
    return res;
  } catch (error) {
    throw error;
  }
};

// 获取用户信息
export const getUserInfo = async (params: { userId: string; auth?: number }) => {
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

// 更新用户信息
export const updateUserInfo = async (params: { username?: string; headUrl: string }) => {
  const res = await post(API.UPDATE_USER_INFO, copeParams(params));
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

// 获取文章详情
export const createArticle = async (params: CreateArticleParams) => {
  const res = await post(API.CREATE_ARTICLE, params);
  return res;
};

// 获取文章详情
export const updateArticle = async (params: CreateArticleParams) => {
  const res = await post(API.UPDATE_ARTICLE, params);
  return res;
};

// 获取文章详情
export const findArticleByCoverImage = async (params: { coverImage: string; authorId: string }) => {
  const res = await post(API.FIND_ARTICLE_BY_COVER_IMAGE, params);
  return res;
};

// 获取详情文章评论
export const getCommentList = async (params: { id: string }) => {
  const res = await post(API.GET_COMMENT_LIST, params);
  return res;
};

// 删除评论
export const deleteComment = async (params: ManageCommentParams) => {
  const res = await post(API.DELETE_COMMENT, params);
  return res;
};

// 作废评论
export const removeComment = async (params: ManageCommentParams) => {
  const res = await post(API.REMOVE_COMMENT, params);
  return res;
};

// 恢复评论
export const restoreComment = async (params: ManageCommentParams) => {
  const res = await post(API.RESTORE_COMMENT, params);
  return res;
};

// 获取评论列表
export const getArticlesComments = async (params: {
  pageNo: number;
  pageSize: number;
  userId: string;
  bindUsers: string[];
}) => {
  const res = await post(API.GET_ARTICLES_COMMENTS, params);
  return res;
};

// 分页获取留言列表
export const getInteractList = async (params: { pageNo: number; pageSize: number; userId: string }) => {
  const res = await post(API.GET_INTERACT_LIST, params);
  return res;
};

// 移除留言
export const removeInteracts = async (params: { ids: string | string[]; userId: string }) => {
  const res = await post(API.REMOVE_INTERACTS, params);
  return res;
};

// 恢复留言
export const restoreInteracts = async (params: { ids: string | string[]; userId: string }) => {
  const res = await post(API.RESTORE_INTERACTS, params);
  return res;
};

// 删除留言
export const delInteracts = async (params: { ids: string | string[]; userId: string }) => {
  const res = await post(API.DEL_INTERACTS, params);
  return res;
};

// 获取文章分类列表
export const createClassify = async (classifyName: string) => {
  const res = await post(API.CREATE_CLASSIFY, copeParams({ classifyName }));
  return res;
};

// 更新分类
export const updateClassify = async (classifyName: string) => {
  const res = await post(API.UPDATE_CLASSIFY, copeParams({ classifyName }));
  return res;
};

// 删除分类
export const deleteClassifys = async (ids: string | string[]) => {
  const res = await post(API.DELETE_CLASSIFYS, copeParams({ ids }));
  return res;
};

// 添加分类
export const addClassify = async (params: { id: string; bindUsers: string[]; type: string }) => {
  const res = await post(API.ADD_CLASSIFY, copeParams(params));
  return res;
};

// 获取文章分类列表
export const getClassifyList = async (params: { pageNo: number; pageSize: number }) => {
  const res = await post(API.GET_CLASSIFY_LIST, copeParams(params));
  return res;
};

// 添加工具
export const addTools = async (params: ToolsParams) => {
  const res = await post(API.ADD_TOOLS, copeParams(params));
  return res;
};

// 获取工具列表
export const getToolList = async (params: { pageNo: number; pageSize: number }) => {
  const res = await post(API.GET_TOOL_LIST, copeParams(params));
  return res;
};

// 更新工具
export const updateTools = async (params: ToolsParams) => {
  const res = await post(API.UPDATE_TOOLS, copeParams(params));
  return res;
};

// 删除
export const deleteTools = async (ids: string | string[]) => {
  const res = await post(API.DELETE_TOOLS, copeParams({ ids }));
  return res;
};

// 删除
export const getPageInfo = async (url: string) => {
  const res = await post(API.GET_PAGE_INFO, copeParams({ url }));
  return res;
};

// 文章统计
export const getArticlesStatistics = async () => {
  const res = await post(API.GET_ARTICLES_STATISTICS, copeParams({}));
  return res;
};

// 分类统计
export const getTagList = async (type: string) => {
  const res = await post(API.GET_TAG_LIST, copeParams({ type }));
  return res;
};

// 用户注册情况统计
export const getRegisterStatistics = async () => {
  const res = await post(API.GET_REGISTER_STATISTICS, copeParams({}));
  return res;
};

// 作者列表
export const getAuhthorList = async () => {
  const res = await post(API.GET_AUHTHOR_LIST, copeParams({}));
  return res;
};

// 获取博主信息
export const getAuthorInfo = async () => {
  const res = await post(API.GET_AUTHOR_INFO, copeParams({}));
  return res;
};

// 获取最受欢迎的文章
export const getPopularArticles = async () => {
  const res = await post(API.GET_POPULAR_ARTICLES, copeParams({}));
  return res;
};

// 获取主题
export const themes = async (params: ThemesParams) => {
  const res = await post(API.THEMES, copeParams(params));
  return res;
};

// 获取菜单权限
export const getUserMenuRoles = async (userId: string) => {
  const res = await post(API.GET_USER_MENU_ROLES, copeParams({ userId }));
  return res;
};

// 获取api调用次数
export const getApiCallsTotal = async () => {
  const res = await post(API.GET_API_CALLS_TOTAL, copeParams({}));
  return res;
};

// 获取api调用列表
export const getApiCalledList = async () => {
  const res = await post(API.GET_API_CALLED_LIST, copeParams({}));
  return res;
};

// 获取api每日调用次数
export const getApiCallsTotalByDay = async () => {
  const res = await post(API.GET_API_CALLS_TOTAL_BY_DAY, copeParams({}));
  return res;
};
