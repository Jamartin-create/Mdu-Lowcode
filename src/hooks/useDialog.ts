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