<template>
  <v-dialog
    v-model="vis"
    :scrim="false"
    width="1000px"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn variant="tonal" v-bind="props">新增</v-btn>
    </template>
    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>新增物料</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="save"> 保存 </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card variant="flat">
              <v-card-title>物料信息配置</v-card-title>
              <v-card-text>
                <v-radio-group inline>
                  <v-radio label="交互" value="base"></v-radio>
                  <v-radio label="表单" value="form"></v-radio>
                  <v-radio label="可视化" value="visual"></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
            <!-- <v-tabs v-model="tab">
                <v-tab value="base">交互</v-tab>
                <v-tab value="form">表单</v-tab>
                <v-tab value="visual">可视化</v-tab>
              </v-tabs>
              <v-window v-model="tab">
                <v-window-item value="base">交互</v-window-item>
                <v-window-item value="form">表单</v-window-item>
                <v-window-item value="visual">可视化</v-window-item>
              </v-window> -->
          </v-col>
          <v-col cols="6">
            <v-list lines="two" subheader>
              <v-list-subheader>物料信息配置</v-list-subheader>
            </v-list>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useDialogOpenClose } from "../../../hooks/useDialog";
import { ref } from "vue";
const { vis, close } = useDialogOpenClose();

const tab = ref<string>("base");

function save() {
  close();
}
</script>

<style scoped></style>
