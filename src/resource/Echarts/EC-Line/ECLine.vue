<template>
  <div ref="Line" :style="{ width: '100%', height: '320px' }"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCharts, useChartData } from "../../../hooks/useCharts";
import type { EChartsOption } from "echarts";
import { onMounted } from "vue";
import { watch } from "vue";

const Line = ref();

const { updateEchart } = useCharts(Line);

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
      text: props.title || "普通折线图",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["牛奶", "橙汁", "草莓波波"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: [1000, 2000, 3000],
      },
    ],
    ...options.value,
  };
  return option as EChartsOption;
}

onMounted(async () => {
  updateEchart(getOption());
});

// watch(
//   () => props.data,
//   () => {
//     updateEchart(getOption());
//   },
//   { deep: true, immediate: false }
// );
</script>

<style scoped></style>
