<script lang="ts" setup>
export interface CardItem {
  title: string;
  description: string;
}
defineProps<CardItem>();
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold underline">{{ title }}</h2>
    <p class="text-3xl font-bold underline">{{ description }}</p>
  </div>
</template>
