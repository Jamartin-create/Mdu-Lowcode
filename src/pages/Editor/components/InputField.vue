<template>
  <v-container>
    <component
      v-for="item in formList"
      :key="item.id"
      :is="item.tag"
      v-model="vModel.props[item.name]"
      v-bind="item.props"
    />
  </v-container>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useDict } from "../../../hooks/useDict";
import { replaceArray } from "../../../utils/common";

const { list, vModel } = defineProps<{
  list: any[];
  vModel: any;
}>();

console.log(list, vModel.props);
const formList = reactive<any[]>([]);
function updateList() {
  console.log(list, vModel.props);
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
watch(
  () => list,
  (n) => {
    updateList();
  },
  { deep: true, immediate: false }
);
</script>

<style scoped></style>
