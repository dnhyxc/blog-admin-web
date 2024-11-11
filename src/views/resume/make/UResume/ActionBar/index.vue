<!--
 * module bar
 * @author: dnhyxc
 * @since: 2024-08-18
 * index.vue
-->
<template>
  <div v-if="list.length > 1 && !route.query.preview" class="module-actions">
    <i v-if="index !== 0" class="icon iconfont icon-xs" @click.stop="onMoveUp" />
    <i v-if="index !== list.length - 1" class="icon iconfont icon-xx" @click.stop="onMoveDown" />
    <i class="icon iconfont icon-shanchu" @click.stop="onRemove" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { resumeStore } from '@/store';
import { ResumeInfo } from '@/typings/comment';

interface IProps {
  index: number;
  field: string;
  active?: Partial<ResumeInfo>;
  list: Partial<ResumeInfo>[];
}

const props = defineProps<IProps>();

const route = useRoute();

const onMoveUp = () => {
  resumeStore.swapModule(props.field, props.index, 'up');
};

const onMoveDown = () => {
  resumeStore.swapModule(props.field, props.index, 'down');
};

const onRemove = () => {
  ElMessageBox.confirm('删除后该项内容将不可恢复！', '确定要删除该项吗？').then(() => {
    resumeStore.removeModule(props.field, props.index);
  });
};
</script>
<style scoped lang="less">
@import '@/styles/index.less';

.module-actions {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 99;

  .icon {
    padding: 3px;
    margin-left: 10px;
    cursor: pointer;
    background-color: @primary;
    border-radius: 5px;
    display: none;

    &:hover {
      background-color: @primary-light-3;
    }
  }
}
</style>
