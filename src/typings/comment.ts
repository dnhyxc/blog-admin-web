// user store 属性声明
export interface LoginParams {
  username: string;
  password: string;
}

// 用户信息属性声明
export interface UserInfoParams {
  token: string | null;
  userInfo: {
    username: string;
    password?: string;
    avatar?: string;
  };
}

// auth store 属性声明
export interface AuthParams {
  redirectUrl: string;
}
