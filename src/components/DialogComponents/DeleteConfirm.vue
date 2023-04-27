<template>
  <v-dialog v-model="vis" persistent width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="{
          ...props,
          ...options,
        }"
        >删除</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="text-h5">提示</v-card-title>
      <v-card-text>确认删除本条数据？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="close"> 取消 </v-btn>
        <v-btn
          variant="text"
          @click="
            close();
            emits('confirm');
          "
        >
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogOpenClose } from "../../hooks/useDialog";
const { vis, close } = useDialogOpenClose();

const emits = defineEmits(["confirm"]);

const options = withDefaults(
  defineProps<{
    color: string;
    size: string;
    variant: string;
    class: string;
  }>(),
  {
    color: "",
    variant: "text",
    size: "default",
    class: "",
  }
);
</script>

<style scoped></style>
