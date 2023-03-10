import { defineStore } from 'pinia'
import { ItemState } from '../interface';
import router from '../../router'
import piniaPersistConfig from '../piniaPersistConfig'
import ItemApi from '../../api/item'
import { ResType } from '../../utils/request'
import { ItemType } from '../../api/item';


export const ItemStore = defineStore({
    id: "ItemStore",
    state: (): Partial<ItemState> => ({
        curItem: null,
    }),
    getters: {},
    actions: {
        async saveCurItem(params: Partial<ItemType>) {
            try {
                if (this.curItem) {
                    //TODO: 消息组件封装好后完善
                    console.log('请勿重复保存');
                    return;
                }
                const { data: id, msg, code } = await ItemApi.saveItem(params);
                console.log(id)
                if (code == 0) {
                    const { data: item, msg, code } = await ItemApi.getItemById(id)
                    this.curItem = item;
                    return;
                }
                console.error(msg);
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