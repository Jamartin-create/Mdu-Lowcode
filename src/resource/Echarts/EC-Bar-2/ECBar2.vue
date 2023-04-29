<template>
  <div ref="Bar2" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCharts, useChartData } from "../../../hooks/useCharts";
import type { EChartsOption } from "echarts";
import { onMounted } from "vue";
import { watch } from "vue";

const Bar2 = ref();

const { updateEchart } = useCharts(Bar2);

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
      text: props.title || "单设备多数据字段条形图",
    },
    legend: {
      data: ["数据1", "数据2"],
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["设备1", "设备2", "设备3", "设备4"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "数据1",
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        data: [500, 1000, 1200, 567],
      },
      {
        name: "数据2",
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        data: [500, 1000, 1200, 567],
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
