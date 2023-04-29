<template>
  <v-dialog v-model="vis" width="600px" transition="dialog-bottom-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        size="small"
        variant="elevated"
        color="blue-darken-2"
        v-bind="props"
      >
        <v-icon start icon="mdi-import"></v-icon>
        导入项目
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dard>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>项目上传</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-file-input
          v-model="fileInfo"
          @change="uploadFile"
          multiple
          show-size
          counter
          small-chips
          :rules="[(v) => !!v || '文件必选']"
          label="File input"
          accept=".json"
          prepend-icon="mdi-file"
        ></v-file-input
      ></v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDialogOpenClose } from "../../../hooks/useDialog";
import { UserStore } from "../../../store/modules/user";
import { SysStore } from "../../../store/modules/sys";

const { vis, close } = useDialogOpenClose();
const emits = defineEmits(["on-save"]);

const fileInfo = ref();
async function uploadFile() {
  const formData = new window.FormData();
  let files = Array.from(fileInfo.value);
  //因为上传文件的时候，后端接收的是一个数组，所以这里需要遍历一下
  files.forEach((file: any) => {
    formData.append("json", file);
  });
  await fetch("http://localhost:8888/api/v1/item/json", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: UserStore().token!,
    },
  })
    .then((res) => res.json())
    .then(({ code, msg, data }) => {
      if (code != 0) {
        SysStore().snackOpen(msg);
        return;
      }
      SysStore().snackOpen("上传成功");
      emits("on-save", data);
      close();
    });
}
</script>
