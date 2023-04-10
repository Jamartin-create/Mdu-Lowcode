<template>
  <v-dialog
    v-model="vis"
    :scrim="false"
    width="600px"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props">详情</v-btn>
    </template>
    <v-card :loading="btnLoading">
      <v-toolbar dard>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>物料详情</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-card variant="flat">
          <v-card-item>
            <v-card-title
              >{{ compInfo.compTitle }} - {{ compInfo.compName }}</v-card-title
            >
            <v-card-subtitle>物料类型：{{ compType }}</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-row>
              <v-col v-if="compInfo.compStyles?.length != 0" cols="24">
                样式配置
                <PropsTable :props-list="compInfo.compStyles" />
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="compInfo.compProps?.length != 0" cols="24">
                属性配置
                <PropsTable :props-list="compInfo.compProps" />
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="compInfo.compDts?.length != 0" cols="24">
                样式配置
                <PropsTable :props-list="compInfo.compDts" /> </v-col
            ></v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogOpenClose } from "../../../hooks/useDialog";
import CompApi from "../../../api/comp";
import { watch, ref } from "vue";
import { SysStore } from "../../../store/modules/sys";
import PropsTable from "./PropsTable.vue";
import { computed } from "vue";
const { vis, close, btnLoading, loading, unLoading } = useDialogOpenClose();

const props = defineProps<{
  compId: string;
}>();

const compInfo = ref<any>({});
//获取物料信息
async function getCompDetail() {
  try {
    loading();
    const { code, msg, data } = await CompApi.getComp(props.compId);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    compInfo.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    unLoading();
  }
}

watch(
  () => vis.value,
  (val) => val && getCompDetail()
);

const compType = computed(() => {
  const ct = compInfo.value.compType;
  return ct == "visual" ? "可视化" : ct == "base" ? "基础" : "表单";
});
</script>

<style scoped></style>
