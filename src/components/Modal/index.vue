<!--
 * 权限设置弹窗
 * @author: dnhyxc
 * @since: 2023-01-04
 * index.vue
-->
<template>
  <div class="container">
    <el-dialog v-model="visible" :title="title" width="500">
      <div class="content">
        <slot>请向插槽中插入内容</slot>
      </div>
      <template #footer>
        <span class="footer">
          <el-button @click="handleCancel">{{ cancelText }}</el-button>
          <el-button type="primary" @click="onConfirm">{{ onText }}</el-button>
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
  onSubmit: (data?: any) => Promise<any>;
  cancelText?: string;
  onText?: string;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  title: 'title',
  cancelText: '取消',
  onText: '确定',
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
    console.log(res, '111');
    emit('update:visible', false);
  } else {
    console.log(res, '222');
  }
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.container {
  .dialog {
    border: 1px solid red;
  }

  :deep {
    .el-dialog__body {
      padding: 20px;
    }
  }
}
</style>
