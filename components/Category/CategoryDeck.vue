<script lang="ts" setup>
import { CakeIcon } from "@heroicons/vue/24/solid";
import { reactive, ref } from "vue";
import { type CategoryProps, default as Category } from "./Category.vue";

const categories = reactive<CategoryProps[]>([
  { title: "Category 1", icon: CakeIcon, isClicked: false },
  { title: "Category 2", icon: CakeIcon, isClicked: false },
  { title: "Category 3", icon: CakeIcon, isClicked: false },
  { title: "Category 4", icon: CakeIcon, isClicked: false },
  { title: "Category 5", icon: CakeIcon, isClicked: false },
  { title: "Category 6", icon: CakeIcon, isClicked: false },
  { title: "Category 7", icon: CakeIcon, isClicked: false },
  { title: "Category 8", icon: CakeIcon, isClicked: false },
  { title: "Category 9", icon: CakeIcon, isClicked: false },
  { title: "Category 10", icon: CakeIcon, isClicked: false },
  { title: "Category 11", icon: CakeIcon, isClicked: false },
  { title: "Category 12", icon: CakeIcon, isClicked: false },
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
      :isClicked="category.title === selectedCategory"
      @selectCategory="setSelectedCategory"
    />
  </div>
</template>
