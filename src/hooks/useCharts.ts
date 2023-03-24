import type { Ref } from 'vue'
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import { onUnmounted } from 'vue';

type EchartOption = echarts.EChartsOption | any;
export function useCharts(chartEL: Ref<ElRef | undefined | null>) {
    let chart: Nullable<echarts.EChartsType> = null;
    //挂载后定义一个空的Echart组件
    onMounted(() => {
        if (chartEL.value) {
            chart = echarts.init(chartEL.value)
            chart.clear();
        }
    })
    //组件销毁的同时销毁Echart组件
    onUnmounted(() => {
        if (chart) {
            chart.clear();
            chart.dispose();
        }
    })
    //更新ECharts组件
    function updateEchart(option: EchartOption) {
        try {
            chart?.setOption(option);
        } catch (e) {
            console.error(e);
        }
    }
    return { updateEchart }
}