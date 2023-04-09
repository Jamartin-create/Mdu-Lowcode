<template>
  <div ref="Line2" :style="{ width: '100%', height: '320px' }"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCharts, useChartData } from "../../../hooks/useCharts";
import type { EChartsOption } from "echarts";
import { onMounted } from "vue";
import { watch } from "vue";

const Line2 = ref();

const { updateEchart } = useCharts(Line2);

const props = defineProps<{
  dts: any;
  styles: any;
  title?: string;
}>();

const { options, getData } = useChartData();
watch(
  () => props,
  async (n) => {
    if (n.dts.type == "sync") {
      await getData(props.dts.datasourceid);
    }
    if (n.dts.type != "sync") {
      options.value = {};
    }
    updateEchart(getOption());
  },
  {
    deep: true,
    immediate: true,
  }
);

function getOption() {
  const option: EChartsOption = {
    title: {
      text: props.title || "多数据源折线图",
    },
    legend: {
      data: ["数据1", "数据2", "数据3"],
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["10.10", "10.11", "10.12"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        name: "数据1",
        data: [500, 1000, 1200],
      },
      {
        type: "line",
        name: "数据2",
        data: [700, 1100, 1600],
      },
      {
        type: "line",
        name: "数据3",
        data: [900, 1300, 1200],
      },
    ],
    ...options.value,
  };
  return option as EChartsOption;
}

onMounted(async () => {
  updateEchart(getOption());
});
</script>

<style scoped></style>
