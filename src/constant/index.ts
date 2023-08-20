import {
  Document,
  Grid,
  Setting,
  // Discount,
  Menu,
  Postcard,
  ChatLineSquare,
  Position,
  User,
  Tickets,
} from '@element-plus/icons-vue';
import SEA from '@/assets/img/sea.jpg';
import SSM from '@/assets/img/ssm.jpg';
import PAGE_ICON from '@/assets/svg/pageIcon.svg';
import PUSH_ICON from '@/assets/svg/push.svg';
import { MenuListParams } from '@/typings/comment';
import TOOL_SVG from '@/assets/svg/tool.svg';
import SEA_SVG from '@/assets/svg/sea.svg';

export { SEA, SSM, TOOL_SVG, SEA_SVG };

// 左侧菜单配置
export const MENULIST: MenuListParams<typeof Grid>[] = [
  {
    name: '数据管理',
    key: 'home',
    path: '/home',
    icon: Grid,
  },
  {
    name: '文章管理',
    key: 'article',
    path: '/article',
    icon: Document,
  },
  {
    name: '分类管理',
    key: 'classify',
    path: '/classify',
    icon: Menu,
  },
  // {
  //   name: '标签管理',
  //   key: 'tag',
  //   path: '/tag',
  //   icon: Discount,
  // },
  {
    name: '账号管理',
    key: 'account',
    path: '/account',
    icon: Postcard,
  },
  {
    name: '后台账户',
    key: 'users',
    path: '/users',
    icon: User,
  },
  {
    name: '评论管理',
    key: 'comment',
    path: '/comment',
    icon: ChatLineSquare,
  },
  {
    name: '留言管理',
    key: 'interact',
    path: '/interact',
    icon: Tickets,
  },
  {
    name: '工具管理',
    key: 'tools',
    path: '/tools',
    icon: Tickets,
  },
  {
    name: '主题设置',
    key: 'pageSet',
    path: '/pageSet',
    icon: Setting,
  },
  {
    name: '发布文章',
    key: 'create',
    path: '/create',
    icon: Position,
  },
];

// 只有超级管理员具备访问权限的页面
export const SUPER_ADMIN_POWER_PAGES = ['users', 'account', 'tools', 'interact'];

export const GATEWAY_HOST = '';

// 每页加载数量
export const PAGESIZE = 20;

// 标签图片
export const IMAGES = {
  sea: SEA,
  ssm: SSM,
  pageIcon: PAGE_ICON,
  push: PUSH_ICON,
};

// 封面图地址
export const COVER_LIST = [
  { name: '选项1', checked: false, img: IMAGES.sea, id: '1' },
  { name: '选项2', checked: false, img: IMAGES.ssm, id: '2' },
  { name: '选项3', checked: false, img: IMAGES.ssm, id: '3' },
  { name: '选项4', checked: false, img: IMAGES.ssm, id: '4' },
  { name: '选项5', checked: false, img: IMAGES.ssm, id: '5' },
  { name: '选项6', checked: false, img: IMAGES.ssm, id: '6' },
  { name: '选项7', checked: false, img: IMAGES.sea, id: '7' },
  { name: '选项8', checked: false, img: IMAGES.ssm, id: '8' },
  { name: '选项9', checked: false, img: IMAGES.ssm, id: '9' },
  { name: '选项10', checked: false, img: IMAGES.sea, id: '10' },
  { name: '选项11', checked: false, img: IMAGES.ssm, id: '11' },
  { name: '选项12', checked: false, img: IMAGES.ssm, id: '12' },
];

// 权限配置
export const AUTH_CONFIG = {
  SUPER: 1,
  ADMIN: 2,
};

// 创建文章表单配置
export const CREATE_ARTICLE_CONFIG = [
  {
    prop: 'title',
    label: '文章标题',
    message: '请输入文章标题',
  },
  {
    prop: 'classify',
    label: '文章分类',
    message: '请输入文章分类',
  },
  {
    prop: 'tag',
    label: '文章标签',
    message: '请输入文章标签',
  },
  {
    prop: 'createTime',
    label: '发文时间',
    message: '请选择发文时间',
  },
  {
    prop: 'abstract',
    label: '文章摘要',
    message: '请输入文章摘要',
    type: 'textarea',
    maxlength: 300,
    autosize: { minRows: 5, maxRows: 8 },
  },
];

export const LOADING_SVG = `
<svg t="1677748747940" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34693" width="32" height="32"><path d="M512 448c-57.152 0-192-149.952-192-256a192 192 0 0 1 384 0c0 106.048-134.848 256-192 256z m64 64c0-57.152 149.952-192 256-192a192 192 0 0 1 0 384c-106.048 0-256-134.848-256-192zM448 512c0 57.152-149.952 192-256 192a192 192 0 0 1 0-384c106.048 0 256 134.848 256 192z m64 64c57.152 0 192 149.952 192 256a192 192 0 0 1-384 0c0-106.048 134.848-256 192-256z" fill="#57a0ff" p-id="34694"></path></svg>
`;

// 线上域名
export const DOMAIN_URL = '43.143.27.249';

// 主域名
export const WEB_MAIN_URL = 'http://43.143.27.249';

// web端域名
export const WEB_DOMAIN_URL = 'http://43.143.27.249:9216';

// 表情资源路径域名
export const EMOJI_HOST = `http://${location.hostname === DOMAIN_URL ? DOMAIN_URL : '127.0.0.1:9112'}/image/`;

// 表情图片链接
export const EMOJI_URLS = {
  1: `${EMOJI_HOST}24b6f805c6687e5694cbee718.gif`, // weixiao,
  2: `${EMOJI_HOST}24b6f805c6687e5694cbee703.gif`, // baiyan,
  4: `${EMOJI_HOST}24b6f805c6687e5694cbee71f.gif`, // ziya,
  3: `${EMOJI_HOST}24b6f805c6687e5694cbee704.gif`, // bishi,
  5: `${EMOJI_HOST}24b6f805c6687e5694cbee706.gif`, // fannao,
  6: `${EMOJI_HOST}24b6f805c6687e5694cbee707.gif`, // fendou,
  7: `${EMOJI_HOST}24b6f805c6687e5694cbee709.gif`, // haixiu,
  8: `${EMOJI_HOST}24b6f805c6687e5694cbee708.gif`, // guzhang,
  9: `${EMOJI_HOST}24b6f805c6687e5694cbee70a.gif`, // haose,
  11: `${EMOJI_HOST}24b6f805c6687e5694cbee70c.gif`, // huaji,
  10: `${EMOJI_HOST}24b6f805c6687e5694cbee70b.gif`, // huaixiao,
  12: `${EMOJI_HOST}24b6f805c6687e5694cbee70d.gif`, // kelian,
  13: `${EMOJI_HOST}24b6f805c6687e5694cbee70e.gif`, // ku,
  14: `${EMOJI_HOST}24b6f805c6687e5694cbee70f.gif`, // kun,
  15: `${EMOJI_HOST}24b6f805c6687e5694cbee710.gif`, // kuxiao,
  16: `${EMOJI_HOST}24b6f805c6687e5694cbee711.gif`, // liulei,
  17: `${EMOJI_HOST}24b6f805c6687e5694cbee712.gif`, // shengqi,
  18: `${EMOJI_HOST}24b6f805c6687e5694cbee713.gif`, // shuai,
  19: `${EMOJI_HOST}24b6f805c6687e5694cbee714.gif`, // tushe,
  20: `${EMOJI_HOST}24b6f805c6687e5694cbee715.gif`, // tuxie,
  21: `${EMOJI_HOST}24b6f805c6687e5694cbee716.gif`, // wabi,
  22: `${EMOJI_HOST}24b6f805c6687e5694cbee717.gif`, // weiqu,
  23: `${EMOJI_HOST}24b6f805c6687e5694cbee702.gif`, // azhe,
  24: `${EMOJI_HOST}24b6f805c6687e5694cbee719.gif`, // wuzui,
  25: `${EMOJI_HOST}24b6f805c6687e5694cbee71a.gif`, // xia,
  26: `${EMOJI_HOST}24b6f805c6687e5694cbee71b.gif`, // yun,
  27: `${EMOJI_HOST}24b6f805c6687e5694cbee71c.gif`, // zaijian,
  28: `${EMOJI_HOST}24b6f805c6687e5694cbee71d.gif`, // zhayan,
  29: `${EMOJI_HOST}24b6f805c6687e5694cbee71e.gif`, // zhoumei,
  30: `${EMOJI_HOST}24b6f805c6687e5694cbee705.gif`, // dabing,
};

// 表情列表
export const EMOJI_TEXTS = [
  '微笑',
  '白眼',
  '鄙视',
  '龇牙',
  '烦恼',
  '奋斗',
  '害羞',
  '鼓掌',
  '好色',
  '坏笑',
  '滑稽',
  '可怜',
  '酷',
  '困',
  '哭笑',
  '流泪',
  '生气',
  '衰',
  '吐舌',
  '吐血',
  '挖鼻',
  '委屈',
  '啊这',
  '捂嘴',
  '吓',
  '晕',
  '再见',
  '眨眼',
  '皱眉',
  '大兵',
];

// 允许上传的文件类型
export const FILE_TYPE = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'];
// 上传文件提示
export const FILE_UPLOAD_MSG = '请上传 png、jpg、jpeg、gif、webp、svg 格式的图片';
