<template>
  <v-card>
    <v-card-text>
      <v-card-actions>
        <CompEditDialog @on-save="getDataList" />
      </v-card-actions>
      <v-table density="comfortable">
        <thead>
          <tr>
            <th>物料名称</th>
            <th>物料标题</th>
            <th>物料类型</th>
            <th>物料配置信息</th>
            <th>物料样式信息</th>
            <th>数据源</th>
            <th class="text-center" width="230px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comp in compList" :key="comp.compId">
            <td>{{ comp.compName }}</td>
            <td>{{ comp.compTitle }}</td>
            <td>{{ comp.compType }}</td>
            <td>配置项</td>
            <td>样式表</td>
            <td>数据源</td>
            <td>
              <v-btn variant="text"> 详情 </v-btn>
              <v-btn variant="text">删除</v-btn>
              <v-btn variant="text">编辑</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import CompApi from "../../../api/comp";
import { onMounted, reactive } from "vue";
import { SysStore } from "../../../store/modules/sys";
import CompEditDialog from "./CompEditDialog.vue";

const compList = reactive<any[]>([]);

async function getDataList() {
  const { code, msg, data } = await CompApi.getCompList();
  if (code != 0) {
    SysStore().snackOpen(msg);
    return;
  }
  compList.splice(0, compList.length);
  Array.prototype.push.apply(compList, data);
}
onMounted(() => {
  getDataList();
});
</script>

<style scoped></style>
