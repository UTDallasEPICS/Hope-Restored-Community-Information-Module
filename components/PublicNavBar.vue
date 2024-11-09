<script lang="ts" setup>
import SearchField from "./SearchField.vue";
import CategoryDeck from "./Category/CategoryDeck.vue";
</script>

<template>
  <nav class="block w-full bg-black-neutral shadow-md sticky top-0 z-50 p-4">
    <div class="container flex flex-wrap gap-x-10 flex-auto">
      <p class="text-white-neutral">Insert Image</p>
      <div class="flex flex-col flex-auto gap-y-4">
        <SearchField />
        <CategoryDeck />
      </div>
    </div>
  </nav>
</template>
