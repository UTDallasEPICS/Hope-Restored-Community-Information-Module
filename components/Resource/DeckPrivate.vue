<script lang="ts" setup>
import { default as CardPrivate } from "./CardPrivate.vue";
import { useResourceStore } from "./resourceStore";

const resourceStore = useResourceStore();
const resources = resourceStore.getResourceProps;
const isLoading = resourceStore.getIsLoading;
const error = resourceStore.getError;
console.log("private")
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <div v-else-if="resources.length > 0" class="flex flex-auto flex-col p-10">
    <CardPrivate
      v-for="card in resources"
      :key="card.title"
      :index="card.index"
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
      class="flex justify-center border border-blue"
    />
  </div>
  <p v-else>No resources found or select a categories</p>
  <p v-if="error">{{ error }}</p>
</template>
