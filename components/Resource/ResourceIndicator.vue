<script lang="ts" setup>
import { computed } from "vue";
import { useCategoryStore } from "../Category/categoryStore";
import { useSearchStore } from "../Filter/searchStore";

const searchStore = useSearchStore();
const categoryStore = useCategoryStore();

const label = computed(() => {
  let label = "Browsing";
  if (categoryStore.getSelectedCategory.value) {
    label += ` ${categoryStore.getSelectedCategory.value}`;
  } else {
    label += " all resources";
  }
  if (searchStore.getSearchTerm.value) {
    label += ` that "${searchStore.getSearchTerm.value}"`;
  }
  return label;
});
</script>

<template>
  <div class="flex items-center gap-2 p-4">
    <h2 class="text-gray-700">
      {{ label.charAt(0).toUpperCase() + label.slice(1).toLowerCase() }}
    </h2>
  </div>
</template>
