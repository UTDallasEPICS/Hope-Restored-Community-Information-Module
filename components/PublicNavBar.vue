<script lang="ts" setup>
import SearchField from "./Filter/SearchField.vue";
import CategoryDeck from "./Category/CategoryDeck.vue";
</script>

<template>
  <nav class="block w-full bg-black-neutral shadow-md sticky top-0 z-10 p-4">
    <div class="flex gap-x-10 flex-auto">
      <img
        src="/HRM-Logo-350x-300x300.jpg"
        alt="HRM Logo"
        class="h-[7.5rem] w-auto self-center"
      />
      <div class="flex flex-col flex-auto gap-y-4 overflow-hidden">
        <SearchField />
        <CategoryDeck />
      </div>
    </div>
  </nav>
</template>
