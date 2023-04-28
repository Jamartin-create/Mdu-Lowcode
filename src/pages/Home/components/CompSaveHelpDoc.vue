<template>
  <v-dialog
    v-model="vis"
    width="500px"
    class="mx-auto my-12"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <span v-bind="props">
        <v-tooltip text="帮助文档">
          <template v-slot:activator="{ props: props2 }">
            <v-icon
              color="grey lighten-1"
              size="smaller"
              icon="mdi-information-outline"
              v-bind="props2"
            ></v-icon>
          </template>
        </v-tooltip>
      </span>
    </template>
    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title> Help </v-toolbar-title>
      </v-toolbar>
      <v-card-title> 物料配置说明 </v-card-title>
      <v-card-text>
        <div>物料库基于Vuetify及Element-Plus，即相关配置请结合官方文档使用</div>
      </v-card-text>
      <v-divider class="mx-4 mb-1"></v-divider>
      <v-card-title>官方文档</v-card-title>
      <div class="px-4">
        <v-chip class="ma-2" color="indigo" @click="openNewTab(urls.vuetify)"
          >Vuetify</v-chip
        >
        <v-chip
          class="ma-2"
          color="secondary"
          @click="openNewTab(urls.elementPlus)"
          >ElementPlus</v-chip
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogOpenClose } from "../../../hooks/useDialog";

const { vis, close } = useDialogOpenClose();
const urls = {
  vuetify: "https://vuetifyjs.com/en/components/all/",
  elementPlus: "https://element-plus.gitee.io/zh-CN/component/button.html",
};
function openNewTab(url: string) {
  window.open(url, "_blank");
}
</script>

<style scoped></style>
