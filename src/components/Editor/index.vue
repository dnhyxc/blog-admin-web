<template>
  <div class="container">
    <!-- 如果不设置 :disabled-menus="[]" 则无法显示上传本地图片的选项-->
    <v-md-editor
      v-model="mackdown"
      :height="height"
      autofocus
      :disabled-menus="[]"
      left-toolbar="undo redo | h bold italic | quote code | strikethrough hr | link image | ul ol table | create"
      :toolbar="toolbar"
      placeholder="编辑内容"
      @upload-image="onUploadImage"
      @copy-code-success="onCopyCodeSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import { uploadStore } from '@/store';

interface ToolbarItem {
  action?: (editor: any) => void;
  title?: string;
  icon?: string;
  name?: string;
  text?: string;
}

interface Toolbar {
  create?: {
    title?: string;
    text?: string;
    icon?: string;
    action?: (editor?: any) => void;
    menus?: ToolbarItem[];
  };
}

interface IProps {
  articleId?: string;
  height?: string;
  mackdown?: string;
  onSaveMackdown?: (html: string) => void;
  onEditChange?: (html: string) => void;
  onPublish?: (html: string) => void;
}

const props = withDefaults(defineProps<IProps>(), {
  articleId: '',
  height: 'calc(100vh - 70px)',
  mackdown: '',
  onSaveMackdown: () => {},
  onEditChange: () => {},
  onPublish: () => {},
});

const mackdown = ref<string>('');

// 自定义工具栏配置
const toolbar = reactive<Toolbar>({
  create: {
    text: props.articleId ? '更新文章' : '发布文章',
    title: props.articleId ? '更新文章' : '发布文章',
    action(editor) {
      props.onPublish && props.onPublish(mackdown.value);
    },
  },
});

watchEffect(() => {
  if (props.mackdown) {
    mackdown.value = props.mackdown;
  } else {
    mackdown.value = '';
  }
});

// 上传图片事件
const onUploadImage = async (event: Event, insertImage: Function, files: File[]) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  const res = await uploadStore.uploadFile(files[0]);
  insertImage({
    url: res?.filePath,
    desc: files[0]?.name,
  });
};

const onCopyCodeSuccess = (code: string) => {
  ElMessage.success('复制成功');
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.container {
  background-color: @fff;

  :deep {
    .v-md-textarea-editor pre,
    .v-md-textarea-editor textarea {
      background-color: @fff;
    }
    .vuepress-markdown-body:not(.custom) {
      padding: 16px 20px;
    }

    .v-md-editor__toolbar-left {
      min-width: 200px;
    }

    .v-md-editor__toolbar-right {
      min-width: 125px;
    }

    .v-md-editor__toolbar-item-create {
      color: @primary;
      line-height: 30px;
    }
  }
}
</style>
