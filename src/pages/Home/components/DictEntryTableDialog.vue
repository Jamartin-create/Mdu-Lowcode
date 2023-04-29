<template>
  <v-dialog v-model="vis" persistent width="500px">
    <v-card>
      <v-toolbar dard>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>数据字典类型详情</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="4">字典类型名称：</v-col>
          <v-col>{{ typeInfo.sgtName }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">字典类型编码：</v-col>
          <v-col>{{ typeInfo.sgtCode }}</v-col>
        </v-row>
        <v-table class="mt-2" :density="'comfortable'">
          <thead>
            <tr>
              <th class="text-left">入口名称</th>
              <th class="text-left">入口编号</th>
              <th class="text-left">入口值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in dictEntryList" :key="entry.sgeId">
              <td>{{ entry.sgeName }}</td>
              <td>{{ entry.sgeCode }}</td>
              <td>{{ entry.sgeValue }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import DictApi, { DictEntry } from "../../../api/dict";
import { SysStore } from "../../../store/modules/sys";
import { useDialogOpenClose } from "../../../hooks/useDialog";

const { vis, open, close } = useDialogOpenClose();

const dictEntryList = reactive<DictEntry[]>([]);

const sgt_id = ref<string>("");

function openDia(sgtId: string) {
  open();
  sgt_id.value = sgtId;
  getDataList(sgtId);
}

const typeInfo = reactive({
  sgtName: "",
  sgtCode: "",
});
async function getDataList(sgtId: string) {
  dictEntryList.splice(0, dictEntryList.length);
  const { msg, code, data } = await DictApi.getDictEntry(sgtId);
  const {
    msg: m1,
    code: c1,
    data: type,
  } = await DictApi.getDictType({ sgtId });
  if (code != 0 || c1 != 0) {
    SysStore().snackOpen(code != 0 ? msg : m1);
    return;
  }
  typeInfo.sgtName = type[0].sgtName;
  typeInfo.sgtCode = type[0].sgtCode;
  Array.prototype.push.apply(dictEntryList, data);
}

defineExpose({
  openDia,
});
</script>

<style scoped></style>
