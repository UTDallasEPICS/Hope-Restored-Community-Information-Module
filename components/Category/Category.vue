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
    class="flex flex-col p-2 justify-between items-center"
    @click="$emit('selectCategory', id)"
    :class="
      isClicked
        ? 'bg-white text-black-neutral'
        : 'bg-black-neutral text-white-neutral'
    "
  >
    <component :is="icon" class="flex-1 w-8 h-8" />
    <h3>{{ title }}</h3>
  </div>
</template>
