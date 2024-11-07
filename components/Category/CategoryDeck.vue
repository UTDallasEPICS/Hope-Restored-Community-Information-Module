<script lang="ts" setup>
import { default as Category } from "./Category.vue";
import { ref, onMounted } from "vue";
import CategoryService from "./request";
import { type CategoryProps } from "./Category.vue";

const categories = ref<CategoryProps[]>([]);
const isLoading = ref(true);
const error = ref(null);
const fetchCategories = async () => {
  try {
    const response = await CategoryService.fetchCategories();
    categories.value = response;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};
onMounted(fetchCategories);

const emit = defineEmits(["selectCategory"]);
const selectedCategory = ref<string | null>(null);
const setSelectedCategory = (category) => {
  selectedCategory.value = category;
  emit("selectCategory", category);
};
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
