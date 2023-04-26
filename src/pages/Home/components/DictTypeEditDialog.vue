<template>
  <v-dialog v-model="vis" persistent width="500px">
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props">编辑</v-btn>
    </template>
    <v-card>
      <v-toolbar dard>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>字典类型编辑</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn :loading="btnLoading" variant="text" @click="save">
            保存
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
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
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <dict-entry-save-dialog
          :sgt-id="props.sgtId"
          @on-save="getDataList()"
        />
      </v-card-actions>
      <v-card-text>
        <v-table :density="'comfortable'">
          <thead>
            <tr>
              <th class="text-left">入口名称</th>
              <th class="text-left">入口编号</th>
              <th class="text-left">入口值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in dictEntryList" :key="entry.sgeId">
              <td>{{ entry.sgeName }}</td>
              <td>{{ entry.sgeCode }}</td>
              <td>{{ entry.sgeValue }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import DictApi, { DictEntry } from "../../../api/dict";
import { SysStore } from "../../../store/modules/sys";
import DictEntrySaveDialog from "./DictEntrySaveDialog.vue";
import { useDialogOpenClose } from "../../../hooks/useDialog";
import { DictType } from "../../../api/dict";

const emits = defineEmits(["on-save"]);

//需要编辑的部分
const rule = [(v: string) => !!v || "请填写信息"];
const reqParam = reactive<Partial<DictType>>({
  sgtId: "",
  sgtCode: "",
  sgtName: "",
});
//获取字典类型信息
async function getDictType() {
  const {
    msg,
    code,
    data: [dictType],
  } = await DictApi.getDictType({
    sgtId: props.sgtId,
  });
  if (code != 0) {
    SysStore().snackOpen(msg);
    return;
  }
  reqParam.sgtCode = dictType.sgtCode;
  reqParam.sgtName = dictType.sgtName;
}
//保存字典更新信息
async function save() {
  btnLoading.value = true;
  try {
    reqParam.sgtId = props.sgtId;
    const { code, msg } = await DictApi.updateDictType(reqParam);
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

const { vis, close, btnLoading } = useDialogOpenClose();

//监听props参数变化
const props = defineProps<{
  sgtId: string;
}>();
watch(
  () => props.sgtId,
  () => {
    getDataList();
    getDictType();
  },
  { immediate: true }
);

//获取字典入口列表
const dictEntryList = ref<DictEntry[]>([]);
async function getDataList() {
  const { msg, code, data } = await DictApi.getDictEntry(props.sgtId);
  if (code != 0) {
    SysStore().snackOpen(msg);
    return;
  }
  dictEntryList.value = data;
}
</script>

<style scoped></style>
