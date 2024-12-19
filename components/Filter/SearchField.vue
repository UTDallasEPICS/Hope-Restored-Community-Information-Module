<script lang="ts" setup>
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/solid";
import { defineEmits, ref, watch } from "vue";
import { useResourceStore } from "../Resource/resourceStore";
import { useCategoryStore } from "../Category/categoryStore";
import { useSearchStore } from "./searchStore";
const searchStore = useSearchStore();
const categoryStore = useCategoryStore();
const resourceStore = useResourceStore();
const searchResources = async () => {
  emit("searchResources");
  searchStore.setSearchTerm(search.value);
  resourceStore.loadResourcesBySearchTerm(search.value);
  categoryStore.clearSelectedCategory();
};
const emit = defineEmits(["searchResources"]);
const search = ref("");
const location = ref("");

watch(
  // Used to sync between the search field of the Landing Modal
  // and the search field of the Wordpress page
  () => searchStore.getSearchTerm.value,
  (value) => {
    search.value = value;
  }
);
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
    <!--TODO: Add location filtering-->
    <!-- <input
      v-model="location"
      id="location"
      type="text"
      placeholder="Enter your zip code"
      class="border p-2 rounded-md ml-2 flex-1"
    /> -->
    <button type="submit" class="p-2 ml-2 text-white-neutral bg-hrm-green">
      <MagnifyingGlassCircleIcon class="w-6 h-6" />
    </button>
  </form>
</template>
