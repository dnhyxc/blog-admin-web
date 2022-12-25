<!--
 * 分类图
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="classify-chart">
    <Content>
      <template #title>
        <div class="title">分类统计</div>
      </template>
      <template #content>
        <div id="classify_chart" style="width: 100%; height: 100%"></div>
      </template>
    </Content>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, TooltipComponentOption, LegendComponent, LegendComponentOption } from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Content from '@/components/Content/index.vue';

// 饼图配置
echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);
type EChartsOption = echarts.ComposeOption<TooltipComponentOption | LegendComponentOption | PieSeriesOption>;

// onMounted声明周期函数
onMounted(() => {
  getClassifyChart();
});

// 分类统计图处理
const getClassifyChart = () => {
  const chartDom = document.getElementById('classify_chart')!;
  const myChart = echarts.init(chartDom);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    // 图例
    legend: {
      top: '20',
      left: 'center',
      padding: 0,
    },
    // 饼图设置
    series: [
      {
        name: '分类统计',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'], // 第一个值表示左右/第二个值表示上下
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '前端' },
          { value: 735, name: '后端' },
          { value: 580, name: '架构' },
          { value: 484, name: '设计模式' },
          { value: 300, name: '算法' },
          { value: 300, name: '前端框架' },
          { value: 300, name: '项目部署' },
        ],
      },
    ],
  };

  option && myChart.setOption(option);
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.classify-chart {
  width: 100%;
  height: 100%;
}
</style>
