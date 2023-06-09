import moment from 'moment';
import SparkMD5 from 'spark-md5';
import { EMOJI_TEXTS, EMOJI_URLS } from '@/constant';
import { ArticleStatistic, ArticleStatisticData, ArticleInfo } from '@/typings/comment';
import { normalizeResult } from './result';
import { decrypt, encrypt } from './crypto';
import request from './request';
import { locSetItem, locGetItem, locRemoveItem, ssnGetItem, ssnSetItem, ssnRemoveItem } from './storage';

export {
  request,
  normalizeResult,
  decrypt,
  encrypt,
  locSetItem,
  locGetItem,
  locRemoveItem,
  ssnGetItem,
  ssnSetItem,
  ssnRemoveItem,
};
// 格式化时间
export const formatDate = (date: number, format = 'YYYY/MM/DD HH:mm:ss') => {
  if (!date) return;

  return moment(date).format(format);
};

// 转化距离当前时间的间隔时长
export const formatGapTime = (date: number) => {
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
export const scrollTo = (ref: any, position: number, time = 20) => {
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

// 根据文件生成唯一hash
export const md5HashName = (file: File) => {
  return new Promise((resolve, reject) => {
    // 创建FileReader实例
    const fileReader = new FileReader();
    // 开始读文件
    fileReader.readAsBinaryString(file);
    // 文件读完之后，触发load事件
    fileReader.onload = (e) => {
      // result是fileReader读到的部分
      const result = (e.target as FileReader).result as string;
      // 如果读到的长度和文件长度一致，则读取成功
      const isSuccess = file.size === result?.length;
      // 读取成功，则生成MD5，扔出去。失败就报错
      isSuccess ? resolve(SparkMD5.hashBinary(result)) : reject(new Error('读取出错了'));
    };
    // 读取过程中出错也直接报错
    fileReader.onerror = () => reject(new Error('读取出错了'));
  });
};

// 校验是否是正常的链接
export const checkHref = (url: string) => {
  const Expression =
    /(https?:\/\/)?(([0-9a-z.]+\.[a-z]+)|(([0-9]{1,3}\.){3}[0-9]{1,3}))(:[0-9]+)?(\/[0-9a-z%/.\-_]*)?(\?[0-9a-z=&%_-]*)?(#[0-9a-z=&%_-]*)?/gi;
  const objExp = new RegExp(Expression);
  return objExp.test(url);
};

// 处理文章统计数据
export const manageArticleStatistics = (data: ArticleStatistic[]) => {
  // 定义空的新数据对象
  const newData: ArticleStatisticData = {};
  const yearList: string[] = [];

  // 遍历排序后的原始数据，根据年份构建新的数据对象
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (!newData[item.year]) {
      newData[item.year] = [];
    }
    if (!yearList.includes(item.year)) {
      yearList.push(item.year);
    }
    newData[item.year].push(item);
  }

  // 对每个年份的对象按照 month 从小到大进行排序
  for (const year in newData) {
    newData[year].sort(function (a, b) {
      return parseInt(a.month) - parseInt(b.month);
    });
  }

  // 获取所有年份
  const years = Object.keys(newData);

  // 遍历每个年份
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const months = newData[year];

    // 生成一个包含所有月份的数组
    const allMonths = Array.from({ length: 12 }, (_, idx) => idx + 1);

    // 遍历每个月份
    for (let j = 0; j < allMonths.length; j++) {
      const month = allMonths[j].toString().padStart(2, '0');

      // 判断该月份是否存在于原始数据中
      const existingMonth = months.find((m) => m.month === month);
      if (!existingMonth) {
        // 如果不存在，则将其添加到该年份的数组中
        newData[year].push({
          count: 0,
          year,
          month,
        });
      }
    }

    // 将该年份的月份按照月份排序
    newData[year].sort((a, b) => parseInt(a.month) - parseInt(b.month));
  }

  let maxReadCount = -Infinity;
  let maxArticle: ArticleInfo = { title: '', readCount: 0 };
  data.forEach((month) => {
    month.articleInfo.forEach((article) => {
      if (article.readCount && article.readCount > maxReadCount) {
        maxReadCount = article.readCount;
        maxArticle = article;
      }
    });
  });

  let totalCount = 0;
  for (const year in newData) {
    for (let i = 0; i < newData[year].length; i++) {
      totalCount += newData[year][i].count;
    }
  }

  return {
    dataSource: newData,
    years: yearList,
    maxArticle,
    totalCount,
  };
};
