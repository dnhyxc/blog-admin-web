import QD from '@/assets/img/qd.jpg';
import SEA from '@/assets/img/sea.jpg';
import SSM from '@/assets/img/ssm.jpg';
import GIRL from '@/assets/img/girl.png';

export interface MenuListParams {
  name: string;
  key: string;
  path: string;
  icon: string;
}

// 左侧菜单配置
export const MENULIST: MenuListParams[] = [
  {
    name: '数据管理',
    key: 'home',
    path: '/home',
    icon: 'home',
  },
  {
    name: '文章管理',
    key: 'article',
    path: '/article',
    icon: 'document',
  },
  {
    name: '分类管理',
    key: 'classify',
    path: '/classify',
    icon: 'classify',
  },
  {
    name: '标签管理',
    key: 'tag',
    path: '/tag',
    icon: 'tag',
  },
  {
    name: '账号管理',
    key: 'account',
    path: '/account',
    icon: 'account',
  },
  {
    name: '后台账户',
    key: 'users',
    path: '/users',
    icon: 'users',
  },
  {
    name: '留言管理',
    key: 'comment',
    path: '/comment',
    icon: 'comment',
  },
  {
    name: '主题设置',
    key: 'setting',
    path: '/setting',
    icon: 'setting',
  },
  {
    name: '发布文章',
    key: 'create',
    path: '/create',
    icon: 'create',
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
