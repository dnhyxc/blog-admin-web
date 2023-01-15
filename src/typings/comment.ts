// 菜单类型
export interface MenuListParams<T> {
  name: string;
  key: string;
  path: string;
  icon: T;
}

// user store 属性声明
export interface LoginParams {
  username: string;
  password: string;
}

// 用户信息属性声明
export interface UserLoginParams {
  token: string | null;
  username: string | null;
  userId: string | null;
  auth: number | null;
  registerTime: number;
  bindUsernames?: string[];
  bindUserIds?: string[];
}

// auth store 属性声明
export interface AuthParams {
  redirectUrl: string;
}

// 用户注册返回参数
export interface registerRes {
  username: string;
  userId: string;
  token?: string;
  job?: string;
  motto?: string;
  introduce?: string;
  headUrl?: string;
  github?: string;
  juejin?: string;
  zhihu?: string;
  blog?: string;
  mainCover?: string;
}

// 用户信息
export interface UserInfoParams {
  id: string;
  username: string;
  token?: string;
  job?: string;
  motto?: string;
  introduce?: string;
  headUrl?: string;
  github?: string;
  juejin?: string;
  zhihu?: string;
  blog?: string;
  mainCover?: string;
  articleTotal?: string;
  registerTime?: number;
  bindUserIds?: string[];
  isDelete?: boolean;
  auth?: number;
}

// 用户列表相应参数
export interface UserListRes {
  list: UserInfoParams[];
  total: number;
}

// 获取用户列表参数
export interface Params {
  pageNo: number;
  pageSize: number;
  userId?: string;
}

// 主题设置参数
export interface PageConfig {
  layout: number;
  layoutSet: number;
  cardLayout: number;
  coverImgs?: string[];
}

// 主题设置接口传参
export interface PageConfigParams {
  layout: number;
  layoutSet: number;
  cardLayout: number;
  userId: string;
  bindUserIds: string[];
  coverImgs?: string[];
}

// 绑定用户信息返回结果
export interface BindUserRes {
  notFindUsers: string[];
  findUsernames: string[];
  bindUserIds: string[];
}

// 评论参数
export interface CommentParams {
  commentId?: string;
  articleId?: string;
  userId?: string;
  username?: string;
  date?: number;
  content?: string;
  fromUserId?: string;
  likeCount?: number;
  replyCount?: number;
  headUrl?: string;
  fromUsername?: string;
  formContent?: string;
  replyList?: CommentParams[];
  fromCommentId?: string;
  isLike?: boolean;
  isDelete?: boolean;
  _id?: string; // 评论列表子级 commentId
  id?: string; // 评论列表父级 commentId
}

// 评论列表返回
export interface CommentListParams {
  comments: CommentParams[];
  count: number;
  articleId: string;
}

// 文章详情
export interface ArticleItem {
  abstract: string;
  authorId: string;
  authorName: string;
  classify: string;
  content?: string;
  coverImage: string;
  createTime: number;
  id: string;
  tag: string;
  title: string;
  isDelete?: boolean;
  commentList?: CommentListParams;
}

// 文章列表
export interface ArticleListResult {
  list: ArticleItem[];
  total: number;
}

// 文章详情返回
export interface ArticleDetail {
  id?: string;
  title?: string;
  content?: string;
  classify?: string;
  tag?: string;
  abstract?: string;
  createTime?: number;
  authorId?: string;
  coverImage?: string;
  headUrl?: string;
  likeCount?: number;
  isLike?: number;
  authorName?: string;
  originalArticleId?: string;
  readCount?: number;
}

// 发布文章参数

export interface CreateArticleParams {
  title?: string;
  content?: string;
  classify?: string;
  tag?: string;
  coverImage?: string;
  abstract?: string;
  createTime: number;
  authorId: string;
  userId?: string;
  articleId?: string;
  authorName?: string;
}

// 删除、恢复评论传参
export interface ManageCommentParams {
  commentId: string;
  articleId: string;
  fromCommentId?: string;
}
