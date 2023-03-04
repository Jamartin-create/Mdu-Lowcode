<template>
  <div ref="ChartEl" :style="{ width: '100%', height: '200px' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { EChartsOption } from "echarts";
import { useCharts } from "../../hooks/useCharts";
const ChartEl = ref<ElRef>();
const { updateEchart } = useCharts(ChartEl);
function getOption() {
  const option: EChartsOption = {
    title: {
      text: "测试条形图",
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return "value:" + params.value;
      },
    },
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
  };
  return option as EChartsOption;
}
onMounted(async () => {
  updateEchart(getOption());
});
</script>

<style scoped></style>
