<template>
  <v-dialog v-model="vis" width="400px" transition="dialog-bottom-transition">
    <template v-slot:activator="{ props }">
      <v-btn variant="tonal" v-bind="props">新增</v-btn>
    </template>
    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>新增字典项</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn :loading="btnLoading" variant="text" @click="save">
            保存
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-text-field
          :rules="rule"
          v-model="reqParam.sgtName"
          label="字典类型名称"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          :rules="rule"
          v-model="reqParam.sgtCode"
          label="字典类型编码"
          variant="underlined"
        ></v-text-field>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogOpenClose } from "../../../hooks/useDialog";
import { reactive, ref } from "vue";
import { DictType } from "../../../api/dict";
import DictApi from "../../../api/dict";
import { SysStore } from "../../../store/modules/sys";

const { vis, close } = useDialogOpenClose();
const emits = defineEmits(["on-save"]);

const btnLoading = ref<boolean>(false);

const rule = [(v: string) => !!v || "请填写信息"];
const reqParam = reactive<Partial<DictType>>({
  sgtCode: "",
  sgtName: "",
});

async function save() {
  btnLoading.value = true;
  try {
    const { code, msg } = await DictApi.saveDictType(reqParam);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    close();
    emits("on-save");
  } catch (e) {
    console.error(e);
  } finally {
    btnLoading.value = false;
  }
}
</script>

<style scoped></style>
