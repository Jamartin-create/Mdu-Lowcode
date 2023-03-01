<template>
  <v-app>
    <draggable
      :list="componentList"
      item-key="id"
      :group="{ name: 'component' }"
      handle=".handle"
      @clone="onClone"
    >
      <template #item="{ element }">
        <div
          class="cmp-wrp"
          :class="{ active: element.id == active }"
          @click.stop="active = element.id"
        >
          <div class="tool">
            <v-icon icon="mdi-selection-drag" class="handle"></v-icon>
            <v-icon icon="mdi-square-edit-outline"></v-icon>
            <v-icon
              icon="mdi-delete-outline"
              @click="deleteItem(element.id)"
            ></v-icon>
          </div>
          <component :is="element.tag" v-bind="element.props">{{
            element.tag == "v-btn" ? element.tagCN : ""
          }}</component>
        </div>
      </template>
    </draggable>
  </v-app>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { ref } from "vue";
const componentList = ref<any[]>([]);
const active = ref<string>("");
function onClone(data: any) {
  console.log(data);
}
function deleteItem(id: string) {
  for (let i = 0; i < componentList.value.length; i++) {
    if (componentList.value[i].id == id) componentList.value.splice(i, 1);
  }
}
</script>

<style scoped lang="scss">
.cmp-wrp {
  padding: 5px;
  position: relative;
  &.active {
    padding-top: 30px;
    border: 1px dashed black;
    border-radius: 3px;
    .tool {
      display: block;
    }
  }
}
.tool {
  display: none;
  position: absolute;
  z-index: 100;
  top: 0;
  font-size: 15px;
  * {
    margin-right: 10px;
  }
  i:nth-child(1) {
    cursor: move;
  }
  i:nth-child(2),
  i:nth-child(3) {
    cursor: pointer;
  }
}
</style>
