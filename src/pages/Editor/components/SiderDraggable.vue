<template>
  <draggable
    :list="componentList"
    class="draggable"
    item-key="id"
    :component-data="{ tag: 'v-list' }"
    :group="{ name: 'component', pull: 'clone', put: false }"
    :sort="false"
    :clone="onClone"
  >
    <template #item="{ element }">
      <div class="cmp-wrp">
        {{ element.tagCN }}
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { guid } from "../../../utils/common";

const { componentList } = defineProps<{
  componentList: any[];
}>();

function onClone(data: any) {
  let nD = JSON.parse(JSON.stringify(data));
  nD.id = guid();
  return nD;
}
</script>

<style scoped lang="scss">
.cmp-type {
  margin-top: 10px;
  text-align: center;
}
.cmp-wrp {
  padding: 10px;
  text-align: center;
  cursor: move;
}
.cmp-type:hover,
.cmp-wrp:hover {
  background-color: #ebebeb;
}
.draggable {
  display: flex;
  flex-direction: column;
}
</style>
