<template>
  <div class="md-editor-wrap">
    <MdEditor
      ref="editorRef"
      v-model="markdown"
      :toolbars="toolbars as ToolbarNames[]"
      auto-focus
      auto-detect-code
      code-foldable
      placeholder="请输入内容"
      @on-upload-img="onUploadImg"
      @on-change="onEditChange"
    >
      <template #defToolbars>
        <NormalToolbar :title="articleId ? '更新文章' : '发布文章'" class="normal-toolbar" @click="onAction">
          <template #trigger>
            <div class="icons">
              {{ articleId ? '更新文章' : '发布文章' }}
            </div>
          </template>
        </NormalToolbar>
      </template>
    </MdEditor>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { MdEditor, NormalToolbar, ToolbarNames } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { toolbars } from './toolbars';
import { uploadStore } from '@/store';

interface IProps {
  articleId?: string;
  height?: string;
  markdown?: string;
  onSaveMackdown?: (html: string) => void;
  onEditChange?: (html: string) => void;
  onPublish?: (html: string) => void;
}

const props = withDefaults(defineProps<IProps>(), {
  markdown: '',
  articleId: '',
  height: '100%',
  onPublish: () => {},
  onSaveMackdown: () => {},
  onEditChange: () => {},
});

const emit = defineEmits(['update:markdown']);

const markdown = computed({
  get() {
    return props.markdown;
  },
  set(value) {
    emit('update:markdown', value);
  },
});

const editorRef = ref<any>(null);

const onUploadImg = (files: File[], callback: Function) => {
  files.map(async (i) => {
    const res = await uploadStore.uploadFile(i);
    callback([
      {
        url: res?.filePath,
        alt: i.name,
      },
    ]);
  });
};

const onEditChange = (value: string) => {
  console.log(value, 'value');
  emit('update:markdown', value);
};

const onAction = () => {
  console.log(props.markdown, 'markdown.value');
  if (!props.markdown.trim()) {
    return ElMessage.success('请先编写文章内容后再尝试发布！');
  }
  props.onPublish && props.onPublish(props.markdown);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.md-editor-wrap {
  position: relative;
  height: 100%;

  .save {
    font-size: 18px;
    margin-top: 1px;
  }

  .icons {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 70px;
    margin-right: 5px;
  }

  :deep {
    .md-editor {
      height: 100%;
    }
  }
}
</style>
