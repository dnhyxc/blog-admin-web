<!--
 * 前台用户统计图
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="tag-chart-wrap">
    <Content>
      <template #title>
        <div class="title">用户统计</div>
      </template>
      <template #content>
        <div id="tag-chart" style="width: 100%; height: 100%"></div>
      </template>
    </Content>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import Content from '@/components/Content/index.vue';

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<TooltipComponentOption | GridComponentOption | BarSeriesOption>;

onMounted(() => {
  getTagChart();
});

// tag 树状图处理
const getTagChart = () => {
  const chartDom = document.getElementById('tag-chart')!;
  const myChart = echarts.init(chartDom);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
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
        data: ['JavaScript', 'React', 'Vue', 'Node', 'MongoDB', 'Webpack', 'Vite', 'Next.js'],
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
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220, 110],
      },
    ],
  };

  option && myChart.setOption(option);
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.tag-chart-wrap {
  width: 100%;
  height: 100%;

  .title {
    padding-top: 10px;
  }
}
</style>
