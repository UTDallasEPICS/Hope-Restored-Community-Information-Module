<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
export interface CategoryItem {
  title: string;
  icon: any;
}
const props = defineProps<CategoryItem>();

const emit = defineEmits(["selectCategory"]);
const handleClick = () => emit("selectCategory", props.title);
</script>

<template>
  <div
    class="flex flex-col text-white-neutral p-2 justify-between items-center"
    @click="handleClick"
  >
    <component :is="icon" class="flex-1 w-8 h-8" />
    <h3>{{ title }}</h3>
  </div>
</template>
