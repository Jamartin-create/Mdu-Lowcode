<template>
  <Transition>
    <div class="message">
      <v-alert class="alert" max-width="300">
        {{ message }}
      </v-alert>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { useTimeoutFn } from "@vueuse/core";
type Prop = {
  id: string;
  type?: "success" | "warning" | "error" | "info";
  top?: number;
  message?: string;
  duration?: number;
  onClose?: Function;
};
const props = withDefaults(defineProps<Prop>(), {
  type: "info",
  top: 56,
  message: "",
  duration: 3000,
  onClose: () => {},
});

const visible = ref<boolean>(false);
let stopTimer: (() => void) | undefined = undefined;

function close() {
  visible.value = false;
}

function startTimer() {
  if (props.duration > 0) {
    ({ stop: stopTimer } = useTimeoutFn(() => {
      if (visible.value) close();
    }, props.duration));
  }
}

function clearTimer() {
  stopTimer?.();
}

function reTimer() {
  clearTimer();
  startTimer();
}
onMounted(() => {
  startTimer();
  visible.value = true;
});
defineExpose({
  reTimer,
  close,
  visible,
});
</script>

<style scoped></style>
