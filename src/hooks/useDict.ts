import DictApi from '../api/dict';
import { SysStore } from '../store/modules/sys';
import { reactive } from 'vue';
import { DictType, DictEntry } from '../api/dict';

export function useDict() {
    const dictTypeInfo = reactive<Partial<DictType>[]>([]);
    const dictEntryList = reactive<Partial<DictEntry>[]>([]);

    async function getEntry(type: string, key: string) {
        const { code, msg, data } = type == 'id' ? await DictApi.getDictEntry(key) : await DictApi.getDictEntryByCode(key);
        if (code != 0) {
            console.error(msg);
            SysStore().snackOpen('字典查询失败');
            return;
        }
        dictEntryList.splice(0, dictEntryList.length);
        Array.prototype.push.apply(dictEntryList, data);
    }

    async function getType(params?: Pick<DictType, 'sgtCode' | 'sgtId'>) {
        const { code, msg, data } = await DictApi.getDictType(params);
        if (code != 0) {
            console.error(msg);
            SysStore().snackOpen('字典查询失败');
            return;
        }
        dictTypeInfo.splice(0, dictTypeInfo.length);
        Array.prototype.push.apply(dictTypeInfo, data);
    }
    return {
        dictTypeInfo,
        dictEntryList,
        getDictEntryByCode: (code: string) => getEntry('code', code),
        getDictEntryByID: (id: string) => getEntry('id', id),
        getType,
    }
}