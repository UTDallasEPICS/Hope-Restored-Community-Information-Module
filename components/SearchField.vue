<script lang="ts" setup>
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/solid";
import { defineEmits, ref } from "vue";
import { useResourceStore } from "./Resource/resourceStore";
const search = ref("");
const location = ref("");

const resourceStore = useResourceStore();
const searchResources = async () => {
  resourceStore.loadResourcesBySearchTerm(search.value);
};
</script>

<template>
  <form @submit.prevent="searchResources" class="flex flex-row flex-auto">
    <input
      v-model="search"
      id="search"
      type="text"
      placeholder="What are you looking for today?"
      class="border p-2 rounded-md flex-1"
    />
    <input
      v-model="location"
      id="location"
      type="text"
      placeholder="Enter your zip code"
      class="border p-2 rounded-md ml-2 flex-1"
    />
    <button type="submit" class="p-2 ml-2 text-white-neutral bg-hrm-green">
      <MagnifyingGlassCircleIcon class="w-6 h-6" />
    </button>
  </form>
</template>
