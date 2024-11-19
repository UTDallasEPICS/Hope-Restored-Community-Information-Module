<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
export interface CategoryProps {
  id: number;
  title: string;
  icon: any;
  isClicked: boolean;
}
defineProps<CategoryProps>();
const emit = defineEmits(["selectCategory"]);
</script>

<template>
  <div
    class="flex flex-col p-2 justify-between items-center text-center cursor-pointer border-2 border-transparent hover:border-white-neutral"
    @click="$emit('selectCategory', title)"
    :class="
      isClicked
        ? 'bg-white text-black-neutral'
        : 'bg-black-neutral text-white-neutral'
    "
  >
    <component
      :is="icon"
      class="flex-1"
      :style="{ width: '1.5em', height: '1.5em' }"
    />
    <h3>{{ title }}</h3>
  </div>
</template>
