<!--
 * 滚动置顶图标
 * @author: dnhyxc
 * @since: 2023-02-09
 * index.vue
-->
<template>
  <div class="back-top" @click="onScroll">
    <i class="icon iconfont icon-huojian" />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  onScrollTo: Function;
}

const props = withDefaults(defineProps<IProps>(), {
  onScrollTo: () => {},
});

const onScroll = () => {
  props.onScrollTo();
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.back-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 12px;
  bottom: 50px;
  background-color: @fff;
  box-shadow: 0 0 10px @info-light-3;
  padding: 5px;
  cursor: pointer;
  z-index: 999;
  width: 25px;
  height: 25px;
  border-radius: 5px;

  .icon {
    font-size: 20px;
  }
}
</style>
