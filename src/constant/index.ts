export interface MenuListParams {
  name: string;
  key: string;
  path: string;
  icon: string;
}

// 左侧菜单配置
export const MENULIST: MenuListParams[] = [
  {
    name: 'SJGL',
    // name: '数据管理',
    key: 'home',
    path: '/home',
    icon: 'icon-menu',
  },
  {
    name: 'WJGL',
    // name: '文章管理',
    key: 'article',
    path: '/article',
    icon: 'document',
  },
  {
    name: 'FLGL',
    // name: '分类管理',
    key: 'classify',
    path: '/classify',
    icon: 'setting',
  },
  {
    name: 'BQGL',
    // name: '标签管理',
    key: 'tag',
    path: '/tag',
    icon: 'setting',
  },
  {
    name: 'ZHGL',
    // name: '账号管理',
    key: 'account',
    path: '/account',
    icon: 'setting',
  },
  {
    name: 'LYGL',
    // name: '留言管理',
    key: 'comment',
    path: '/comment',
    icon: 'setting',
  },
  {
    name: 'ZTSZ',
    // name: '主题设置',
    key: 'setting',
    path: '/setting',
    icon: 'setting',
  },
  {
    name: 'FBWZ',
    // name: '发布文章',
    key: 'create',
    path: '/create',
    icon: 'setting',
  },
];

export const GATEWAY_HOST = '';

// 每页加载数量
export const PAGESIZE = 50;
