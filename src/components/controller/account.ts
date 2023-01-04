// 账号管理数据处理
import * as Service from '@/server';

// 获取账号列表
export const getAccountList = async (params: { pageNo: number; pageSize: number; userId: string }) => {
  const res = await Service.getAccountList(params);
  return res;
};
