import moment from 'moment';
import { normalizeResult } from './result';
import { decrypt, encrypt } from './crypto';
import request from './request';

// 格式化时间
const formatDate = (date: number, format = 'YYYY/MM/DD HH:mm:ss') => {
  if (!date) return;

  return moment(date).format(format);
};

export { request, normalizeResult, decrypt, encrypt, formatDate };
