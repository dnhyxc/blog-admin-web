<!--
 * 分类图
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="classify-chart">
    <Content v-if="homeStore.classifyList">
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
import { onMounted, onUnmounted, shallowRef } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, TooltipComponentOption, LegendComponent, LegendComponentOption } from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { homeStore } from '@/store';
import Content from '@/components/Content/index.vue';

// 饼图配置
echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);
type EChartsOption = echarts.ComposeOption<TooltipComponentOption | LegendComponentOption | PieSeriesOption>;

// 使用shallowRef，不将chart属性设置为响应式，防止报错
const myChart = shallowRef();

// onMounted声明周期函数
onMounted(() => {
  getClassifyChart();
  window.addEventListener('resize', onResizeChart, false);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResizeChart, false);
});

// 刷新
const onResizeChart = () => {
  myChart.value?.resize();
};

// 分类统计图处理
const getClassifyChart = () => {
  const chartDom = document.getElementById('classify_chart')!;
  myChart.value = echarts.init(chartDom);

  const option: EChartsOption = {
    // 鼠标 hover tip 提示
    // tooltip: {
    //   trigger: 'item',
    //   formatter: '{b}:{c} 篇 ({d}%)',
    // },
    // 图例
    legend: {
      top: '20',
      left: 'center',
      padding: 0,
      type: 'scroll',
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
          formatter: '{b}:{c} 篇 ({d}%)',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data: homeStore.classifyList,
      },
    ],
  };

  option && myChart.value?.setOption(option);
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.classify-chart {
  width: 100%;
  height: 100%;

  .title {
    padding-top: 10px;
  }
}
</style>
