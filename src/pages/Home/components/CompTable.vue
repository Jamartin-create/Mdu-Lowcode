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
          <tr v-for="comp in compList" :key="(comp.compId as string)">
            <td>{{ comp.compName }}</td>
            <td>{{ comp.compTitle }}</td>
            <td>{{ comp.compType }}</td>
            <td>配置项</td>
            <td>样式表</td>
            <td>数据源配置</td>
            <td>
              <CompDetailDialog :compId="comp.compId!" />
              <v-btn variant="text" @click="delOne(comp.compId as string)">
                删除
              </v-btn>
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
import { onMounted, reactive } from "vue";
import { SysStore } from "../../../store/modules/sys";
import CompEditDialog from "./CompEditDialog.vue";
import CompApi, { CompType } from "../../../api/comp";
import CompDetailDialog from "./CompDetailDialog.vue";
import CompEditDialogReal from "./CompEditDialogReal.vue";

const compList = reactive<CompType[]>([]);

async function getDataList() {
  const { code, msg, data } = await CompApi.getCompTable();
  if (code != 0) {
    SysStore().snackOpen(msg);
    return;
  }
  compList.splice(0, compList.length);
  Array.prototype.push.apply(compList, data);
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

onMounted(() => {
  getDataList();
});
</script>

<style scoped></style>
