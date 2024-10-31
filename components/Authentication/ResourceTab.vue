<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Resources</h2>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Filter resources"
        class="mb-4 p-2 border rounded w-full"
      />
      <ul>
        <li
          v-for="resource in filteredResources"
          :key="resource.id"
          class="mb-2 p-2 bg-gray-100 rounded"
        >
          {{ resource.name }}
        </li>
      </ul>
      <p v-if="filteredResources.length === 0">No resources found.</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    name: 'ResourceTab',
    setup() {
      // List of resources (replace with real data in production)
      const resources = ref([
        { id: 1, name: 'Resource 1' },
        { id: 2, name: 'Resource 2' },
        { id: 3, name: 'Resource 3' },
        { id: 4, name: 'Resource 4' },
      ]);
  
      // Search query state
      const searchQuery = ref('');
  
      // Computed property to filter resources based on the search query
      const filteredResources = computed(() => {
        return (resources.value || []).filter((resource) =>
          resource?.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
  
      return {
        searchQuery,
        filteredResources,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  