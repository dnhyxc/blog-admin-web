### 页面模板

[模板](https://www.php.cn/xiazai/code/houduan?p=3)

[选中模板](https://www.php.cn/xiazai/demo/7589)

```json
{
  "vue3模板": {
    "prefix": "vue",
    "description": "vue3模板",
    "body": [
      "${BLOCK_COMMENT_START}",
      " * ${1:new page}",
      " * @author: ${2:dnhyxc}",
      " * @since: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}",
      " * ${TM_FILENAME}",
      "${BLOCK_COMMENT_END}",
      "<template>",
      "  <div class=\"container\">",
      "    ",
      "  </div>",
      "</template>",
      "",
      "<script setup lang=\"ts\">",
      "",
      "</script>",
      "",
      "<style scoped lang=\"less\">",
      "@import '@/styles/index.less';",
      "</style>",
      ""
    ]
  }
}
```

### 弹幕插件

```
yarn add vue-baberrage
```

### 允许他人访问本地启动的项目

在项目启动命令中添加 `--host=0.0.0.0` 即可：

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development vite --host=0.0.0.0",
},
```

### implements与extends的定位

implements：实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能。

extends：继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法。