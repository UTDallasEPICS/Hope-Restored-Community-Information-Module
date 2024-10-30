<script lang="ts" setup>
import { ref } from "vue";
import { default as Category } from "./Category.vue";
import { serveCategories } from "./composables.ts";

const { categories, error, isLoading } = serveCategories();
const selectedCategory = ref<string | null>(null);
const setSelectedCategory = (title: string) => (selectedCategory.value = title);
</script>

<template>
  <div
    class="flex flex-row flex-auto justify-between basis-0 text-white-neutral"
  >
    <p v-if="isLoading">Loading...</p>
    <Category
      v-else-if="categories.length"
      v-for="category in categories"
      :key="category.title"
      :id="category.id"
      :title="category.title"
      :icon="category.icon"
      :isClicked="category.title === selectedCategory"
      @selectCategory="setSelectedCategory"
    />
    <p v-else>No categories found.</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
