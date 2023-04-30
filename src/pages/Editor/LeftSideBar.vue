<template>
  <v-navigation-drawer permanent v-model="drawer" width="180">
    <v-tabs v-model="tab">
      <v-tab value="c">组件</v-tab>
      <v-tab value="m">图层</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="c">
        <sider-draggable :component-list="baseCompList" />
        <v-divider />
        <sider-draggable :component-list="formCompList" />
        <v-divider />
        <sider-draggable :component-list="visualCompList" />
      </v-window-item>
      <v-window-item value="m"> 图层 </v-window-item>
    </v-window>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import CompApi from "../../api/comp";
import { SysStore } from "../../store/modules/sys";
import SiderDraggable from "./components/SiderDraggable.vue";

//拖拽组件控制
const baseCompList = ref<any[]>([]);
const formCompList = ref<any[]>([]);
const visualCompList = ref<any[]>([]);

async function getCompList() {
  try {
    const { code, msg, data } = await CompApi.getCompList();
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    const bases: any[] = [];
    const forms: any[] = [];
    const visuals: any[] = [];
    (data as any[]).forEach((item) => {
      if (item.type == "base") bases.push(item);
      if (item.type == "form") forms.push(item);
      if (item.type == "visual") visuals.push(item);
    });
    baseCompList.value = bases;
    formCompList.value = forms;
    visualCompList.value = visuals;
  } catch (e) {
    console.error(e);
  }
}

//tab控制
const tab = ref<"c" | "m">("c");

//组件开合控制
const drawer = ref<boolean>(true);
defineExpose({
  open: () => (drawer.value = true),
  close: () => (drawer.value = false),
});

getCompList();
</script>
