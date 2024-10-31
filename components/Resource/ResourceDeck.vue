<script lang="ts" setup>
import {
  type ResourceProps,
  default as ResourceCard,
} from "./ResourceCard.vue";
export interface ResourceDeckProps {
  cards: ResourceProps[];
}
defineProps<ResourceDeckProps>();
</script>

<template>
  <div class="flex flex-col p-10">
    <ResourceCard
      v-for="card in cards"
      :key="card.title"
      :id="card.id"
      :title="card.title"
      :description="card.description"
      :demographics="card.demographics"
      :phoneNumbers="card.phoneNumbers"
      :emails="card.emails"
      :addresses="card.addresses"
      :languages="card.languages"
      :eligibility="card.eligibility"
      :cost="card.cost"
      :link="card.link"
    />
  </div>
</template>
