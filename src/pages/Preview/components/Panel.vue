<template>
  <v-app style="padding: 25px; height: 100%">
    <draggable
      :list="componentList"
      item-key="id"
      :group="{ name: 'component' }"
    >
      <template #item="{ element }">
        <div class="cmp-wrp">
          <component
            :is="element.tag"
            v-bind="element.props"
            v-bind:dts="element.dts"
            v-bind:styles="element.styles"
            v-bind:props2="element.props"
            >{{ element.tag == "v-btn" ? element.props.text : "" }}</component
          >
        </div>
      </template>
    </draggable>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { SysStore } from "../../../store/modules/sys";
import GroupApi from "../../../api/group";
import draggable from "vuedraggable";

const route = useRoute();
watch(
  () => route.query,
  (query) => {
    getCompList();
  },
  { immediate: true }
);

const componentList = ref<any[]>([]);
async function getCompList() {
  try {
    const { code, msg, data } = await GroupApi.getGroupByItemId(
      route.query.itemId as string
    );
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    console.log(data.groupJson);
    componentList.value = data.groupJson;
  } catch (e) {
    console.error(e);
  }
}
</script>

<style scoped lang="scss">
.cmp-wrp {
  padding: 5px;
  position: relative;
}
</style>
