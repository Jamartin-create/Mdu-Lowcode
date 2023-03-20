<template>
  <v-dialog v-model="visible" persistent width="800px">
    <v-card>
      <v-card-title>字典入口</v-card-title>
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

const visible = ref<boolean>(false);
const dictEntryList = reactive<DictEntry[]>([]);

function open(sgtId: string) {
  visible.value = true;
  getDataList(sgtId);
}

function close() {
  visible.value = false;
}

async function getDataList(sgtId: string) {
  const { msg, code, data } = await DictApi.getDictEntry(sgtId);
  if (code != 0) {
    SysStore().snackOpen(msg);
    return;
  }
  dictEntryList.splice(0, dictEntryList.length);
  Array.prototype.push.apply(dictEntryList, data);
}

defineExpose({
  open,
});
</script>

<style scoped></style>
