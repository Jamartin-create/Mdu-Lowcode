<template>
  <v-dialog v-model="vis" persistent width="800px">
    <v-card>
      <v-card-title>字典入口</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <dict-entry-save-dialog
          :sgtId="sgt_id"
          @on-save="getDataList(sgt_id)"
        />
      </v-card-actions>
      <v-card-text>
        <v-table :density="'comfortable'">
          <thead>
            <tr>
              <th class="text-left">入口Id</th>
              <th class="text-left">入口名称</th>
              <th class="text-left">入口编号</th>
              <th class="text-left">入口值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in dictEntryList" :key="entry.sgeId">
              <td>{{ entry.sgeId }}</td>
              <td>{{ entry.sgeName }}</td>
              <td>{{ entry.sgeCode }}</td>
              <td>{{ entry.sgeValue }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="close"> 关闭 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import DictApi, { DictEntry } from "../../../api/dict";
import { SysStore } from "../../../store/modules/sys";
import DictEntrySaveDialog from "./DictEntrySaveDialog.vue";
import { useDialogOpenClose } from "../../../hooks/useDialog";

const { vis, open, close } = useDialogOpenClose();

const dictEntryList = reactive<DictEntry[]>([]);

const sgt_id = ref<string>("");

function openDia(sgtId: string) {
  open();
  sgt_id.value = sgtId;
  getDataList(sgtId);
}

async function getDataList(sgtId: string) {
  dictEntryList.splice(0, dictEntryList.length);
  const { msg, code, data } = await DictApi.getDictEntry(sgtId);
  if (code != 0) {
    SysStore().snackOpen(msg);
    return;
  }
  Array.prototype.push.apply(dictEntryList, data);
}

defineExpose({
  openDia,
});
</script>

<style scoped></style>
