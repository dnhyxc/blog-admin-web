import moment from 'moment';
import SparkMD5 from 'spark-md5';
import {EMOJI_TEXTS, EMOJI_URLS, CODE_LENGTH, CHARACTERS} from '@/constant';
import {ArticleStatistic, ArticleStatisticData, ArticleInfo} from '@/typings/comment';
import {normalizeResult} from './result';
import {decrypt, encrypt} from './crypto';
import request from './request';
import {locSetItem, locGetItem, locRemoveItem, ssnGetItem, ssnSetItem, ssnRemoveItem} from './storage';
import {compressImage} from './compress';

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
  compressImage,
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

// 校验是否是 base64 url
export const checkUrl = (url: string) => {
  if (url.includes('data:image')) {
    return false;
  }
  return true;
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
    if (!yearList.includes(item.year) && item.year) {
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
    const allMonths = Array.from({length: 12}, (_, idx) => idx + 1);

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
  let maxArticle: ArticleInfo = {title: '', readCount: 0};
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

// 账号校验
export const verifyUsername = (value: string) => {
  const usrRegex = /^((?!\\|\/|\(|\)|\+|-|=|~|～|`|!|！|:|\*|\?|<|>|\||'|%|#|&|\$|\^|&|\*).){1,20}$/;
  if (usrRegex.test(value)) {
    return {
      msg: '',
      status: true,
    };
  }
  if (value.length < 1) {
    return {
      msg: '用户名不能少于1位',
      status: false,
    };
  }
  if (value.length > 15) {
    return {
      msg: '用户名不能大于15位',
      status: false,
    };
  }
  return {
    msg: '用户名不能包含特殊字符',
    status: false,
  };
};

// 密码校验
export const verifyPassword = (value: string) => {
  const pwdRegex = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}/;
  if (value.length > 20) {
    return {
      msg: '密码不能不大于20位',
      status: false,
    };
  }
  if (value.length < 8) {
    return {
      msg: '密码不能少于8位',
      status: false,
    };
  }
  if (pwdRegex.test(value)) {
    return {
      msg: '',
      status: true,
    };
  }
  return {
    msg: '必须包含字母、数字、特称字符',
    status: false,
  };
};

// 密码校验
export const verifyResetPassword = (value: string, newPwd: string) => {
  const pwdRegex = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}/;
  if (value.length > 20) {
    return {
      msg: '密码不能不大于20位',
      status: false,
    };
  }
  if (value.length < 8) {
    return {
      msg: '密码不能少于8位',
      status: false,
    };
  }
  if (value !== newPwd) {
    return {
      msg: '两次输入的密码不一致',
      status: false,
    };
  }
  if (pwdRegex.test(value)) {
    return {
      msg: '',
      status: true,
    };
  }
  return {
    msg: '必须包含字母、数字、特称字符',
    status: false,
  };
};

// 验证码校验
export const verifyCode = (value: string, charater: string) => {
  if (value.toLowerCase() === charater.toLowerCase()) {
    return {
      msg: '',
      status: true,
    };
  }
  return {
    msg: '验证码输入错误',
    status: false,
  };
};

// 生成唯一id
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 随机生成颜色
export const randomColor = (min: number, max: number) => {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

// 随机生成数字
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// canvas 绘制验证码
export const drawCharater = ({
                               canvasElement,
                               width,
                               height,
                             }: {
  canvasElement: HTMLCanvasElement;
  width: number;
  height: number;
}) => {
  let txt = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    txt += CHARACTERS[randomNum(0, CHARACTERS.length)];
  }
  const ctx = canvasElement?.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = randomColor(180, 255);
  ctx.fillRect(0, 0, width, height);
  // 字体对齐位置
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center'; // 设置文本对齐方式为居中
  ctx.fillRect(0, 0, width, height); // 填充背景色
  ctx.font = '32px sans-serif'; // 设置字体样式
  // 随机生成字体大小(0.5 - 0.75)高的范围
  // ctx.font = randomNum((height * 2) / 4, (height * 3) / 4) + 'px sans-serif';
  ctx.fillStyle = randomColor(0, 255);
  ctx.fillText(txt, width / 2, height / 2 + 3); // 绘制文本
  // 绘制干扰线
  for (let j = 0; j < CODE_LENGTH; j++) {
    ctx.strokeStyle = randomColor(30, 180);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, width), randomNum(0, height));
    ctx.lineTo(randomNum(0, width), randomNum(0, height));
    ctx.stroke();
  }
  // 绘制干扰点
  for (let k = 0; k < 30; k++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }

  return txt;
};

// 将网络图片转换成base64格式
export const image2Base64 = (image: any, type?: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image, 0, 0, image.width, image.height);
  // 可选其他值 image/jpeg
  return canvas.toDataURL(type || 'image/png');
};

export const getImgInfo = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = '*';
    img.onload = function () {
      const width = img.width;
      const height = img.height;
      resolve({
        width,
        height,
      });
    };
    img.onerror = function () {
      reject(new Error('图片加载失败'));
    };
    img.src = url;
  });
};

// 设置头像base64
export const url2Base64 = (src: string, type?: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    // 处理缓存
    image.src = src + '?v=' + Math.random();
    // 支持跨域图片
    image.crossOrigin = '*';
    image.onload = () => {
      const base64 = image2Base64(image, type);
      resolve(base64);
    };
  });
};
