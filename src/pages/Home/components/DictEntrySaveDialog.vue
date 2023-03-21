<template>
  <v-dialog
    v-model="vis"
    :scrim="false"
    width="500px"
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
        <v-toolbar-title>新增字典入口</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn :loading="btnLoading" variant="text" @click="save">
            保存
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-text-field
          v-model="formParam.sgeName"
          :rules="rule"
          label="入口名称"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="formParam.sgeCode"
          :rules="rule"
          label="入口编码"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="formParam.sgeValue"
          :rules="rule"
          label="入口内容"
          variant="underlined"
        ></v-text-field>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogOpenClose } from "../../../hooks/useDialog";
import { reactive } from "vue";
import { DictEntry } from "../../../api/dict";
import DictApi from "../../../api/dict";
import { SysStore } from "../../../store/modules/sys";

const emits = defineEmits(["on-save"]);
const { sgtId } = defineProps<{ sgtId: string }>();

const { vis, close, btnLoading, loading, unLoading } = useDialogOpenClose();
const rule = [(v: string) => !!v || "请填写信息"];
const formParam = reactive<Partial<DictEntry>>({
  sgtId: sgtId,
  sgeName: "",
  sgeCode: "",
  sgeValue: "",
});

async function save() {
  loading();
  try {
    const { msg, code } = await DictApi.saveDictEntry(formParam);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    emits("on-save");
    close();
  } catch (e) {
  } finally {
    unLoading();
  }
}
</script>

<style scoped></style>
