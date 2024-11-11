import { IToolbarConfig } from '@wangeditor/editor';

export const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    'undo',
    'redo',
    'headerSelect',
    'bold', // 加粗文本
    'italic', // 斜体文本
    'underline', // 为文本添加下划线
    'fontSize', // 设置字体大小
    'fontFamily', // 选择字体家族
    'lineHeight', // 设置行高
    'color', // 设置文本颜色
    'bgColor', // 设置文本背景色
    'clearStyle', // 清除文本样式
    'bulletedList', // 插入项目符号列表
    'numberedList', // 插入编号列表
    'insertLink', // 插入链接
    'justifyLeft', // 左对齐文本
    'justifyRight', // 右对齐文本
    'justifyCenter', // 居中对齐文本
    'justifyJustify', // 两端对齐文本
    'indent', // 增加缩进
    'delIndent', // 减少缩进
    'divider', // 分割线
    'blockquote', // 插入引用块
    'codeBlock',
    'fullScreen', // 切换全屏模式
  ],
  modalAppendToBody: true,
};

export const config = [
  'bold', // 加粗文本
  'underline', // 为文本添加下划线
  'italic', // 斜体文本
  'through', // 删除线文本
  'code', // 行内代码格式
  'sub', // 下标文本
  'sup', // 上标文本
  'clearStyle', // 清除文本样式
  'color', // 设置文本颜色
  'bgColor', // 设置文本背景色
  'fontSize', // 设置字体大小
  'fontFamily', // 选择字体家族
  'indent', // 增加缩进
  'delIndent', // 减少缩进
  'justifyLeft', // 左对齐文本
  'justifyRight', // 右对齐文本
  'justifyCenter', // 居中对齐文本
  'justifyJustify', // 两端对齐文本
  'lineHeight', // 设置行高
  'insertImage', // 插入图片
  'deleteImage', // 删除图片
  'editImage', // 编辑图片
  'viewImageLink', // 查看图片链接
  'imageWidth30', // 将图片宽度设置为 30%
  'imageWidth50', // 将图片宽度设置为 50%
  'imageWidth100', // 将图片宽度设置为 100%
  'divider', // 分隔符，用于分隔工具栏按钮
  'emotion', // 插入表情符号
  'insertLink', // 插入链接
  'editLink', // 编辑链接
  'unLink', // 删除链接
  'viewLink', // 查看链接
  'codeBlock', // 插入代码块
  'blockquote', // 插入引用块
  'headerSelect', // 选择标题级别
  'header1', // 一级标题
  'header2', // 二级标题
  'header3', // 三级标题
  'header4', // 四级标题
  'header5', // 五级标题
  'todo', // 插入待办事项列表
  'redo', // 重做操作
  'undo', // 撤销操作
  'fullScreen', // 切换全屏模式
  'enter', // 插入换行符
  'bulletedList', // 插入项目符号列表
  'numberedList', // 插入编号列表
  'insertTable', // 插入表格
  'deleteTable', // 删除表格
  'insertTableRow', // 插入表格行
  'deleteTableRow', // 删除表格行
  'insertTableCol', // 插入表格列
  'deleteTableCol', // 删除表格列
  'tableHeader', // 设置/取消表格头部
  'tableFullWidth', // 设置表格为全宽
  'insertVideo', // 插入视频
  'uploadVideo', // 上传视频
  'editVideoSize', // 编辑视频大小
  'uploadImage', // 上传图片
  'codeSelectLang', // 选择代码块语言
];
