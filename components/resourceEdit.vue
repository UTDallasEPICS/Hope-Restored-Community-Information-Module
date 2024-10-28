<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { ref } from 'vue';

const editMode = ref(false);
const resourceId = 3; // Set this dynamically if needed

// Fetch the resource data
const { data: resource, error, refresh } = await useFetch(`/api/resource/get/${resourceId}`);

// Function to save the updated resource
const saveChanges = async () => {
  if (resource.value) {
    try {
      const response = await fetch(`http://localhost:3000/api/resource/put/${resourceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: resource.value.name,
          description: resource.value.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update resource');
      }

      // Option 1: Refresh the resource to get the updated data
      await refresh();

      // Option 2: Manually update the resource (if you don't want to make another GET request)
      // resource.value.name = updatedData.name;
      // resource.value.description = updatedData.description;

      // Disable edit mode after saving
      editMode.value = false;
      console.log('Resource updated successfully');
    } catch (err) {
      console.error('Error saving changes:', err);
    }
  }
};
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
    <button @click="editMode ? saveChanges() : editMode = true">
      {{ editMode ? 'Save' : 'Edit' }}
    </button>

    <!-- Editable fields for name and description in edit mode -->
    <div v-if="editMode" class="mt-2">
      <input v-model="resource.name" type="text" placeholder="Edit Name" />
      <input v-model="resource.description" type="text" placeholder="Edit Description" />
    </div>
  </div>
</template>
