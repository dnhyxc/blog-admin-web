<!--
 * 权限设置弹窗
 * @author: dnhyxc
 * @since: 2023-01-04
 * index.vue
-->
<template>
  <div class="container">
    <el-dialog v-model="visible" :title="title" :width="width">
      <div class="content">
        <slot>请向插槽中插入内容</slot>
      </div>
      <template v-if="needFooter" #footer>
        <span class="footer">
          <el-button :disabled="disabled" type="primary" @click="onConfirm">{{ onText }}</el-button>
          <el-button @click="handleCancel">{{ cancelText }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  visible: boolean;
  title: string;
  onSubmit?: (data?: any) => any;
  cancelText?: string;
  onText?: string;
  needFooter?: boolean;
  width?: number;
  contentPadding?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  title: 'title',
  cancelText: '取消',
  onText: '确定',
  needFooter: true,
  onSubmit: () => {},
  width: 500,
  contentPadding: '20px',
});

const visible = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit('update:visible', visible);
  },
});

const emit = defineEmits<Emits>();

// 取消
const handleCancel = () => {
  emit('update:visible', false);
};

// 确定
const onConfirm = async () => {
  const res = await props.onSubmit();
  if (res) {
    emit('update:visible', false);
  }
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.container {
  :deep {
    .el-dialog__body {
      padding: v-bind(contentPadding);
    }
  }
}
</style>
