<!--
 * 前台用户统计图
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="register-chart-wrap">
    <Content>
      <template #title>
        <div class="title">用户注册统计</div>
      </template>
      <template #content>
        <div id="tag-chart" style="width: 100%; height: 100%"></div>
      </template>
    </Content>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { homeStore } from '@/store';
import Content from '@/components/Content/index.vue';

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<TooltipComponentOption | GridComponentOption | BarSeriesOption>;

// 使用shallowRef，不将chart属性设置为响应式，防止报错
const myChart = shallowRef();

onMounted(() => {
  getTagChart();
  window.addEventListener('resize', onResizeChart, false);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResizeChart, false);
});

// 刷新
const onResizeChart = () => {
  myChart.value?.resize();
};

// tag 树状图处理
const getTagChart = () => {
  const chartDom = document.getElementById('tag-chart')!;
  myChart.value = echarts.init(chartDom);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: '{b}: 用户注册量 {c} 人',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: homeStore.registerStatistic?.map((i) => i.month),
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '用户注册量',
        type: 'bar',
        barWidth: '60%',
        data: homeStore.registerStatistic?.map((i) => i.count),
      },
    ],
  };

  option && myChart.value?.setOption(option);
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.register-chart-wrap {
  width: 100%;
  height: 100%;

  .title {
    padding-top: 10px;
  }
}
</style>
