<script lang="ts" setup>
import { default as Category } from "./Category.vue";
import { useResourceStore } from "../Resource/resourceStore";
import { useCategoryStore } from "./categoryStore";
import { useLoadingStore } from "../Loader/loadingStore";

defineProps({
  itemSize: {
    type: String,
    default: "1rem",
  },
  wrap: {
    type: Boolean,
    default: false,
  },
});

const categoryStore = useCategoryStore();
const categories = categoryStore.getFCategories;
const error = categoryStore.getError;
const isLoading = categoryStore.getIsLoading;
const selectedCategory = categoryStore.getSelectedCategory;

const loadingStore = useLoadingStore();
loadingStore.registerLoading(isLoading);

const resourceStore = useResourceStore();
const setSelectedCategory = (category) => {
  emit("selectCategory", category);
  categoryStore.setSelectedCategory(category);
  resourceStore.loadResourcesByCategory(category);
};
const emit = defineEmits(["selectCategory"]);
</script>

<template>
  <div
    class="flex flex-row flex-auto text-white-neutral"
    :style="{ fontSize: itemSize }"
    :class="
      wrap ? 'flex-wrap justify-center gap-y-10' : 'flex-nowrap justify-between'
    "
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
      class="flex flex-auto basis-2"
    />
    <p v-else>No categories found.</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
