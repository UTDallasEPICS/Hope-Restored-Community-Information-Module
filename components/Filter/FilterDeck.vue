<template>
  <p v-if="isLoading">Loading...</p>
  <div
    v-else-if="filterGroups.length > 0"
    class="p-4 space-y-4 flex flex-col flex-auto"
  >
    <FilterDisclosure
      v-for="(group, index) in filterGroups"
      :key="index"
      :group="group"
    />
  </div>
  <p v-else>No filters found.</p>
  <p v-if="error">{{ error }}</p>
</template>

<script lang="ts" setup>
import FilterDisclosure from "./FilterDisclosure.vue";
import { useFilterStore } from "./filterStore";

const filterStore = useFilterStore();
const filterGroups = filterStore.getFilterGroups;
const error = filterStore.getError;
const isLoading = filterStore.getIsLoading;
</script>
