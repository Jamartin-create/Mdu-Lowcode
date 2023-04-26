<template>
  <v-card :loading="btnLoading">
    <v-card-text>
      <v-card-actions>
        <DictSaveDialog @on-save="getList" />
      </v-card-actions>
      <v-table density="comfortable">
        <thead>
          <tr>
            <th class="text-left">字典类型ID</th>
            <th class="text-left">字典类型名称</th>
            <th class="text-left">字典类型编码</th>
            <th class="text-left">入口数量</th>
            <th class="text-center" width="230px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dict in dictList" :key="dict.sgtId">
            <td>{{ dict.sgtId }}</td>
            <td>{{ dict.sgtName }}</td>
            <td>{{ dict.sgtCode }}</td>
            <td>待定</td>
            <td>
              <v-btn
                variant="text"
                @click="dictEntryTableDia?.openDia(dict.sgtId)"
              >
                详情
              </v-btn>
              <v-btn variant="text" @click="delDict(dict.sgtId)">删除</v-btn>
              <DictTypeEditDialog :sgt-id="dict.sgtId" @on-save="getList" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
  <DictEntryTableDialog ref="dictEntryTableDia" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { SysStore } from "../../../store/modules/sys";
import DictApi, { DictType } from "../../../api/dict";
import DictEntryTableDialog from "./DictEntryTableDialog.vue";
import DictSaveDialog from "./DictSaveDialog.vue";
import DictTypeEditDialog from "./DictTypeEditDialog.vue";

import { useDialogOpenClose } from "../../../hooks/useDialog";
const sysPinia = SysStore();

const { btnLoading, unLoading, loading } = useDialogOpenClose();

const dictList = reactive<DictType[]>([]);

async function getList() {
  const { code, data, msg } = await DictApi.getDictType();
  if (code != 0) {
    sysPinia.snackOpen(msg);
    return;
  }
  dictList.splice(0, dictList.length);
  Array.prototype.push.apply(dictList, data);
}

async function delDict(id: string) {
  loading();
  try {
    const { code, msg } = await DictApi.delDictType(id);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    SysStore().snackOpen("成功");
    getList();
  } catch (e) {
    console.error(e);
  } finally {
    unLoading();
  }
}

const dictEntryTableDia = ref<InstanceType<typeof DictEntryTableDialog>>();

onMounted(() => {
  getList();
});
</script>

<style scoped></style>
