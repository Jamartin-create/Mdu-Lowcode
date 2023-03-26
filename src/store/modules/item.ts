import { defineStore } from 'pinia'
import { ItemState } from '../interface';
import piniaPersistConfig from '../piniaPersistConfig'
import ItemApi from '../../api/item'
import { ItemType } from '../../api/item';
import { SysStore } from './sys';
import { GroupType } from '../../api/group';
import GroupApi from '../../api/group';
import { guid } from '../../../server/src/utils/strHandler';


export const ItemStore = defineStore({
    id: "ItemStore",
    state: (): Partial<ItemState> => ({
        curItem: null,
        curItemGroup: null,
    }),
    getters: {},
    actions: {
        async choseOneItem(itemId: string) {
            try {
                const snO = SysStore().snackOpen;
                const { code, msg, data: { item, group } } = await ItemApi.getItemById(itemId);
                if (code != 0) {
                    snO(msg);
                    return;
                }
                this.curItem = item;
                this.curItemGroup = group;
            } catch (e) {
                console.error(e);
            }
        },
        async saveCurItem(params: Partial<ItemType>) {
            try {
                const snO = SysStore().snackOpen;
                if (this.checkItemIsSaved()) {
                    snO('请勿重复保存');
                    return;
                }
                params.groupId = this.curItemGroup?.groupId;
                const { data, msg, code } = await ItemApi.saveItem(params);
                if (code != 0) {
                    snO(msg);
                    return;
                }
                this.curItem = data;
            } catch (e) {
                console.error(e);
            }
        },
        //保存物料组
        async saveGroup(list: any[]) {
            try {
                const snO = SysStore().snackOpen;
                if (!this.curItemGroup) {
                    const { data, msg, code } = await GroupApi.saveGroup({
                        groupJson: list,
                        groupTitle: guid()
                    });
                    if (code != 0) {
                        snO(msg);
                        return;
                    }
                    this.curItemGroup = data;
                    return;
                }
                //编辑
                const { msg, code } = await GroupApi.editGroup({
                    groupId: this.curItemGroup.groupId,
                    groupJson: list,
                });
                if (code != 0) {
                    snO(msg);
                    return;
                }
                this.curItemGroup.groupJson = list;
            } catch (e) {
                console.error(e);
            }
        },
        checkItemIsSaved() {
            return !!this.curItem;
        },
        reset() {
            this.$reset();
        }
    },
    persist: piniaPersistConfig("ItemState")
})