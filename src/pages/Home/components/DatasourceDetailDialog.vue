<template>
  <v-dialog v-model="vis" width="600px" transition="dialog-bottom-transition">
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props">详情</v-btn>
    </template>
    <v-card :loading="btnLoading">
      <v-toolbar dard>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>数据源详情</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-card variant="flat">
          <v-card-item>
            <v-card-title>{{ dsInfo.dsTitle }}</v-card-title>
            <v-card-subtitle>数据源类型：默认</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-row>
              <v-col cols="3">动态数据接口：</v-col>
              <v-col>{{ dsInfo.dsApiPath }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="3">监测设备列表：</v-col>
              <v-col>{{ dsInfo.devId?.join(",") }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="3">监测数据字段：</v-col>
              <v-col>{{ dsInfo.dataCode }}</v-col>
            </v-row>
            <v-row v-if="dsInfo.dsStaticDatas">
              <v-col cols="3">静态数据：</v-col>
              <v-col>
                <v-json-edit
                  class="json-edit"
                  height="150"
                  :mainMenuBar="false"
                  :statusBar="false"
                  :navigationBar="false"
                  mode="text"
                  readOnly
                  v-model="dsInfo.dsStaticDatas"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogOpenClose } from "../../../hooks/useDialog";
import { watch, ref, onMounted } from "vue";
import VJsonEdit from "vue3-ts-jsoneditor";
import { SysStore } from "../../../store/modules/sys";
import DataSourceApi from "../../../api/datasource";
const { vis, close, btnLoading, loading, unLoading } = useDialogOpenClose();

const props = defineProps<{
  dsId: string;
}>();

const dsInfo = ref<any>({});
//获取物料信息
async function getDsDetail() {
  try {
    loading();
    const { code, msg, data } = await DataSourceApi.getOneById(props.dsId);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    dsInfo.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    unLoading();
  }
}

watch(
  () => vis.value,
  (n) => n && getDsDetail()
);
</script>

<style scoped lang="scss">
:deep(.json-edit) {
  .cm-gutters {
    display: none;
  }
  .jse-contents {
    border-radius: 12px;
    border-top: 1px solid #d7d7d7;
  }
  .jse-text-mode.no-main-menu.svelte-1yqirn0.svelte-1yqirn0 {
    border-top: 0px;
  }
}
</style>
