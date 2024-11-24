<script lang="ts" setup>
import { computed } from "vue";
import { useCategoryStore } from "../Category/categoryStore";
import { useSearchStore } from "../Filter/searchStore";

const searchStore = useSearchStore();
const categoryStore = useCategoryStore();

const label = computed(() => {
  if (searchStore.getSearchTerm.value !== "") {
    return `Browsing resource that ${searchStore.getSearchTerm.value}`;
  }
  if (categoryStore.getSelectedCategory.value) {
    return `Browsing ${categoryStore.getSelectedCategory.value} resource`;
  }
  return "Browsing all resources";
});
</script>

<template>
  <div class="flex items-center gap-2 p-4">
    <h2 class="text-gray-700">
      {{ label.charAt(0).toUpperCase() + label.slice(1).toLowerCase() }}
    </h2>
  </div>
</template>
