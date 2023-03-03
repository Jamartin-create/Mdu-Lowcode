<template>
  <v-navigation-drawer permanent location="right" v-model="drawer" width="270">
    <v-tabs v-model="tab">
      <v-tab value="s">样式</v-tab>
      <v-tab value="a">属性</v-tab>
      <v-tab value="d">数据</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="s">样式</v-window-item>
      <v-window-item value="a">
        <v-container>
          <v-text-field
            :disabled="info.props.text == null"
            v-model="info.props.text"
            required
          >
            <template v-slot:prepend width="100px"> 内容 </template>
          </v-text-field>
        </v-container>
        <v-container>
          <v-text-field
            :disabled="info.props.title == null"
            v-model="info.props.title"
            required
          >
            <template v-slot:prepend> 标题 </template>
          </v-text-field>
        </v-container>
        <v-container>
          <v-text-field
            :disabled="info.props.subtitle == null"
            v-model="info.props.subtitle"
            required
          >
            <template v-slot:prepend> 副题 </template>
          </v-text-field>
        </v-container>
      </v-window-item>
      <v-window-item value="d">数据</v-window-item>
    </v-window>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const info = reactive<any>({
  props: {},
});
function catchCom({ props }: any) {
  info.props = props;
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
