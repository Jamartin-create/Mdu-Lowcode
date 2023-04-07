<template>
  <div ref="Line" :style="{ width: '100%', height: '200px' }"></div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useCharts } from "../../../hooks/useCharts";
import type { EChartsOption } from "echarts";
import { onMounted } from "vue";
import { watch } from "vue";
import DataSourceApi from "../../../api/datasource";
import MQAPIApi from "../../../api/mysql_api";
import { SysStore } from "../../../store/modules/sys";

const Line = ref();

const { updateEchart } = useCharts(Line);

const props = defineProps<{
  dts: any;
  styles: any;
  title?: string;
}>();

const options = ref<any>({});
watch(
  () => props,
  async (n) => {
    if (n.dts.type == "sync") {
      await getData();
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

async function getData() {
  try {
    const {
      code,
      msg,
      data: ds,
    } = await DataSourceApi.getOneById(props.dts.datasourceid);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    {
      const { code, msg, data } = await MQAPIApi.getUrlData({
        url: ds.dsApiPath,
        options: {
          dev_id: "5c6e31cf-e5d7-493a-b4f4-41741ff4c167",
          data_code: "WATER_CHANGE0",
        },
      });
      options.value = data;
    }
  } catch (e) {
    console.error(e);
  }
}

function getOption() {
  const option: EChartsOption = {
    title: {
      text: props.title || "普通折线图",
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return "value:" + params.value;
      },
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
