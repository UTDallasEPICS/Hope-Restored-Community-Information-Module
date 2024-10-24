<script lang="ts" setup>
import { reactive } from "vue";
import {
  type ResourceProps,
  default as ResourceCard,
} from "./ResourceCard.vue";

const cards = reactive<ResourceProps[]>([
  {
    id: 1,
    title: "Resource 1",
    description: "Description 1",
    services: ["Service 1", "Service 2"],
    demographics: ["Demographic 1", "Demographic 2"],
    phoneNumbers: ["123-456-7890", "098-765-4321"],
    emails: [],
    addresses: [],
  },
  {
    id: 2,
    title: "Resource 2",
    description: "Description 2",
    services: ["Service 3", "Service 4"],
    demographics: ["Demographic 3", "Demographic 4"],
    phoneNumbers: [],
    emails: ["abc@gmail.com"],
    addresses: ["123 Main St", "456 Elm St"],
  },
]);
</script>

<template>
  <div class="flex flex-col p-10">
    <ResourceCard
      v-for="card in cards"
      :key="card.title"
      :id="card.id"
      :title="card.title"
      :description="card.description"
      :services="card.services"
      :demographics="card.demographics"
      :phoneNumbers="card.phoneNumbers"
      :emails="card.emails"
      :addresses="card.addresses"
    />
  </div>
</template>
