import { number } from 'echarts';
import { ref } from 'vue';

export function useDialogOpenClose() {
    const vis = ref<boolean>(false);
    const btnLoading = ref<boolean>(false);
    return {
        vis,
        open: function () {
            vis.value = true;
        },
        close: function () {
            vis.value = false;
        },
        btnLoading,
        loading: function () {
            btnLoading.value = true;
        },
        unLoading: function () {
            btnLoading.value = false;
        }
    }
}


export function useFormBase() {
    function reset(formParams: any) {
        Object.keys(formParams).forEach((keys, id) => {
            if (Array.isArray(formParams[keys])) {
                formParams[keys].splice(0, formParams[keys].length);
            } else {
                formParams[keys] = null;
            }
        })
    }
    return {
        reset
    }
}