<template>
  <v-container>
    <component
      v-for="item in formList"
      :key="item.id"
      :is="item.tag"
      v-model="vModel[name][item.name]"
      v-bind="item.props"
      @click="openDsChoose(item.name)"
    />
  </v-container>
  <DiaChoseDataList ref="diaChoose" @on-chose="chose" />
</template>

<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import { useDict } from "../../../hooks/useDict";
import { replaceArray } from "../../../utils/common";
import DiaChoseDataList from "./DiaChoseDataList.vue";

const diaChoose = ref<InstanceType<typeof DiaChoseDataList>>();

const { list, vModel, name } = defineProps<{
  list: any[];
  vModel: any;
  name: string;
}>();

const formList = reactive<any[]>([]);
function updateList() {
  replaceArray(
    formList,
    list.map((item) => {
      const el: any = {
        id: item.id,
        name: item.name,
        props: {
          label: item.text,
          variant: "underlined",
          density: "comfortable",
        },
      };
      if (item.type == "text") {
        el.tag = "v-text-field";
      } else if (item.type == "select") {
        el.tag = "v-select";
        el.props["item-title"] = "sgeName";
        el.props["item-value"] = "sgeValue";
        const { dictEntryList, getDictEntryByID } = useDict();
        getDictEntryByID(item.selectGroup);
        el.props.items = dictEntryList;
      }
      return el;
    })
  );
}

function chose(dtId: string) {
  vModel[name]["datasourceid"] = dtId;
}

function openDsChoose(elName: string) {
  if (elName != "datasourceid") return;
  diaChoose.value?.open();
}

watch(
  () => list,
  (n) => {
    updateList();
  },
  { deep: true, immediate: true }
);
</script>

<style scoped></style>
