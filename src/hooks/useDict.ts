import DictApi from '../api/dict';
import { SysStore } from '../store/modules/sys';
import { ref } from 'vue';
import { DictType, DictEntry } from '../api/dict';
import { watch } from 'vue';

export function useDict() {
    const dictTypeInfo = ref<Partial<DictType>[]>([]);
    const dictEntryList = ref<Partial<DictEntry>[]>([]);
    watch(() => dictEntryList, (val, oldVal) => { }, { deep: true })
    watch(() => dictTypeInfo, (val, oldVal) => { }, { deep: true })

    async function getEntry(type: string, key: string) {
        try {
            const { code, msg, data } = type == 'id' ? await DictApi.getDictEntry(key) : await DictApi.getDictEntryByCode(key);
            if (code != 0) {
                SysStore().snackOpen(msg);
                return;
            }
            dictEntryList.value = data;
        } catch (e) {
            console.error(e);
        }
    }

    async function getType(params?: Pick<DictType, 'sgtCode' | 'sgtId'>) {
        try {
            const { code, msg, data } = await DictApi.getDictType(params);
            if (code != 0) {
                console.error(msg);
                SysStore().snackOpen('字典查询失败');
                return;
            }
            dictTypeInfo.value = data;
        } catch (e) {
            console.error(e);
        }
    }
    return {
        dictTypeInfo,
        dictEntryList,
        getDictEntryByCode: (code: string) => getEntry('code', code),
        getDictEntryByID: (id: string) => getEntry('id', id),
        getType,
    }
}