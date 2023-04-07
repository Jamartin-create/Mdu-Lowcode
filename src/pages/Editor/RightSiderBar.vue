<template>
  <v-navigation-drawer permanent location="right" v-model="drawer" width="270">
    <v-tabs v-model="tab">
      <v-tab value="s">样式</v-tab>
      <v-tab value="a">属性</v-tab>
      <v-tab value="d" v-bind:disabled="compType != 'visual'">数据</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="s">样式</v-window-item>
      <v-window-item value="a">
        <v-container>
          <InputField :list="propsList" :vModel="info.props" />
        </v-container>
      </v-window-item>
      <v-window-item value="d">
        <v-container>
          <InputField :list="dstlist" :vModel="info.dts" />
        </v-container>
      </v-window-item>
    </v-window>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import CompApi from "../../api/comp";
import { replaceArray } from "../../utils/common";
import InputField from "./components/InputField.vue";
import { SysStore } from "../../store/modules/sys";

type Element = {
  id: string;
  compId: string;
  tag: string;
  tagCN: string;
  type: string;
  props: any;
  styles: any;
  dts: any;
  dataSourceId: string;
};

//获取基本信息
const info = reactive<Partial<Element>>({});
function catchCom({ compId, props, styles, dts }: Partial<Element>) {
  info.compId = compId;
  info.props = props;
  info.styles = styles;
  info.dts = dts;
  getProps(compId!);
}

//获取物料的props 和 styles 和 dataSourceGroup（数据源）
const propsList = reactive<any[]>([]);
const stylesList = reactive<any[]>([]);
const dstlist = reactive<any[]>([]);
const compType = ref<string>("");
async function getProps(id: string) {
  try {
    const { code, msg, data } = await CompApi.getCompProps(id);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    replaceArray(propsList, data.props);
    replaceArray(stylesList, data.styles);
    compType.value = data.type;
    if (data.type == "visual") {
      replaceArray(dstlist, data.dts);
    }
  } catch (e) {
    console.error(e);
  }
}

//tab切换
const tab = ref<"s" | "a" | "d">("a");

//组件开合
const drawer = ref<boolean>(true);
defineExpose({
  open: () => (drawer.value = true),
  close: () => (drawer.value = false),
  catchCom,
});
</script>

<style scoped></style>
