<script setup lang="ts">
import { ref } from 'vue';
const resourceId = 1; // Set this dynamically if needed
const { data: resource, error } = await useFetch(`/api/resource/get/${resourceId}`);


</script>

<template>
  <div v-if="error">
    <p>Error: {{ error.message }}</p>
  </div>
  <div v-else-if="resource && 'error' in resource">
    <p>Error: {{ resource.error }}</p>
  </div>
  <div v-else-if="!resource">
    <p>Loading...</p>
  </div>
  <div v-else>
    <h2>{{ resource.name }}</h2>
    <p>{{ resource.description }}</p>
    <!-- Add other resource details as necessary -->
  </div>
</template>
