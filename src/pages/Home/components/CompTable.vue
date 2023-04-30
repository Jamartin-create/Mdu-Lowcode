<template>
  <v-card>
    <v-card-text class="table-wrapper">
      <v-card-actions>
        <CompEditDialog @on-save="getDataList" />
      </v-card-actions>
      <v-table density="comfortable" hover style="min-width: 800px">
        <thead>
          <tr>
            <th>物料名称</th>
            <th>物料标题</th>
            <th>物料类型</th>
            <th>创建时间</th>
            <th class="text-center" width="230px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comp in compList" :key="(comp.compId as string)">
            <td>{{ comp.compName }}</td>
            <td>{{ comp.compTitle }}</td>
            <td>{{ comp.compType }}</td>
            <td>{{ formatDate((comp as any).createTime) }}</td>
            <td>
              <CompDetailDialog :compId="comp.compId!" />
              <DeleteConfirm @confirm="delOne(comp.compId as string)" />
              <CompEditDialogReal
                :compId="comp.compId!"
                @on-save="getDataList"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, provide, computed } from "vue";
import { SysStore } from "../../../store/modules/sys";
import CompEditDialog from "./CompEditDialog.vue";
import CompApi, { CompType } from "../../../api/comp";
import CompDetailDialog from "./CompDetailDialog.vue";
import CompEditDialogReal from "./CompEditDialogReal.vue";
import DeleteConfirm from "../../../components/DialogComponents/DeleteConfirm.vue";
import { useDict } from "../../../hooks/useDict";
import { dateFormat } from "../../../utils/common";

const compList = reactive<CompType[]>([]);

async function getDataList() {
  try {
    const { code, msg, data } = await CompApi.getCompTable();
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    compList.splice(0, compList.length);
    Array.prototype.push.apply(compList, data);
  } catch (e) {
    console.error(e);
  }
}

async function delOne(id: string) {
  try {
    const { code, msg } = await CompApi.delComp(id);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    SysStore().snackOpen("成功");
    getDataList();
  } catch (e) {
    console.log(e);
  }
}

const { dictEntryList, getDictEntryByCode } = useDict();
provide("dictEntryList", dictEntryList);

const formatDate = computed(() => {
  return function (time: number) {
    return dateFormat(new Date(time), "yyyy-MM-dd HH:mm:ss");
  };
});

onMounted(async () => {
  await getDataList();
  await getDictEntryByCode("COMP_TYPE");
});
</script>

<style scoped lang="scss">
.table-wrapper {
  overflow-x: auto;
}
</style>
