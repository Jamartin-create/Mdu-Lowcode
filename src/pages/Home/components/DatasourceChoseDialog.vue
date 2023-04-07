<template>
  <v-dialog
    v-model="vis"
    :scrim="false"
    width="1200px"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>选择数据源</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card height="500px">
        <v-card-text>
          <v-table density="comfortable">
            <thead>
              <tr>
                <th>编号</th>
                <th>标题</th>
                <th>动态数据API</th>
                <th class="text-center" width="80">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ds in dataList" :key="ds.dsId">
                <td>{{ ds.dsId }}</td>
                <td>{{ ds.dsTitle }}</td>
                <td>{{ ds.dsApiPath }}</td>
                <td>
                  <v-btn variant="text" @click="chose(ds.dsId)"> 选择 </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogOpenClose } from "../../../hooks/useDialog";
import DataSourceApi from "../../../api/datasource";
import { SysStore } from "../../../store/modules/sys";
import { reactive } from "vue";
import { DataSourceType } from "../../../api/datasource";

const emits = defineEmits(["on-chose"]);
const { vis, close, open } = useDialogOpenClose();

const dataList = reactive<DataSourceType[]>([]);

async function getList() {
  try {
    const { code, msg, data } = await DataSourceApi.getList();
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    dataList.splice(0, dataList.length);
    Array.prototype.push.apply(dataList, data);
  } catch (e) {
    console.error(e);
  } finally {
  }
}
function chose(id: string) {
  emits("on-chose", id);
  close();
}

getList();

defineExpose({
  open,
});
</script>

<style scoped></style>
