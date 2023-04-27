<template>
  <v-dialog v-model="vis" width="1000px" transition="dialog-bottom-transition">
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props">编辑</v-btn>
    </template>
    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>编辑物料</v-toolbar-title>
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
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-divider></v-divider>
            <v-tabs v-model="tab">
              <v-tab value="props">Props</v-tab>
              <v-tab value="styles">Styles</v-tab>
              <v-tab value="dts" :disabled="formParams.compType != 'visual'">
                DataSrouce
              </v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item value="props">
                <OptionsListForm ref="propsList" :form-list="pl" />
              </v-window-item>
              <v-window-item value="styles">
                <OptionsListForm ref="stylesList" :form-list="sl" />
              </v-window-item>
              <v-window-item value="dts">
                <OptionsListForm ref="dsList" :form-list="dl" />
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DatasourceChoseDialog ref="dsChoseDia" @on-chose="choseDataSource" />
  </v-dialog>
</template>
<script setup lang="ts">
import OptionsListForm from "./OptionsListForm.vue";
import { useDialogOpenClose, useFormBase } from "../../../hooks/useDialog";
import { reactive, ref, watch, inject } from "vue";
import { CompType } from "../../../api/comp";
import { SysStore } from "../../../store/modules/sys";
import CompApi from "../../../api/comp";
import DatasourceChoseDialog from "./DatasourceChoseDialog.vue";

const { vis, close, btnLoading, loading, unLoading } = useDialogOpenClose();
const { reset } = useFormBase();

const emits = defineEmits(["on-save"]);
const dictEntryList = inject("dictEntryList", ref([]));

const dsChoseDia = ref<InstanceType<typeof DatasourceChoseDialog>>();
const propsList = ref<InstanceType<typeof OptionsListForm>>();
const stylesList = ref<InstanceType<typeof OptionsListForm>>();
const dsList = ref<InstanceType<typeof OptionsListForm>>();

const props = defineProps<{
  compId: string;
}>();

watch(
  () => vis.value,
  (n) => {
    if (n) {
      formParams.compId = props.compId;
      getCompById();
    }
  },
  { immediate: false }
);

const formParams = reactive<Partial<CompType>>({
  compId: null,
  compName: null,
  compTitle: null,
  compType: null,
  dataSourceId: null,
  compProps: [],
  compStyles: [],
  compDts: [],
});

const tab = ref<string>("props");

async function save() {
  loading();
  try {
    formParams.compProps = propsList.value?.getFormList() || [];
    formParams.compStyles = stylesList.value?.getFormList() || [];
    formParams.compDts = dsList.value?.getFormList() || [];
    const { code, msg } = await CompApi.updateComp(formParams);
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

const pl = ref<any[]>([]);
const sl = ref<any[]>([]);
const dl = ref<any[]>([]);

async function getCompById() {
  loading();
  try {
    const { code, msg, data } = await CompApi.getComp(formParams.compId!);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    formParams.compName = data.compName;
    formParams.compTitle = data.compTitle;
    formParams.compType = data.compType;
    formParams.dataSourceId = data.dataSourceId;
    propsList.value?.setFormList(data.compProps);
    sl.value = data.compStyles;
    dl.value = data.compDts;
  } catch (e) {
    console.error(e);
  } finally {
    unLoading();
  }
}

function choseDataSource(id: string) {
  formParams.dataSourceId = id;
}
</script>

<style scoped></style>
