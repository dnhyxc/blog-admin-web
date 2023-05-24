import moment from 'moment';
import { EMOJI_TEXTS, EMOJI_URLS } from '@/constant';
import { normalizeResult } from './result';
import { decrypt, encrypt } from './crypto';
import request from './request';
import { locSetItem, locGetItem, locRemoveItem, ssnGetItem, ssnSetItem, ssnRemoveItem } from './storage';

// 格式化时间
const formatDate = (date: number, format = 'YYYY/MM/DD HH:mm:ss') => {
  if (!date) return;

  return moment(date).format(format);
};

// 转化距离当前时间的间隔时长
const formatGapTime = (date: number) => {
  const ms = Date.now() - date;
  const seconds = Math.round(ms / 1000);
  const minutes = Math.round(ms / 60000);
  const hours = Math.round(ms / 3600000);
  const days = Math.round(ms / 86400000);
  const months = Math.round(ms / 2592000000);
  const years = Math.round(ms / 31104000000);

  switch (true) {
    case seconds < 60:
      return '刚刚';
    case minutes < 60:
      return `${minutes} 分钟前`;
    case hours < 24:
      return `${hours} 小时前`;
    case days < 30:
      return `${days} 天前`;
    case months < 12:
      return `${months} 月前`;
    default:
      return `${years} 年前`;
  }
};

// 滚动到某位置
const scrollTo = (ref: any, position: number, time = 20) => {
  // el-scrollbar 容器
  const el = ref.value?.wrapRef as HTMLDivElement;
  // 使用requestAnimationFrame，如果没有则使用setTimeOut
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
      return setTimeout(callback, time);
    };
  }
  // 获取当前元素滚动的距离
  let scrollTopDistance = el.scrollTop;
  const smoothScroll = () => {
    // 如果你要滚到顶部，那么position传过来的就是0，下面这个distance肯定就是负值。
    const distance = position - scrollTopDistance;
    // 每次滚动的距离要不一样，制造一个缓冲效果
    scrollTopDistance = scrollTopDistance + distance / 5;
    // 判断条件
    if (Math.abs(distance) < 1) {
      el.scrollTop = position;
    } else {
      el.scrollTop = scrollTopDistance;
      requestAnimationFrame(smoothScroll);
    }
  };
  requestAnimationFrame(smoothScroll);
};

// 处理输入的换行符
export const replaceCommentContent = (content: string) => {
  const context = content.replace(/\n/g, '<br/>');
  return replaceEmojis(context);
};

// 表情包转换
export const replaceEmojis = (content: string) => {
  content = content.replace(/\[[^[^\]]+\]/g, (word) => {
    const index = EMOJI_TEXTS.indexOf(word.replace('[', '').replace(']', ''));
    if (index > -1) {
      return `<img style="vertical-align: middle;width: 32px;height: 32px" src="${
        // @ts-ignore
        EMOJI_URLS[index + 1]
      }" title="${word}"/>`;
    } else {
      return word;
    }
  });
  return replacePictures(content);
};

// 图片转换
export const replacePictures = (content: string) => {
  content = content.replace(/<[^<^>]+>/g, (word) => {
    const index = word.indexOf(',');
    if (index > -1) {
      const arr = word.replace('<', '').replace('>', '').split(',');
      return `<img id="__COMMENT_IMG__" style="border-radius: 5px;width: 100%;max-width: 250px;height:auto;display: block;padding: 5px 0;cursor: pointer;" src="${arr[1]}" title="${arr[0]}"/>`;
    } else {
      return word;
    }
  });
  return content;
};

export {
  request,
  normalizeResult,
  decrypt,
  encrypt,
  formatDate,
  locSetItem,
  locGetItem,
  locRemoveItem,
  ssnGetItem,
  ssnSetItem,
  ssnRemoveItem,
  formatGapTime,
  scrollTo,
};
