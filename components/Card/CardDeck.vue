<script lang="ts" setup>
import { reactive } from "vue";
import { type CardItem, default as Card } from "./Card.vue";

const cards = reactive<CardItem[]>([
  { title: "Resource 1", description: "Description 1" },
  { title: "Resource 2", description: "Description 2" },
  { title: "Resource 3", description: "Description 3" },
]);
</script>

<template>
  <div>
    <Card
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :description="card.description"
    />
  </div>
</template>
