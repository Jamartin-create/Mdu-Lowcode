<template>
  <div ref="Line" :style="{ width: '100%', height: '200px' }"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCharts } from "../../../hooks/useCharts";
import type { EChartsOption } from "echarts";
import { onMounted } from "vue";
import { watch } from "vue";

const Line = ref();

const { updateEchart } = useCharts(Line);

const props = withDefaults(
  defineProps<{
    title?: string;
    data?: any;
  }>(),
  {
    title: "原始数据",
    data: {
      labels: ["牛奶", "橙汁", "草莓波波"],
      values: [1000, 2000, 3000],
    },
  }
);

function getOption() {
  const option: EChartsOption = {
    title: {
      text: props.title,
    },
    // tooltip: {
    //   trigger: "item",
    //   formatter: function (params: any) {
    //     return "value:" + params.value;
    //   },
    // },
    xAxis: {
      type: "category",
      data: props.data.labels,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: props.data.values,
      },
    ],
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
