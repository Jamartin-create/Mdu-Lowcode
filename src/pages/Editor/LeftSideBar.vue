<template>
  <v-navigation-drawer permanent v-model="drawer" width="180">
    <v-tabs v-model="tab">
      <v-tab value="c">组件</v-tab>
      <v-tab value="m">图层</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="c">
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
      </v-window-item>
      <v-window-item value="m"> 图层 </v-window-item>
    </v-window>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { guid } from "../../utils/common";
import draggable from "vuedraggable";

//tab控制
const tab = ref<"c" | "m">("c");

//拖拽组件控制
const componentList = ref<any[]>([
  {
    id: 1,
    tag: "v-btn",
    tagCN: "按钮",
    props: {
      text: "按钮",
    },
  },
  {
    id: 2,
    tag: "v-card",
    tagCN: "卡片",
    props: {
      title: "标题",
      subtitle: "测试子标题",
      text: "测试内容",
    },
  },
]);
function onClone(data: any) {
  let nD = JSON.parse(JSON.stringify(data));
  console.log(nD);
  nD.id = guid();
  return nD;
}

//组件开合控制
const drawer = ref<boolean>(true);
defineExpose({
  open: () => (drawer.value = true),
  close: () => (drawer.value = false),
});
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
