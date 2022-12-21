<template>
  <div class="container">
    <el-popover placement="bottom" :title="title" :width="width" trigger="click">
      <template #reference>
        <slot name="click"></slot>
      </template>
      <div class="content">
        <slot name="content">
          <div>content</div>
        </slot>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

interface IProps {
  title?: string;
  width?: number;
}

// defineProps 用于接收父组件传递过来的 props
// withDefaults 用于给接收的 props 设置默认值
const props = withDefaults(defineProps<IProps>(), {
  width: 200,
});
</script>

<style lang="less" scoped>
.container {
  border: 1px solid red;

  .content {
    border: 1px solid skyblue;
  }
}
</style>
