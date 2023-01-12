import {
  Document,
  Grid,
  Setting,
  Discount,
  Menu,
  Postcard,
  ChatLineSquare,
  Position,
  User,
} from '@element-plus/icons-vue';
import QD from '@/assets/img/qd.jpg';
import SEA from '@/assets/img/sea.jpg';
import SSM from '@/assets/img/ssm.jpg';
import GIRL from '@/assets/img/girl.png';
import PAGE_ICON from '@/assets/svg/pageIcon.svg';
import PUSH_ICON from '@/assets/svg/push.svg';
import { MenuListParams } from '@/typings/comment';

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
  {
    name: '标签管理',
    key: 'tag',
    path: '/tag',
    icon: Discount,
  },
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
    name: '留言管理',
    key: 'comment',
    path: '/comment',
    icon: ChatLineSquare,
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

export const GATEWAY_HOST = '';

// 每页加载数量
export const PAGESIZE = 20;

// 标签图片
export const IMAGES = {
  qd: QD,
  sea: SEA,
  ssm: SSM,
  girl: GIRL,
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
