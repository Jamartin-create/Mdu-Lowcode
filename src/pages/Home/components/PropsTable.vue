<template>
  <v-table density="comfortable">
    <thead>
      <tr>
        <th width="60px">序号</th>
        <th width="120px">字段标签</th>
        <th width="120px">字段名</th>
        <th width="120px">字段类型</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prop in propsList" :key="(prop.id as string)">
        <td>{{ prop.id }}</td>
        <td>{{ prop.text }}</td>
        <td>{{ prop.name }}</td>
        <td>{{ prop.type }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
const { propsList } = defineProps<{
  propsList?: any[];
}>();
</script>

<style scoped></style>
