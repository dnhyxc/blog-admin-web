<template>
  <div class="setting">
    <PreviewSet
      v-model:layout="layout"
      v-model:layoutSet="layoutSet"
      :card-layout="cardLayout"
      :checked-imgs="checkedImgs"
    />
    <CardSet v-model:cardLayout="cardLayout" :layout="layout" :layout-set="layoutSet" :checked-imgs="checkedImgs" />
    <Coverset v-model:checkedImgs="checkedImgs" :layout="layout" :layout-set="layoutSet" :card-layout="cardLayout" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PreviewSet from './PreviewSet/index.vue';
import CardSet from './CardSet/index.vue';
import Coverset from './CoverSet/indev.vue';

const layout = ref(1); // 页面布局设置 1：上下布局，2：左右布局
const layoutSet = ref(1); // 是否开启布局切换 1：开启，2：不开启
const cardLayout = ref(1); // 卡片布局模式 1：左右布局，2：上下布局
const checkedImgs = ref([]); // 选择的首页封面图
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.setting {
  .layoutStyles();
  padding-right: 2px;
}
</style>
