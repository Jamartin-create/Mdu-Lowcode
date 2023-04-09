import type { Ref } from 'vue'
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import { onUnmounted } from 'vue';
import DataSourceApi from '../api/datasource';
import { SysStore } from '../store/modules/sys';
import MQAPIApi from '../api/mysql_api';
import { ref } from 'vue';

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


export function useChartData() {
    const options = ref<any>({});
    async function getData(id: string) {
        try {
            const { code, msg, data: ds } = await DataSourceApi.getOneById(id);
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
                if (code != 0) {
                    SysStore().snackOpen(msg);
                    return;
                }
                options.value = data;
            }
        } catch (e) {
            console.error(e);
        }
    }
    return { options, getData };
}