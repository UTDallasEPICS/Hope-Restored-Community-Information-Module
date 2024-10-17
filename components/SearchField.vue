<script lang="ts" setup>
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/solid";
import { defineEmits, ref } from "vue";
const emit = defineEmits(["searchResources"]);
const description = ref("");
const location = ref("");

const searchResources = async () => {
  emit("searchResources", {
    description: description.value,
    location: location.value,
  });
};
</script>

<template>
  <form @submit.prevent="searchResources" class="flex flex-row flex-auto">
    <input
      v-model="description"
      id="description"
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
