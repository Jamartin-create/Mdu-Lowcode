import { defineStore } from 'pinia'
import { SysState } from '../interface';


let snackBarTimer: any = null;

export const SysStore = defineStore({
    id: "SysStore",
    state: (): Partial<SysState> => ({
        snackVis: false,
        snackText: '',
    }),
    getters: {},
    actions: {
        snackOpen(text: string) {
            if (!text) return;
            if (snackBarTimer != null) {
                this.snackClose();
            }
            this.snackVis = true;
            this.snackText = text;
            snackBarTimer = setTimeout(() => {
                this.snackClose();
            }, 3000)
        },
        snackClose() {
            this.snackVis = false;
            this.snackText = '';
            snackBarTimer = null;
        },
        reset() {
            this.$reset();
        }
    },
})