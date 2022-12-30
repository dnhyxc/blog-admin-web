import QD from '@/assets/img/qd.jpg';
import SEA from '@/assets/img/sea.jpg';
import SSM from '@/assets/img/ssm.jpg';

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
    icon: 'icon-menu',
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
    icon: 'setting',
  },
  {
    name: '标签管理',
    key: 'tag',
    path: '/tag',
    icon: 'setting',
  },
  {
    name: '账号管理',
    key: 'account',
    path: '/account',
    icon: 'setting',
  },
  {
    name: '留言管理',
    key: 'comment',
    path: '/comment',
    icon: 'setting',
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
    icon: 'setting',
  },
];

export const GATEWAY_HOST = '';

// 每页加载数量
export const PAGESIZE = 50;

// 标签图片
export const IMAGES = {
  qd: QD,
  sea: SEA,
  ssm: SSM,
};
