<template>
  <v-dialog
    v-model="vis"
    :scrim="false"
    width="1000px"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn variant="tonal" v-bind="props">新增</v-btn>
    </template>
    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>新增物料</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn :loading="btnLoading" variant="text" @click="save">
            保存
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card variant="flat">
              <v-card-title>物料信息配置</v-card-title>
              <v-card-text>
                <v-container>
                  <v-select
                    v-model="formParams.compType"
                    label="物料类型"
                    :items="dictEntryList"
                    item-title="sgeName"
                    item-value="sgeValue"
                    variant="underlined"
                    density="comfortable"
                  ></v-select>
                  <v-text-field
                    v-model="formParams.compName"
                    label="物料名称"
                    variant="underlined"
                    density="comfortable"
                  ></v-text-field>
                  <v-text-field
                    v-model="formParams.compTitle"
                    label="物料标题"
                    variant="underlined"
                    density="comfortable"
                  ></v-text-field>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-list lines="two" subheader>
              <v-list-subheader>物料信息配置</v-list-subheader>
            </v-list>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useDialogOpenClose, useFormBase } from "../../../hooks/useDialog";
import { reactive, ref } from "vue";
import { useDict } from "../../../hooks/useDict";
import { CompType } from "../../../api/comp";
import { SysStore } from "../../../store/modules/sys";
import CompApi from "../../../api/comp";

const emits = defineEmits(["on-save"]);
const { dictEntryList, getDictEntryByCode } = useDict();
getDictEntryByCode("COMP_TYPE");

const formParams = reactive<Partial<CompType>>({
  compName: null,
  compTitle: null,
  compType: null,
  dataSourceId: null,
  compProps: [],
  compStyles: [],
});

const { vis, close, btnLoading, loading, unLoading } = useDialogOpenClose();
const { reset } = useFormBase();

async function save() {
  loading();
  try {
    const { code, msg } = await CompApi.saveComp(formParams);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    SysStore().snackOpen("成功");
    reset(formParams);
    emits("on-save");
    close();
  } catch (e) {
    console.error(e);
  } finally {
    unLoading();
  }
}
</script>

<style scoped></style>
