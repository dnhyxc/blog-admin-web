// user store 属性声明
export interface LoginParams {
  username: string;
  password: string;
}

// 用户信息属性声明
export interface UserInfoParams {
  token: string | null;
  username: string;
  userId: string;
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
