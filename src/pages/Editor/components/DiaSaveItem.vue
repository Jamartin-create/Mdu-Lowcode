<template>
  <v-dialog v-model="vis" width="300">
    <template v-slot:activator="{ props }">
      <v-btn
        :icon="
          saveType === 'save'
            ? 'mdi-content-save-outline'
            : 'mdi-content-save-edit-outline'
        "
        variant="text"
        v-bind="props"
      ></v-btn>
    </template>
    <v-card>
      <v-container>
        <v-text-field
          v-model="form.itemTitle"
          :rules="rule.itemTitle"
          label="项目名称"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.itemDescription"
          label="项目描述"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="vis = false">关闭</v-btn>
        <v-btn @click="saveItem">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { ItemType } from "../../../api/item";
import { useDialogOpenClose } from "../../../hooks/useDialog";
import ItemApi from "../../../api/item";
import { SysStore } from "../../../store/modules/sys";

const { vis, close } = useDialogOpenClose();

const emtis = defineEmits(["save", "edit"]);
const { saveType, itemId } = defineProps<{
  saveType: string;
  itemId?: string;
}>();

watch(
  () => itemId,
  (val) => {
    if (val) getData();
  },
  { immediate: true }
);
async function getData() {
  try {
    const {
      code,
      msg,
      data: { item },
    } = await ItemApi.getItemById(itemId!);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    form.itemTitle = item.itemTitle;
    form.itemDescription = item.itemDescription;
    form.itemId = item.itemId;
  } catch (e) {
    console.error(e);
  }
}

const form = reactive<Partial<ItemType>>({
  itemTitle: "",
  itemDescription: "",
});

const rule = {
  itemTitle: [(v: string) => !!v || "请输入项目名称"],
};

function saveItem() {
  close();
  emtis(saveType == "save" ? "save" : "edit", form);
}
</script>

<style scoped></style>
