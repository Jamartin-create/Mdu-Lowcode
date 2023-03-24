import { defineStore } from 'pinia'
import { ItemState } from '../interface';
import piniaPersistConfig from '../piniaPersistConfig'
import ItemApi from '../../api/item'
import { ResType } from '../../utils/request'
import { ItemType } from '../../api/item';
import { SysStore } from './sys';


export const ItemStore = defineStore({
    id: "ItemStore",
    state: (): Partial<ItemState> => ({
        curItem: null,
    }),
    getters: {},
    actions: {
        async saveCurItem(params: Partial<ItemType>) {
            try {
                const sysPinia = SysStore();
                if (this.curItem) {
                    sysPinia.snackOpen('请勿重复保存');
                    return;
                }
                const { data: id, msg, code } = await ItemApi.saveItem(params);
                const snO = SysStore().snackOpen;
                if (code != 0) {
                    snO(msg);
                    return;
                }
                {
                    const { data: item, msg, code } = await ItemApi.getItemById(id);
                    if (code != 0) {
                        snO(msg);
                        return;
                    }
                    this.curItem = item;
                    return;
                }
            } catch (e) {
                console.error(e);
            }
        },
        reset() {
            this.$reset();
        }
    },
    persist: piniaPersistConfig("ItemState")
})