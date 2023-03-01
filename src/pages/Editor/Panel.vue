<template>
  <v-app>
    <draggable
      :list="componentList"
      item-key="id"
      :group="{ name: 'component' }"
      @clone="onClone"
    >
      <template #item="{ element }">
        <div class="cmp-wrp">
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
function onClone(data: any) {
  console.log(data);
}
</script>

<style scoped>
.cmp-wrp {
  margin: 10px;
  cursor: move;
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>
