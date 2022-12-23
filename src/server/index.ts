import { post } from '@/utils/request';
import { LoginParams } from '@/typings/comment';
import * as API from './api';

export const login = async (params: LoginParams) => {
  const res = await post(API.LOGIN, params);
  return res;
};
