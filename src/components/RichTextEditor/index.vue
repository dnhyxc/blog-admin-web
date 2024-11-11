<!--
 * 富文本编辑器
 * @author: dnhyxc
 * @since: 2023-08-12
 * index.vue
-->
<template>
  <div class="ckeditor-container">
    <Toolbar class="toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <Editor
      v-model="richContent"
      :scroll="false"
      :default-config="editorConfig"
      :mode="mode"
      class="editor"
      @on-created="handleCreated"
      @on-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, computed } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { toolbarConfig } from './config';

interface IProps {
  getRichText?: (content: string) => void;
  mode?: 'default' | 'simple';
  content: string;
}

const props = withDefaults(defineProps<IProps>(), {
  mode: 'default',
  content: '',
  getRichText: () => {},
});

const editorRef = shallowRef();
const mode = ref(props.mode || 'default'); // 'default' 或 'simple'，simple 模式不会显示选中 toolbar

const emit = defineEmits(['update:content']);

const richContent = computed({
  get() {
    return props.content;
  },
  set(content: string) {
    emit('update:content', content);
  },
});

const editorConfig: { [key: string]: any } = {
  placeholder: '请简明扼要的描述您想要表达的内容...',
};

if (mode.value === 'default') {
  editorConfig.hoverbarKeys = {
    text: {
      // 重写 link 元素的 hoverbar
      menuKeys: [
        'headerSelect',
        'italic', // 斜体文本
        'through', // 删除线文本
        'fontSize',
        'fontFamily',
        'lineHeight',
        'color',
        'bgColor',
        'insertLink',
        'clearStyle',
      ],
    },
  };
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: typeof Editor) => {
  editorRef.value = editor;
  editor.on('modalOrPanelShow', (modalOrPanel: { type?: string; $elem?: HTMLElement[] }) => {
    if (modalOrPanel.type !== 'modal') return;
    const { $elem } = modalOrPanel;
    if ($elem?.[0]) {
      $elem[0].style.top = '150px';
      $elem[0].style.left = '50%';
      $elem[0].style.transform = 'translateX(-50%)';
    }
  });
};

const handleChange = (editor: typeof Editor) => {
  props.getRichText(editor.getHtml());
};
</script>
<style scoped lang="less">
@import '@/styles/index.less';

.ckeditor-container {
  // --w-e-textarea-bg-color: var(--input-bg-color);
  // // --w-e-textarea-bg-color: var(--background);
  // --w-e-toolbar-bg-color: var(--background);
  // --w-e-textarea-color: @font-1;
  // --w-e-toolbar-border-color: var(--card-border);
  // --w-e-toolbar-active-color: var(--el-color-primary-light-9);

  border: 1px solid @border;
  border-radius: 5px;

  .toolbar {
    border-bottom: 1px solid @border;
  }

  .editor {
    border-radius: 5px;
    height: calc(100% - 200px) !important;
  }

  :deep {
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: @border;
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: @border;
    }

    .w-e-text-placeholder {
      color: @font-6;
      top: 10px;
    }

    .w-e-select-list {
      border: none;
      backdrop-filter: blur(5px);
      color: @font-1;
      text-shadow: @border;
      box-shadow: 0 0 5px @border;
    }

    .w-e-select-list ul .selected {
      background-color: @primary;
    }

    .w-e-select-list ul li:hover {
      background-color: @primary;
    }

    a {
      color: @primary-dark-2;
    }

    .w-e-toolbar {
      border-radius: 5px 5px 0 0;
    }

    .w-e-bar {
      background-color: #fff;
      padding: 0;

      svg {
        fill: @font-1;
      }
    }

    .w-e-bar-item {
      color: @font-1;
      border-radius: 5px;
      padding: 4px 5px;

      &:hover {
        button {
          background-color: @primary;
        }
      }

      button {
        color: @font-1;
        border-radius: 5px;
        // padding: 0 8px;
      }
    }

    .w-e-bar-item .disabled svg {
      fill: var(--font-6);
    }

    .w-e-bar-item .active {
      background-color: @primary;
      color: @font-1;
    }

    .w-e-text-container {
      min-height: 300px;
      border-radius: 0 0 5px 5px;
    }

    .w-e-text-container [data-slate-editor] {
      min-height: 300px;
    }

    .w-e-select-list {
      left: -6px;
      bottom: -302px;
    }

    .w-e-bar-item:has(button[data-menu-key='lineHeight']) > .w-e-select-list {
      bottom: auto;
    }

    .w-e-drop-panel {
      right: 16px !important;
      bottom: -291px;
    }

    .w-e-text-container [data-slate-editor] blockquote {
      color: @font-5;
      border-left: 4px solid @primary;
      border-radius: 3px;
    }

    .w-e-text-container [data-slate-editor] pre > code {
      border: 1px solid @border;
      text-shadow: none;
    }

    .w-e-hover-bar {
      padding: 0 5px;

      .w-e-bar-item {
        padding: 0 4px;
      }
    }
  }
}

.w-e-full-screen-container {
  z-index: 999;

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: @border;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: @border;
  }
}
</style>
