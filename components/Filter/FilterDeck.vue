<template>
  <div class="p-4 space-y-4 flex flex-col flex-auto">
    <TransitionRoot
      :show="isLoading"
      enter="transition-opacity duration-75"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-1000000"
      leave-from="opacity-100"
      leave-to="opacity-0"
      class="relative w-full z-5 bg-white"
    >
      <FilterSkeleton />
      <FilterSkeleton />
      <FilterSkeleton />
    </TransitionRoot>
    <p v-if="isLoading"></p>
    <div v-else-if="filterGroups.length > 0">
      <FilterDisclosure
        v-for="(group, index) in filterGroups"
        :key="index"
        :group="group"
      />
    </div>
    <p v-else>No filters found.</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import FilterDisclosure from "./FilterDisclosure.vue";
import FilterSkeleton from "./FilterSkeleton.vue";
import { useFilterStore } from "./filterStore";
import { TransitionRoot } from "@headlessui/vue";

const filterStore = useFilterStore();
const filterGroups = filterStore.getFilterGroups;
const error = filterStore.getError;
const isLoading = filterStore.getIsLoading;
</script>
