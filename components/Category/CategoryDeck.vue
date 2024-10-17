<script lang="ts" setup>
import { CakeIcon } from "@heroicons/vue/24/solid";
import { reactive, ref } from "vue";
import { type CategoryItem, default as Category } from "./Category.vue";

const categories = reactive<CategoryItem[]>([
  { title: "Category 1", icon: CakeIcon },
  { title: "Category 2", icon: CakeIcon },
  { title: "Category 3", icon: CakeIcon },
  { title: "Category 4", icon: CakeIcon },
  { title: "Category 5", icon: CakeIcon },
  { title: "Category 6", icon: CakeIcon },
  { title: "Category 7", icon: CakeIcon },
  { title: "Category 8", icon: CakeIcon },
  { title: "Category 9", icon: CakeIcon },
  { title: "Category 10", icon: CakeIcon },
]);

const selectedCategory = ref<string | null>(null);
const setSelectedCategory = (title: string) => (selectedCategory.value = title);
</script>

<template>
  <div class="flex flex-row flex-auto justify-between basis-0">
    <Category
      v-for="category in categories"
      :key="category.title"
      :title="category.title"
      :icon="category.icon"
      @selectCategory="setSelectedCategory"
      :class="
        selectedCategory === category.title
          ? 'bg-white text-black-neutral'
          : 'bg-black-neutral text-white-neutral'
      "
    />
  </div>
</template>
