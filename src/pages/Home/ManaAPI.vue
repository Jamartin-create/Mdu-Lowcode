<template>
  <v-app class="container">
    <v-card elevation="0">
      <v-card-title>数据源管理</v-card-title>
      <v-card-text>
        <v-card-actions>
          <DataSourceSaveDialog @on-save="getDsList" />
        </v-card-actions>
        <v-table density="comfortable">
          <thead>
            <tr>
              <th>数据源ID</th>
              <th>数据源标题</th>
              <th>数据源静态数据</th>
              <th>数据源动态API地址</th>
              <th class="text-center" width="230px">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ds in dsList" :key="ds.dsId">
              <td>{{ ds.dsId }}</td>
              <td>{{ ds.dsTitle }}</td>
              <td>静态数据</td>
              <td>{{ ds.dsApiPath }}</td>
              <td>
                <v-btn variant="text">详情</v-btn>
                <v-btn variant="text"> 删除 </v-btn>
                <v-btn variant="text">编辑</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import DataSourceApi, { DataSourceType } from "../../api/datasource";
import { SysStore } from "../../store/modules/sys";
import { replaceArray } from "../../utils/common";
import DataSourceSaveDialog from "./components/DatasourceSaveDialog.vue";
const dsList = reactive<DataSourceType[]>([]);

async function getDsList() {
  try {
    const { code, msg, data } = await DataSourceApi.getList();
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    replaceArray(dsList, data);
  } catch (e) {
    console.error(e);
  }
}

getDsList();
</script>

<style scoped></style>
