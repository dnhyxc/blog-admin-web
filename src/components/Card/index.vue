<template>
  <div
    :class="classname(className, 'card-wrap')"
    :style="width ? { width: `${width}px`, height: `${height}px`, flex: 'none' } : { height: `${height}px` }"
    @click="onClick"
  >
    <slot name="img"></slot>
    <slot name="title"></slot>
    <slot name="content"></slot>
    <slot name="article-info"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import classname from 'classname';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  onClick?: Function;
}

const props = defineProps<IProps>();

const onClick = () => {
  props?.onClick?.();
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.card-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 110px;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  background-image: linear-gradient(-45deg, #a1c4fd 0%, #c2e9fb 100%);
  box-shadow: 0 0 10px @info-light-5;

  &:last-child {
    margin-right: 0;
  }

  .article-info {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
