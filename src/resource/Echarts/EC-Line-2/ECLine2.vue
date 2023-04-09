<template>
  <div ref="Line" :style="{ width: '100%', height: '200px' }"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
          dev_id: ds.devId.join(","),
          data_code: ds.dataCode,
        },
      });
      options.value = data;
      console.log(data);
    }
  } catch (e) {
    console.error(e);
  }
}

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
