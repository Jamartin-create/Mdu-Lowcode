<template>
  <div ref="Full" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCharts, useChartData } from "../../../hooks/useCharts";
import type { EChartsOption } from "echarts";
import { onMounted } from "vue";
import { watch } from "vue";
import { SysStore } from "../../../store/modules/sys";

const Full = ref();

const { updateEchart } = useCharts(Full);

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
    ...options.value,
  };
  return option as EChartsOption;
}

onMounted(async () => {
  updateEchart(getOption());
});
</script>

<style scoped></style>
