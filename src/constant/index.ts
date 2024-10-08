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
export const SUPER_ADMIN_POWER_PAGES = ['home', 'users', 'account', 'tools', 'interact', 'pageSet'];

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
export const DOMAIN_URL = 'dnhyxc.cn';

// 主域名
export const WEB_MAIN_URL = 'https://dnhyxc.cn:9216';
// export const WEB_MAIN_URL = 'https://101.43.50.15:9216';

// web端域名
export const WEB_DOMAIN_URL = 'https://dnhyxc.cn';
// export const WEB_DOMAIN_URL = 'http://101.43.50.15';

// 表情资源路径域名
export const EMOJI_HOST = `https://${
  ['dnhyxc.cn', 'www.dnhyxc.cn', DOMAIN_URL].includes(location.hostname) ? DOMAIN_URL : '127.0.0.1:9112'
}/image/`;

export const EMOJI_MAP = {
  '[NO]': 'emoji_0@2x.png',
  '[OK]': 'emoji_1@2x.png',
  '[下雨]': 'emoji_2@2x.png',
  '[么么哒]': 'emoji_3@2x.png',
  '[乒乓]': 'emoji_4@2x.png',
  '[便便]': 'emoji_5@2x.png',
  '[信封]': 'emoji_6@2x.png',
  '[偷笑]': 'emoji_7@2x.png',
  '[傲慢]': 'emoji_8@2x.png',
  '[再见]': 'emoji_9@2x.png',
  '[冷汗]': 'emoji_10@2x.png',
  '[凋谢]': 'emoji_11@2x.png',
  '[刀]': 'emoji_12@2x.png',
  '[删除]': 'emoji_13@2x.png',
  '[勾引]': 'emoji_14@2x.png',
  '[发呆]': 'emoji_15@2x.png',
  '[发抖]': 'emoji_16@2x.png',
  '[可怜]': 'emoji_17@2x.png',
  '[可爱]': 'emoji_18@2x.png',
  '[右哼哼]': 'emoji_19@2x.png',
  '[右太极]': 'emoji_20@2x.png',
  '[右车头]': 'emoji_21@2x.png',
  '[吐]': 'emoji_22@2x.png',
  '[吓]': 'emoji_23@2x.png',
  '[咒骂]': 'emoji_24@2x.png',
  '[咖啡]': 'emoji_25@2x.png',
  '[啤酒]': 'emoji_26@2x.png',
  '[嘘]': 'emoji_27@2x.png',
  '[回头]': 'emoji_28@2x.png',
  '[困]': 'emoji_29@2x.png',
  '[坏笑]': 'emoji_30@2x.png',
  '[多云]': 'emoji_31@2x.png',
  '[大兵]': 'emoji_32@2x.png',
  '[大哭]': 'emoji_33@2x.png',
  '[太阳]': 'emoji_34@2x.png',
  '[奋斗]': 'emoji_35@2x.png',
  '[奶瓶]': 'emoji_36@2x.png',
  '[委屈]': 'emoji_37@2x.png',
  '[害羞]': 'emoji_38@2x.png',
  '[尴尬]': 'emoji_39@2x.png',
  '[左哼哼]': 'emoji_40@2x.png',
  '[左太极]': 'emoji_41@2x.png',
  '[左车头]': 'emoji_42@2x.png',
  '[差劲]': 'emoji_43@2x.png',
  '[弱]': 'emoji_44@2x.png',
  '[强]': 'emoji_45@2x.png',
  '[彩带]': 'emoji_46@2x.png',
  '[彩球]': 'emoji_47@2x.png',
  '[得意]': 'emoji_48@2x.png',
  '[微笑]': 'emoji_49@2x.png',
  '[心碎了]': 'emoji_50@2x.png',
  '[快哭了]': 'emoji_51@2x.png',
  '[怄火]': 'emoji_52@2x.png',
  '[怒]': 'emoji_53@2x.png',
  '[惊恐]': 'emoji_54@2x.png',
  '[惊讶]': 'emoji_55@2x.png',
  '[憨笑]': 'emoji_56@2x.png',
  '[手枪]': 'emoji_57@2x.png',
  '[打哈欠]': 'emoji_58@2x.png',
  '[抓狂]': 'emoji_59@2x.png',
  '[折磨]': 'emoji_60@2x.png',
  '[抠鼻]': 'emoji_61@2x.png',
  '[抱抱]': 'emoji_62@2x.png',
  '[抱拳]': 'emoji_63@2x.png',
  '[拳头]': 'emoji_64@2x.png',
  '[挥手]': 'emoji_65@2x.png',
  '[握手]': 'emoji_66@2x.png',
  '[撇嘴]': 'emoji_67@2x.png',
  '[擦汗]': 'emoji_68@2x.png',
  '[敲打]': 'emoji_69@2x.png',
  '[晕]': 'emoji_70@2x.png',
  '[月亮]': 'emoji_71@2x.png',
  '[棒棒糖]': 'emoji_72@2x.png',
  '[汽车]': 'emoji_73@2x.png',
  '[沙发]': 'emoji_74@2x.png',
  '[流汗]': 'emoji_75@2x.png',
  '[流泪]': 'emoji_76@2x.png',
  '[激动]': 'emoji_77@2x.png',
  '[灯泡]': 'emoji_78@2x.png',
  '[炸弹]': 'emoji_79@2x.png',
  '[熊猫]': 'emoji_80@2x.png',
  '[爆筋]': 'emoji_81@2x.png',
  '[爱你]': 'emoji_82@2x.png',
  '[爱心]': 'emoji_83@2x.png',
  '[爱情]': 'emoji_84@2x.png',
  '[猪头]': 'emoji_85@2x.png',
  '[猫咪]': 'emoji_86@2x.png',
  '[献吻]': 'emoji_87@2x.png',
  '[玫瑰]': 'emoji_88@2x.png',
  '[瓢虫]': 'emoji_89@2x.png',
  '[疑问]': 'emoji_90@2x.png',
  '[白眼]': 'emoji_91@2x.png',
  '[皮球]': 'emoji_92@2x.png',
  '[睡觉]': 'emoji_93@2x.png',
  '[磕头]': 'emoji_94@2x.png',
  '[示爱]': 'emoji_95@2x.png',
  '[礼品袋]': 'emoji_96@2x.png',
  '[礼物]': 'emoji_97@2x.png',
  '[篮球]': 'emoji_98@2x.png',
  '[米饭]': 'emoji_99@2x.png',
  '[糗大了]': 'emoji_100@2x.png',
  '[红双喜]': 'emoji_101@2x.png',
  '[红灯笼]': 'emoji_102@2x.png',
  '[纸巾]': 'emoji_103@2x.png',
  '[胜利]': 'emoji_104@2x.png',
  '[色]': 'emoji_105@2x.png',
  '[药]': 'emoji_106@2x.png',
  '[菜刀]': 'emoji_107@2x.png',
  '[蛋糕]': 'emoji_108@2x.png',
  '[蜡烛]': 'emoji_109@2x.png',
  '[街舞]': 'emoji_110@2x.png',
  '[衰]': 'emoji_111@2x.png',
  '[西瓜]': 'emoji_112@2x.png',
  '[调皮]': 'emoji_113@2x.png',
  '[象棋]': 'emoji_114@2x.png',
  '[跳绳]': 'emoji_115@2x.png',
  '[跳跳]': 'emoji_116@2x.png',
  '[车厢]': 'emoji_117@2x.png',
  '[转圈]': 'emoji_118@2x.png',
  '[鄙视]': 'emoji_119@2x.png',
  '[酷]': 'emoji_120@2x.png',
  '[钞票]': 'emoji_121@2x.png',
  '[钻戒]': 'emoji_122@2x.png',
  '[闪电]': 'emoji_123@2x.png',
  '[闭嘴]': 'emoji_124@2x.png',
  '[闹钟]': 'emoji_125@2x.png',
  '[阴险]': 'emoji_126@2x.png',
  '[难过]': 'emoji_127@2x.png',
  '[雨伞]': 'emoji_128@2x.png',
  '[青蛙]': 'emoji_129@2x.png',
  '[面条]': 'emoji_130@2x.png',
  '[鞭炮]': 'emoji_131@2x.png',
  '[风车]': 'emoji_132@2x.png',
  '[飞吻]': 'emoji_133@2x.png',
  '[飞机]': 'emoji_134@2x.png',
  '[饥饿]': 'emoji_135@2x.png',
  '[香蕉]': 'emoji_136@2x.png',
  '[骷髅]': 'emoji_137@2x.png',
  '[麦克风]': 'emoji_138@2x.png',
  '[麻将]': 'emoji_139@2x.png',
  '[鼓掌]': 'emoji_140@2x.png',
  '[龇牙]': 'emoji_141@2x.png',
};
export const EMOJI_NAME = [
  '[龇牙]',
  '[调皮]',
  '[流汗]',
  '[偷笑]',
  '[再见]',
  '[敲打]',
  '[擦汗]',
  '[流泪]',
  '[大哭]',
  '[嘘]',
  '[酷]',
  '[抓狂]',
  '[委屈]',
  '[可爱]',
  '[色]',
  '[害羞]',
  '[得意]',
  '[吐]',
  '[微笑]',
  '[怒]',
  '[尴尬]',
  '[惊恐]',
  '[冷汗]',
  '[白眼]',
  '[傲慢]',
  '[难过]',
  '[惊讶]',
  '[疑问]',
  '[困]',
  '[么么哒]',
  '[憨笑]',
  '[衰]',
  '[撇嘴]',
  '[阴险]',
  '[奋斗]',
  '[发呆]',
  '[右哼哼]',
  '[抱抱]',
  '[坏笑]',
  '[鄙视]',
  '[晕]',
  '[大兵]',
  '[可怜]',
  '[饥饿]',
  '[咒骂]',
  '[折磨]',
  '[抠鼻]',
  '[鼓掌]',
  '[糗大了]',
  '[左哼哼]',
  '[打哈欠]',
  '[快哭了]',
  '[吓]',
  '[闭嘴]',
  '[强]',
  '[弱]',
  '[握手]',
  '[胜利]',
  '[抱拳]',
  '[勾引]',
  '[差劲]',
  '[拳头]',
  '[OK]',
  '[NO]',
  '[爱你]',
  '[爱心]',
  '[心碎了]',
  '[示爱]',
  '[玫瑰]',
  '[凋谢]',
  '[挥手]',
  '[发抖]',
  '[飞吻]',
  '[爱情]',
  '[跳跳]',
  '[怄火]',
  '[转圈]',
  '[磕头]',
  '[回头]',
  '[跳绳]',
  '[激动]',
  '[街舞]',
  '[献吻]',
  '[左太极]',
  '[右太极]',
  '[便便]',
  '[炸弹]',
  '[菜刀]',
  '[刀]',
  '[米饭]',
  '[蛋糕]',
  '[西瓜]',
  '[啤酒]',
  '[咖啡]',
  '[太阳]',
  '[月亮]',
  '[多云]',
  '[闪电]',
  '[下雨]',
  '[雨伞]',
  '[礼物]',
  '[篮球]',
  '[皮球]',
  '[乒乓]',
  '[红双喜]',
  '[鞭炮]',
  '[红灯笼]',
  '[麻将]',
  '[麦克风]',
  '[礼品袋]',
  '[信封]',
  '[象棋]',
  '[彩带]',
  // '[蜡烛]',
  '[爆筋]',
  '[棒棒糖]',
  '[奶瓶]',
  '[面条]',
  '[香蕉]',
  '[飞机]',
  '[左车头]',
  '[车厢]',
  '[右车头]',
  '[钞票]',
  '[灯泡]',
  '[风车]',
  '[闹钟]',
  '[彩球]',
  '[钻戒]',
  '[沙发]',
  '[手枪]',
  '[纸巾]',
  // '[骷髅]',
  '[猪头]',
  '[瓢虫]',
  '[猫咪]',
  '[熊猫]',
  '[青蛙]',
];

// 允许上传的文件类型
export const FILE_TYPE = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'];
// 上传文件提示
export const FILE_UPLOAD_MSG = '请上传 png、jpg、jpeg、gif、webp、svg 格式的图片';

// 前台菜单权限列表
export const MENU_LIST_CONFIG = [
  { key: 'tools', name: '实用工具' },
  { key: 'resume', name: '简历制作' },
  { key: 'deploy', name: '发布系统' },
  { key: 'picture', name: '图片集' },
];

export const MENU_AUTH_ENUM = {
  tools: '实用工具',
  resume: '简历制作',
  deploy: '发布系统',
  picture: '图片集',
};

// 生成的验证码长度
export const CODE_LENGTH = 4;
// 随机生成的字符集
export const CHARACTERS = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789abcdefghijklmnpqrstuvwxyz';

export const ARTICLE_CLASSIFY = [
  '前端',
  '后端',
  '架构',
  '数据库',
  '设计模式',
  '数据结构',
  '算法',
  '开发工具',
  '代码人生',
  '前端框架',
  '计算机',
  '网络协议',
  '可视化',
  '移动端',
  '阅读',
  '其它',
];

export const ARTICLE_TAG = [
  {
    label: '前端',
    key: '1',
  },
  {
    label: '后端',
    key: '2',
  },
  {
    label: 'JavaScript',
    key: '3',
  },
  {
    label: 'Node.js',
    key: '4',
  },
  {
    label: 'TypeScript',
    key: '5',
  },
  {
    label: '前端框架',
    key: '6',
  },
  {
    label: 'React',
    key: '7',
  },
  {
    label: 'Vue',
    key: '8',
  },
  {
    label: 'Preact',
    key: '9',
  },
  {
    label: 'Webpack',
    key: '10',
  },
  {
    label: 'Koa.js',
    key: '11',
  },
  {
    label: '面试',
    key: '12',
  },
  {
    label: 'Java',
    key: '13',
  },
  {
    label: '架构',
    key: '14',
  },
  {
    label: 'CSS',
    key: '15',
  },
  {
    label: 'HTML',
    key: '16',
  },
  {
    label: '数据结构',
    key: '17',
  },
  {
    label: '算法',
    key: '18',
  },
  {
    label: 'GitHub',
    key: '19',
  },
  {
    label: 'Git',
    key: '20',
  },
  {
    label: '设计模式',
    key: '21',
  },
  {
    label: '数据库',
    key: '22',
  },
  {
    label: '项目部署',
    key: '23',
  },
  {
    label: 'Docker',
    key: '24',
  },
  {
    label: 'Nginx',
    key: '25',
  },
  {
    label: '其它',
    key: '26',
  },
];
