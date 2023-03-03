<template>
  <div id="test" :style="{ height: '200px', width: '300px' }"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { nextTick } from "vue";

nextTick(() => {
  const myChart = echarts.init(document.getElementById("test")!);
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
});
</script>

<style scoped></style>
