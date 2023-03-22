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
          <v-col cols="3">
            <v-card variant="flat">
              <v-card-title>物料基础信息配置</v-card-title>
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
                  <v-text-field
                    :disabled="formParams.compType != 'visual'"
                    v-model="formParams.dataSourceId"
                    label="数据源Id"
                    variant="underlined"
                    density="comfortable"
                  ></v-text-field>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-divider></v-divider>
            <v-tabs v-model="tab">
              <v-tab value="props">Props</v-tab>
              <v-tab value="styles">Styles</v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item value="props">
                <OptionsListForm ref="propsList" />
              </v-window-item>
              <v-window-item value="styles">
                <OptionsListForm ref="stylesList" />
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import OptionsListForm from "./OptionsListForm.vue";
import { useDialogOpenClose, useFormBase } from "../../../hooks/useDialog";
import { reactive, ref } from "vue";
import { useDict } from "../../../hooks/useDict";
import { CompType } from "../../../api/comp";
import { SysStore } from "../../../store/modules/sys";
import CompApi from "../../../api/comp";

const emits = defineEmits(["on-save"]);
const { dictEntryList, getDictEntryByCode } = useDict();
getDictEntryByCode("COMP_TYPE");

const propsList = ref<InstanceType<typeof OptionsListForm>>();
const stylesList = ref<InstanceType<typeof OptionsListForm>>();

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

const tab = ref<string>("props");

async function save() {
  loading();
  try {
    formParams.compProps = propsList.value?.formList;
    formParams.compStyles = stylesList.value?.formList;
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
