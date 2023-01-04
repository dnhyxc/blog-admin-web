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
        <el-icon class="warn-icon"><WarningFilled /></el-icon>{{ content }}
      </div>
      <template #footer>
        <span class="footer">
          <el-button class="btn" @click="handleCancel">{{ cancelText }}</el-button>
          <el-button class="btn" type="primary" @click="onConfirm">{{ onText }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WarningFilled } from '@element-plus/icons-vue';

interface IProps {
  visible: boolean;
  title: string;
  onSubmit: (data?: any) => void;
  onCancel?: (data?: any) => void;
  content?: string;
  cancelText?: string;
  onText?: string;
  width?: string;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  title: 'title',
  cancelText: '取消',
  onText: '确定',
  width: '350',
  content: '',
  onCancel: () => {},
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
const onConfirm = () => {
  props.onSubmit();
  emit('update:visible', false);
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.container {
  :deep {
    .el-dialog__body {
      padding: 20px;
    }
  }

  .content {
    display: flex;
    align-items: center;
    padding: 0 10px;

    .warn-icon {
      margin-top: -2px;
      margin-right: 10px;
      font-size: 25px;
      color: @warning;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;

    .btn {
      flex: 1;
    }
  }
}
</style>
