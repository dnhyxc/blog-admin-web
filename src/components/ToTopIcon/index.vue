<!--
 * 滚动置顶图标
 * @author: dnhyxc
 * @since: 2023-02-09
 * index.vue
-->
<template>
  <div class="to-top" @click="onScroll">
    <el-icon><Top /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { Top } from '@element-plus/icons-vue';

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

.to-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: @fff;
  box-shadow: 0 0 10px @info-light-3;
  padding: 5px;
  cursor: pointer;
  z-index: 999;
  height: 20px;
  width: 20px;
  line-height: 20px;
  border-radius: 5px;

  .to-icon {
    font-size: 30px;
  }
}
</style>
