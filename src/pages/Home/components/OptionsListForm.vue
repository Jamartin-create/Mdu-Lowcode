<template>
  <v-container no-gutters>
    <v-row
      class="form-list-row"
      v-for="(form, idx) in formList"
      :key="form.id"
      align="center"
    >
      <v-col cols="1">{{ idx + 1 }}</v-col>
      <v-col>
        <v-text-field
          :disabled="idx != formList.length - 1"
          v-model="form.name"
          label="名称"
          variant="underlined"
          density="comfortable"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :disabled="idx != formList.length - 1"
          v-model="form.text"
          label="标题"
          variant="underlined"
          density="comfortable"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          :disabled="idx != formList.length - 1"
          v-model="form.type"
          label="类型"
          :items="dictEntryList"
          item-title="sgeName"
          item-value="sgeValue"
          variant="underlined"
          density="comfortable"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :disabled="form.type != 'select' || idx != formList.length - 1"
          v-model="form.selectGroup"
          label="选项组"
          :items="dictTypeInfo"
          item-title="sgtName"
          item-value="sgtId"
          variant="underlined"
          density="comfortable"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn
          v-if="idx == formList.length - 1"
          size="x-small"
          icon="mdi-minus"
          variant="tonal"
          @click="delOne(idx)"
        ></v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        size="x-small"
        icon="mdi-plus"
        variant="tonal"
        @click="addNewOne"
      ></v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useDict } from "../../../hooks/useDict";
import { SysStore } from "../../../store/modules/sys";

const { dictEntryList, getDictEntryByCode, dictTypeInfo, getType } = useDict();
getDictEntryByCode("INPUT_TYPE");
getType();

type FormInfo = {
  id: number;
  text: string;
  name: string;
  type: string | null;
  selectGroup: string | null;
};

let curIdx = 1;
const formList = reactive<FormInfo[]>([]);

function addNewOne() {
  if (formList.length > 0) {
    const { id, name, text, type, selectGroup } = formList[formList.length - 1];
    if (!id || !name || !text || !type || (type == "select" && !selectGroup)) {
      SysStore().snackOpen("请完整填写最新配置项");
      return;
    }
  }
  formList.push({
    id: curIdx++,
    text: "",
    name: "",
    type: null,
    selectGroup: null,
  });
}

function delOne(id: number) {
  formList.splice(id, 1);
}

defineExpose({
  formList,
});

addNewOne();
</script>

<style scoped lang="scss"></style>
