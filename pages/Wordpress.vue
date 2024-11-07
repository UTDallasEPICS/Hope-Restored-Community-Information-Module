<script lang="ts" setup>
import ResourceDeck from "../components/Resource/ResourceDeck.vue";
import NavBar from "../components/PublicNavBar.vue";
import FilterDeck from "../components/Filter/FilterDeck.vue";
import { type ResourceProps } from "../components/Resource/ResourceCard.vue";
import { ref } from "vue";
import ResourceService from "../components/Resource/request";

const resources = ref<ResourceProps[]>([]);
const isLoading = ref(false);
const error = ref(null);

const loadResourcesByCategory = async (category) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await ResourceService.fetchResourcesByCategory(category);
    resources.value = response;
  } catch (err: any) {
    error.value = err.message;
    resources.value = [];
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <NavBar @selectCategory="loadResourcesByCategory" />
    <div class="flex flex-row flex-auto">
      <FilterDeck class="flex grow-[1]" />
      <div class="flex grow-[3] flex-col">
        <p v-if="isLoading">Loading...</p>
        <ResourceDeck v-else-if="resources.length" :cards="resources" />
        <p v-else>No resources found or select a categories</p>
        <p v-if="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
