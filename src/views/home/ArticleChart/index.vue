<!--
 * 文章统计
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="article-chart-wrap">
    <Content>
      <template #title>
        <div class="title">文章统计</div>
      </template>
      <template #content>
        <div id="article_chart" style="width: 100%; height: 100%"></div>
      </template>
    </Content>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { homeStore } from '@/store';
import Content from '@/components/Content/index.vue';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

onMounted(() => {
  getArticleChart();
});

// 文章统计折线图处理
const getArticleChart = () => {
  const chartDom = document.getElementById('article_chart')!;
  const myChart = echarts.init(chartDom);

  const option: EChartsOption = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    // title: {
    //   text: '',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: homeStore.articleStatisticYears,
    },
    // 下载按钮设置
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],

    series: homeStore.articleStatisticYears.map((i) => {
      return {
        name: i,
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: homeStore.articleStatisticData[i].map((i: any) => i.count),
      };
    }),
  };

  option && myChart.setOption(option);
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.article-chart-wrap {
  .title {
    padding-bottom: 10px;
    padding-top: 10px;
  }
}
</style>
