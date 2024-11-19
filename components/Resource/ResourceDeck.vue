<script lang="ts" setup>
import ResourceCard from "./ResourceCard.vue";
import ResourceSkeleton from "./ResourceSkeleton.vue";
import { useResourceStore } from "./resourceStore";
import { TransitionRoot } from "@headlessui/vue";

const resourceStore = useResourceStore();
const resources = resourceStore.getResourceProps;
const isLoading = resourceStore.getIsLoading;
const error = resourceStore.getError;
</script>

<template>
  <div class="flex flex-auto flex-col p-5 pt-1">
    <TransitionRoot
      :show="isLoading"
      enter="transition-opacity duration-75"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-300"
      leave-from="opacity-100"
      leave-to="opacity-0"
      class="relative w-full z-5 bg-white"
    >
      <ResourceSkeleton />
      <ResourceSkeleton />
      <ResourceSkeleton />
    </TransitionRoot>
    <div v-if="isLoading"></div>
    <div v-else-if="resources.length > 0">
      <ResourceCard
        v-for="card in resources"
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
    <p v-else class="text-2xl font-semibold">No results</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
