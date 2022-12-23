<template>
  <div
    :class="classname(className, 'card-wrap')"
    :style="width ? { width: `${width}px`, height: `${height}px`, flex: 'none' } : { height: `${height}px` }"
  >
    <div class="title">
      <slot name="title"> title </slot>
    </div>
    <div class="content">
      <slot name="content">content</slot>
    </div>
    <div class="footer">
      <slot name="footer">footer</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import classname from 'classname';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
}

defineProps<IProps>();
</script>

<style lang="less" scoped>
@import '@/styles/color.less';

.card-wrap {
  flex: 1;
  height: 160px;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  background-image: linear-gradient(-45deg, #a1c4fd 0%, #c2e9fb 100%);
  box-shadow: 0 0 10px @info-light-5 !important;

  &:last-child {
    margin-right: 0;
  }

  .title {
  }
}
</style>
